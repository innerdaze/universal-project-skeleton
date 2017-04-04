export default {
  orderEntities: {
    $ID: {
      id: String
    }
  },
  orders: {
    isFetching: Boolean,
    didInvalidate: Boolean,
    lastUpdated: Date,
    items: [String]
  }
}
