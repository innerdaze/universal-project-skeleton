import React, { Component } from 'react'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import createFilter from 'redux-persist-transform-filter'
import localForage from 'localforage'
import PropTypes from 'prop-types'
import reducer from '../reducers'

class AppProvider extends Component {

  constructor(props) {
    super(props)

    this.state = {
      rehydrated: false
    }
  }

  componentWillMount(){
    persistStore(this.props.store, {
      storage: localForage,
      whitelist: [
        'orderEntities',
        'orders',
        'productEntities',
        'products',
        'cashierEntities',
        'cashiers',
        'barcodeEntities',
        'barcodes',
        'app',
        'session'
      ],
      transforms: [
        createFilter('orders', ['unprocessedItems', 'processedItems']),
        createFilter('products', ['items']),
        createFilter('cashiers', ['items']),
        createFilter('barcodes', ['items'])
        // createFilter('app', ['initialized', 'apiRoot'])
      ]
    }, () => {
      this.setState({
        rehydrated: true
      })
    })
  }

  render() {
    if(!this.state.rehydrated){
      return <div>Loading...</div>
    }
    return (
      <Provider store={this.props.store}>
        { this.props.children }
      </Provider>
    )
  }
}

AppProvider.propTypes = {
  store: PropTypes.object.isRequired
}

AppProvider.defaultProps = {
  store: {}
}

export default AppProvider
