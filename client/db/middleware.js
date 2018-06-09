import { PouchMiddleware as pouchMiddleware } from 'pouch-redux-middleware'
import PouchDB from 'pouchdb'

const db = new PouchDB()

export default pouchMiddleware({ db })
