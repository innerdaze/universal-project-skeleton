import { PouchMiddleware as pouchMiddleware } from 'pouch-redux-middleware'
import PouchDB from 'pouchdb'
import { RECEIVE_BARCODES } from '../constants/ActionTypes'

export default pouchMiddleware({
  path: '/barcodeEntities',
  db: new PouchDB('/barcodes'),
  actions: {
    update: () => {
      return { type: RECEIVE_BARCODES }
    }
  }
})
