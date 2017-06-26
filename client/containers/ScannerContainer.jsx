import { connect } from 'react-redux'
import Scanner from '../components/Scanner'
import { scan } from '../actions/ScannerActions'

const mapDispatchToProps = dispatch => {
  return {
    scan: () => {
      dispatch(scan())
    }
  }
}

const ScannerContainer = connect(
  null,
  mapDispatchToProps
)(Scanner)

export default ScannerContainer
