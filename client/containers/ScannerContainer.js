import { connect } from 'react-redux'
import Scanner from '../components/Scanner'
import { scannerOperations } from '../features/scanner'

const mapDispatchToProps = dispatch => {
  return {
    scan: () => {
      dispatch(scannerOperations.scan())
    }
  }
}

const ScannerContainer = connect(null, mapDispatchToProps)(Scanner)

export default ScannerContainer
