import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import Modes from '../constants/OperationModes'

class ModeSwitcher extends Component {
  static propTypes = {
    onSwitch: PropTypes.func.isRequired,
    activeMode: PropTypes.number
  }

  static defaultProps = {
    onSwitch: Function.prototype,
    activeMode: Modes.ORDERING
  }

  state = {
    mode: Modes.ORDERING
  }

  componentWillMount() {
    this.setState({
      mode: this.props.activeMode
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.mode !== nextProps.activeMode) {
      this.setState({
        mode: nextProps.activeMode
      })
    }
  }

  @autobind
  changeMode(mode) {
    this.setState({ mode })

    this.props.onSwitch(mode)
  }

  @autobind
  handleStockTakeSelect() {
    this.changeMode(Modes.STOCKTAKE)
  }

  @autobind
  handleOrderSelect() {
    this.changeMode(Modes.ORDERING)
  }

  @autobind
  handleDeliverySelect() {
    this.changeMode(Modes.DELIVERY)
  }

  @autobind
  handleShelfLabelsSelect() {
    this.changeMode(Modes.SHELF_LABELS)
  }

  @autobind
  handlePriceCheckSelect() {
    this.changeMode(Modes.PRICE_CHECK)
  }

  render() {
    return (
      <Menu primary>
        <Anchor
          label='Stocktake'
          className={this.state.mode === Modes.STOCKTAKE && 'active'}
          onClick={this.handleStockTakeSelect}
        />
        <Anchor
          label='Order'
          className={this.state.mode === Modes.ORDERING && 'active'}
          onClick={this.handleOrderSelect}
        />
        <Anchor
          label='Delivery'
          className={this.state.mode === Modes.DELIVERY && 'active'}
          onClick={this.handleDeliverySelect}
        />
        <Anchor
          label='Shelf Labels'
          className={this.state.mode === Modes.SHELF_LABELS && 'active'}
          onClick={this.handleShelfLabelsSelect}
        />
      </Menu>
    )
  }
}

export default ModeSwitcher
