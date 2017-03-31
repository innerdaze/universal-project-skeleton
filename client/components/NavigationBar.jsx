import React, {Component} from 'react'
import {Link} from 'react-router'

export default class NavigationBar extends Component {

  render() {
    return (
      <footer>
        <nav>
          <ul>
            <li><Link to="/scanner">Scan</Link></li>
            <li><Link to="/">List</Link></li>
          </ul>
        </nav>
      </footer>
    )
  }

}
