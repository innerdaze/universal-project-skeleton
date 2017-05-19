export default function barcodeLookup(state = {
  lastQuery: null,
  lastError: null
}, action) {
  switch (action.type) {
    case 'LOOKUP_BARCODE':
      return {
        ...state,
        lastQuery: action.barcodeID
      }
    case 'FAIL_LOOKUP_BARCODE':
      return {
        ...state,
        lastError: action.error
      }
    default:
      return state
  }
}
