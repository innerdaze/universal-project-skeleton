import React, { Component } from 'react'

export default class MyRootAppComponent extends Component {

  render () {
    // only allowed 1 root element here
    return (
      <div>
        <h1>{"It's a React page!"}</h1>
        <p>nomnomnom</p>
      </div>
    )
  }

}
