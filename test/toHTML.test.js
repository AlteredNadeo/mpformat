const { toHTML, parse } = require('../lib/mpformat')

const { expect } = require('chai')

describe('toHTML', () => {
  it('should not modify text without codes', () => {
    expect(toHTML(parse('foo'))).to.equal('foo')
  })

  it('should parse $otag', () => {
    expect(toHTML(parse('$otag'))).to.equal(
      '<span style="font-weight: bold;">tag</span>'
    )
  })

  it('should ignore non color codes', () => {
    expect(toHTML(parse('$uhi there'))).to.equal('hi there')
  })

  it('should parse $l with specified url', () => {
    expect(
      toHTML(parse('$l[http://maniaplanet.com]trackmania.com$l'))
    ).to.equal('<a href="http://maniaplanet.com">trackmania.com</a>')
  })

  it('should parse $l with no text', () => {
    expect(toHTML(parse('$lhttp://maniaplanet.com$l'))).to.equal(
      '<a href="http://maniaplanet.com">http://maniaplanet.com</a>'
    )
  })

  it('should automatically adds a link end tag', () => {
    expect(toHTML(parse('$lhttp://maniaplanet.com'))).to.equal(
      '<a href="http://maniaplanet.com">http://maniaplanet.com</a>'
    )
  })

  it('should handle links with only code as text', () => {
    expect(toHTML(parse('$l[www.clan-nuitblanche.org]$fff$l'))).to.equal('')
  })

  it('should add http protocol to external links', () => {
    expect(toHTML(parse('$l[maniaplanet.com]maniaplanet$l'))).to.equal(
      '<a href="http://maniaplanet.com">maniaplanet</a>'
    )
  })

  it('should add maniaplanet protocol to internal links', () => {
    expect(toHTML(parse('$h[maniaflash]ManiaFlash$h'))).to.equal(
      '<a href="maniaplanet://#manialink=maniaflash">ManiaFlash</a>'
    )
  })

  it('should handle color codes', () => {
    expect(toHTML(parse('$f00Red'))).to.equal(
      '<span style="color: #ff0000;">Red</span>'
    )
  })

  it('should handle incomplete color codes', () => {
    expect(toHTML(parse('$fRed'))).to.equal(
      '<span style="color: #ff0000;">Red</span>'
    )
  })

  it('should not add links with disableLinks', () => {
    expect(toHTML(parse('$lmaniaplanet.com', { disableLinks: true }))).to.equal(
      'maniaplanet.com'
    )
  })

  it('should not add links with specified url with disableLinks', () => {
    expect(
      toHTML(parse('$l[maniaplanet.com]Maniaplanet', { disableLinks: true }))
    ).to.equal('Maniaplanet')
  })

  it('should be darker text with lightBackground', () => {
    expect(toHTML(parse('$fffText', { lightBackground: true }))).to.equal(
      '<span style="color: #444444;">Text</span>'
    )
  })

  it('should make a link open in external window with externalLinks', () => {
    expect(
      toHTML(
        parse('$l[http://maniaplanet.com]trackmania.com$l', {
          externalLinks: true,
        })
      )
    ).to.equal(
      '<a href="http://maniaplanet.com" target="_blank" rel="noopener noreferrer">trackmania.com</a>'
    )
  })

  it('should not open manialink in external window with externalLinks', () => {
    expect(
      toHTML(parse('$h[maniaflash]ManiaFlash$h', { externalLinks: true }))
    ).to.equal('<a href="maniaplanet://#manialink=maniaflash">ManiaFlash</a>')
  })
})
