import { connect } from 'react-redux'
import StoreIDLabel from '../components/StoreIDLabel'

const mapStateToProps = state => {
  return {
    storeID: state.app.storeID
  }
}

export default connect(
  mapStateToProps
)(StoreIDLabel)
