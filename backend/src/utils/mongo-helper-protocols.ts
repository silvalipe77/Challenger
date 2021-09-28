import { Collection, MongoClient } from 'mongodb'

export interface MongoHelper {
  client: MongoClient
  url: string

  connect: (url: string) => Promise<void>

  disconnect: () => Promise<void>

  getCollection: (name: string) => Promise<Collection>

  map: (collection: any) => any
}
