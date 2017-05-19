import {
  RECEIVE_BARCODES
} from '../constants/ActionTypes'
import PouchMiddleware from 'pouch-redux-middleware'
import PouchDB from 'pouchdb'

const db = new PouchDB('/barcodes')

const pouchMiddleware = PouchMiddleware({
  path: '/barcodeEntities',
  db,
  actions: {
    update: doc => {
      return { type: RECEIVE_BARCODES }
    }
  }
})
