import { Crawer } from './crawer'
import { Produto } from '../models/produto.model'

export class Scraping {
  private readonly crawer: Crawer
  private urls: string[]
  private readonly produtosJson: Produto[]

  constructor (url: string) {
    this.crawer = new Crawer(url)
    this.produtosJson = []
  }

  async executar (): Promise<void> {
    await this.crawer.openPageBase()
    this.urls = await this.crawer.getUrlsById('products_tabs_content')
    if (this.urls.length > 0) {
      await this.capturarProduto(0)
    }
  }

  private async capturarProduto (id: number): Promise<void> {
    try {
      await this.crawer.openUrl(this.urls[id])
      const produto: Produto = new Produto()
      produto.code = await (await (this.crawer.getTextElementByAttribute('span', 'property', 'food:code')))
      produto.barcode = await (await this.crawer.getTextElementByAttribute('p', 'id', 'barcode_paragraph')).replace('\n        Barcode:  ', '').replace('\n    ', '').replace(' (', '(')
      const event = new Date()
      produto.imported_t = event.toString()
      produto.url = this.urls[id]
      produto.product_name = await (await this.crawer.getTextElementByAttribute('h1', 'property', 'food:name'))
      produto.quantity = await (await this.crawer.getTextElementByAttribute('span', 'id', 'field_quantity_value'))
      produto.categories = await (await this.crawer.getTextElementByAttribute('span', 'id', 'field_categories_value'))
      produto.packaging = await (await this.crawer.getTextElementByAttribute('span', 'id', 'field_packaging_value'))
      produto.brands = await (await this.crawer.getTextElementByAttribute('span', 'id', 'field_brands_value'))
      const imgSrc = await (await this.crawer.getImgSrcElementByAttribute('img', 'id', 'og_image'))
      produto.image_url = `https://static.openfoodfacts.org${imgSrc}`
      produto.store = await (await this.crawer.getTextElementByAttribute('span', 'id', 'field_stores_value'))
      produto.status = 'imported'
      this.produtosJson.push(produto)
    } catch {
      console.log('erro ao capturar o produto que está contido na URL: ', this.urls[id])
    }
    if (this.urls.length > id + 1) {
      await this.capturarProduto(id + 1)
    } else {
      console.log(this.produtosJson)
      await this.crawer.closeNavigator()
    }
  }

  async getProdutosJson (): Promise<Produto[]> {
    return this.produtosJson
  }
}
