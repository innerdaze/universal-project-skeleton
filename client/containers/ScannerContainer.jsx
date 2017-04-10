import { connect } from 'react-redux'
import Scanner from '../components/Scanner.jsx'
import { scan } from '../actions/ScannerActions'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    scan: () => {
      dispatch(scan())
    }
  }
}

const ScannerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scanner)

export default ScannerContainer
