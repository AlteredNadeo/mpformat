import { IToken } from '.'

export default class LinkTokenOpen implements IToken {
  manialink: boolean
  link: string

  constructor(manialink: boolean, link: string | null) {
    this.manialink = manialink
    this.link = link || ''
  }

  toHTML(): string {
    let link = this.link

    if (this.manialink && !/^maniaplanet:/i.test(link)) {
      link = `maniaplanet://#manialink=${link}`
    }
    if (!this.manialink && !/^http:/i.test(link)) {
      link = `http://${link}`
    }
    return `<a href="${link}">`
  }

  toPlainText(): string {
    return ''
  }
}
