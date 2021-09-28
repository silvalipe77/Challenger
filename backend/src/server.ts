import { MongoHelper } from './utils/mongo-helper'
import env from './config/env'
import app from './config/app'
import routes from './config/routes'
import cron from './config/cron'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    routes(app, MongoHelper)
    cron(MongoHelper)
    app.listen(env.port, () => console.log(`Servidor executando em http://localhost:${env.port}`))
  })
  .catch(console.error)
