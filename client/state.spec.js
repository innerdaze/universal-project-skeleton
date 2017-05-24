export default {
  deviceID: String,
  app: {
    isInitialized: Boolean
  },
  user: {
    id: String,
    name: String
  },
  session: {
    id: String,
    alive: Boolean,
    isRequesting: Boolean,
    lastUpdated: Date,
    error: Error
  },
  orderEntities: {
    $ID: {
      id: String
    }
  },
  productEntities: {
    $ID: {
      ProductID: String
    }
  },
  barcodeEntities: {
    $ID: {
      BarcodeID: String
    }
  },
  cashierEntities: {
    $ID: {
      CashierID: String
    }
  },
  orders: {
    isFetching: Boolean,
    lastUpdated: Date,
    unprocessedItems: [String],
    processedItems: [String],
    mode: String,
    error: null
  },
  products: {
    isFetching: Boolean,
    didInvalidate: Boolean,
    lastUpdated: Date,
    items: [String]
  },
  barcodes: {
    isFetching: Boolean,
    didInvalidate: Boolean,
    lastUpdated: Date,
    items: [String]
  },
  barcodeLookup: {
    lastQuery: String,
    lastError: Error
  },
  cashiers: {
    isFetching: Boolean,
    didInvalidate: Boolean,
    lastUpdated: Date,
    items: [String]
  },
  scanner: {
    isScanning: Boolean
  }
}
