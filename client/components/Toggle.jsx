/**
 *
 * Usage:
 *
 *    <Toggle
 *      priority='A'
 *      renderA={toggle => (
 *        <div>
 *          <button onClick={toggle}>Show More</button>
 *        </div>
 *      )}
 *      renderB={toggle => (
 *        <div>
 *          <p>Extra Details</p>
 *          <button onClick={toggle}>Show Less</button>
 *        </div>
 *      )}
 *    />
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'

const STATES = {
  A: 'A',
  B: 'B'
}

const defaultPriority = STATES.A

export default class Toggle extends Component {
  static propTypes = {
    priority: PropTypes.oneOf([STATES.A, STATES.B]),
    renderA: PropTypes.func.isRequired,
    renderB: PropTypes.func.isRequired
  }

  static defaultProps = {
    priority: defaultPriority
  }

  state = {
    priority: defaultPriority
  }

  componentWillMount() {
    if (this.state.priority !== this.props.priority) {
      this.setState({
        priority: this.props.priority
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.priority !== nextProps.priority) {
      this.setState({
        priority: nextProps.priority
      })
    }
  }

  @autobind
  toggle() {
    this.setState({
      priority: this.state.priority === STATES.A ? STATES.B : STATES.A
    })
  }

  render() {
    return this.state.priority === STATES.A
      ? this.props.renderA(this.toggle)
      : this.props.renderB(this.toggle)
  }
}
