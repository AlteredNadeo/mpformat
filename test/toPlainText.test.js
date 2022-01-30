const { toPlainText, parse } = require('../lib/mpformat')

const { expect } = require('chai')

describe('toPlainText', () => {
  it('should not modify text without codes', () => {
    expect(toPlainText(parse('foo'))).to.equal('foo')
  })

  it('should parse $otag', () => {
    expect(toPlainText(parse('$otag'))).to.equal('tag')
  })

  it('should ignore non color codes', () => {
    expect(toPlainText(parse('$uhi there'))).to.equal('hi there')
  })

  it('should parse $l with specified url', () => {
    expect(
      toPlainText(parse('$l[http://maniaplanet.com]trackmania.com$l'))
    ).to.equal('trackmania.com')
  })

  it('should parse $l with no text', () => {
    expect(toPlainText(parse('$lhttp://maniaplanet.com$l'))).to.equal(
      'http://maniaplanet.com'
    )
  })

  it('should automatically adds a link end tag', () => {
    expect(toPlainText(parse('$lhttp://maniaplanet.com'))).to.equal(
      'http://maniaplanet.com'
    )
  })

  it('should handle links with only code as text', () => {
    expect(toPlainText(parse('$l[www.clan-nuitblanche.org]$fff$l'))).to.equal(
      ''
    )
  })

  it('should add http protocol to external links', () => {
    expect(toPlainText(parse('$l[maniaplanet.com]maniaplanet$l'))).to.equal(
      'maniaplanet'
    )
  })

  it('should add maniaplanet protocol to internal links', () => {
    expect(toPlainText(parse('$h[maniaflash]ManiaFlash$h'))).to.equal(
      'ManiaFlash'
    )
  })

  it('should handle color codes', () => {
    expect(toPlainText(parse('$f00Red'))).to.equal('Red')
  })

  it('should handle incomplete color codes', () => {
    expect(toPlainText(parse('$fRed'))).to.equal('Red')
  })

  it('should not add links with disableLinks', () => {
    expect(
      toPlainText(parse('$lmaniaplanet.com', { disableLinks: true }))
    ).to.equal('maniaplanet.com')
  })

  it('should not add links with specified url with disableLinks', () => {
    expect(
      toPlainText(
        parse('$l[maniaplanet.com]Maniaplanet', { disableLinks: true })
      )
    ).to.equal('Maniaplanet')
  })

  it('should not modify anything with lightBackground', () => {
    expect(toPlainText(parse('$fffText', { lightBackground: true }))).to.equal(
      'Text'
    )
  })
})
