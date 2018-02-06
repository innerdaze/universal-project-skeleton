import React, { Component } from 'react'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import createFilter from 'redux-persist-transform-filter'
import localForage from 'localforage'
import PropTypes from 'prop-types'

class AppProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rehydrated: false
    }
  };

  componentWillMount(){
    persistStore(this.props.store, {
      storage: localForage
    }, () => {
      this.setState({
        rehydrated: true
      })
    })
  };

  render() {
    if(!this.state.rehydrated){
      return <p>{'Loading...'}</p>
    }
    return (
      <Provider store={this.props.store}>
        { this.props.children }
      </Provider>
    )
  };
};

AppProvider.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

export default AppProvider















// import React, { Component } from 'react'
// import { Provider } from 'react-redux'
// import { persistStore } from 'redux-persist'
// import createFilter from 'redux-persist-transform-filter'
// import localForage from 'localforage'
// import PropTypes from 'prop-types'
// import Splash from './Splash'
// import * as reducers from '../ducks'
// class AppProvider extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       rehydrated: false
//     }
//   }

//   componentWillMount() {
//     persistStore(this.props.store, {
//       storage: localForage,
//       whitelist: [
//         'orderEntities',
//         'orders',
//         'productEntities',
//         'products',
//         'productIDsByProductName',
//         'cashierEntities',
//         'cashiers',
//         'barcodeEntities',
//         'barcodes',
//         'barcodeIDsByProductID',
//         'app',
//         'session'
//       ],
//       transforms: [
//         createFilter('orders', ['unprocessedItems', 'processedItems']),
//         createFilter('products', ['items']),
//         createFilter('cashiers', ['items', 'idByUsername', 'activeCashier']),
//         createFilter('barcodes', ['items'])
//       ]
//     }, () => {
//       this.setState({
//         rehydrated: true
//       })
//     })
//   }

//   render() {
//     if (!this.state.rehydrated) {
//       return <Splash/>
//     }
//     return (
//       <Provider store={this.props.store}>
//         { this.props.children }
//       </Provider>
//     )
//   }
// }

// AppProvider.propTypes = {
//   store: PropTypes.object.isRequired,
//   children: PropTypes.object.isRequired
// }

// export default AppProvider
