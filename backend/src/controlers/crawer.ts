import puppeteer from 'puppeteer'

export class Crawer {
  private readonly baseUrl: string
  private page: puppeteer.Page
  private browser: puppeteer.Browser

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async openPageBase (): Promise<void> {
    this.browser = await puppeteer.launch({ headless: false })
    this.page = await this.browser.newPage()
    await this.page.goto(this.baseUrl)
  }

  async closeNavigator (): Promise<void> {
    await this.browser.close()
  }

  async openUrl (url: string): Promise<void> {
    await this.page.goto(url)
  }

  async getUrlsById (selector: string): Promise<string[]> {
    return await this.page.evaluate((selector: String) => {
      const selectorById = '#' + String(selector) + ' a'
      const nodeList = document.querySelectorAll(selectorById)
      const hrefArray = []

      for (let idx = 0; idx < nodeList.length; idx = idx + 1) {
        hrefArray.push(nodeList[idx])
      }

      const hrefList: string[] = []

      for (const href of hrefArray) {
        const item = href.getAttribute('href')
        console.log('href: ', item)
        hrefList.push(item)
      }
      return hrefList
    }, selector)
  }

  async getTextElementByAttribute (element: string, attribute: string, value: string): Promise<String> {
    return await this.page.evaluate((element: string, attribute: string, value: string) => {
      const elemento = document.querySelectorAll(element + '[' + attribute + '="' + value + '"]')
      return elemento[0].textContent
    }, element, attribute, value)
  }

  async getImgSrcElementByAttribute (element: string, attribute: string, value: string): Promise<string> {
    return await this.page.evaluate((element: string, attribute: string, value: string) => {
      const elemento = document.querySelectorAll(element + '[' + attribute + '="' + value + '"]')
      return elemento[0].getAttribute('src')
    }, element, attribute, value)
  }

  async getTextElementByAttributeByPosition (element: string, attribute: string, value: string, position: number): Promise<String> {
    return await this.page.evaluate((element: string, attribute: string, value: string, position: number) => {
      const elemento = document.querySelectorAll(element + '[' + attribute + '="' + value + '"]')
      return elemento[position].innerHTML
    }, element, attribute, value, position)
  }
}
