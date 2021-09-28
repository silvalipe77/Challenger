import { Express, Router } from 'express'
import { MongoHelper } from '../utils/mongo-helper-protocols'

export default (app: Express, mongoHelper: MongoHelper): void => {
  const router = Router()
  app.use('/', router)

  app.get('/', (req, res) => {
    res.status(200).send('Fullstack Challenge 2021')
  })

  
  app.get('/products/:code', async (req, res) => {
    const { code } = req.params
    const connect = await mongoHelper.getCollection('produtos')
    const product = await connect.findOne({ code })
    res.status(200).send(product)
  })

 
  app.get('/products', async (req, res) => {
    const page = Number(req.query.page) || 1
    const connect = await mongoHelper.getCollection('produtos')
    const products = await connect.find().skip((page - 1) * 9).limit(9).toArray()

    
    console.log(products)
    res.status(200).send(products)
  })
}
