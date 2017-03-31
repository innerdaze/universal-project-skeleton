import React, {Component} from 'react'
import {Router, Route, browserHistory} from 'react-router'
import Login from '../components/Login.jsx'
import ScannedItemListContainer from '../containers/ScannedItemListContainer.jsx'
import Scanner from '../components/Scanner.jsx'
import MainLayout from './MainLayout.jsx'

const routes = (
  <Route component={MainLayout}>
    <Route path="/login" component={Login}/>
    <Route path="/" component={ScannedItemListContainer}/>
    <Route path="/scanner" component={Scanner}/>
  </Route>
)

export default class Root extends Component {

  render() {
    return (
      <Router history={browserHistory} routes={routes}/>
    )
  }

}
