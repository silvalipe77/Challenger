import { Scraping } from '../controlers/scraping'
import { MongoHelper } from '../utils/mongo-helper-protocols'
import cron from 'node-cron'

export default (mongoHelper: MongoHelper): void => {
  
  cron.schedule('* 8 * * *', async () => {
    const scraping = new Scraping('https://world.openfoodfacts.org')
    await scraping.executar()
    const produtos = await scraping.getProdutosJson()
    const accountCollection = await mongoHelper.getCollection('produtos')
    await accountCollection.insertMany(produtos)
    console.log('running a task every minute')
  })
}
