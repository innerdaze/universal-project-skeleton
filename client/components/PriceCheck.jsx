import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import {
  priceCheckSelectors,
  priceCheckOperations
} from '~features/price-check'
import { appSelectors } from '~features/app'
import Box from 'grommet/components/Box'
import Form from 'grommet/components/Form'
import Button from 'grommet/components/Button'

export const PriceModelDisplay = ({ priceModel }) => (
  <Box pad={{ vertical: 'medium' }}>
    <div>Description: {priceModel.Description}</div>
    <div>Supplier Name: {priceModel.SupplierName}</div>
    <div>Selling Price: {priceModel.SellingPrice}</div>
    <div>POS Price: {priceModel.POSPrice}</div>
    <div>Case Cost Price: {priceModel.CaseCostPrice}</div>
    <div>Case Quantity: {priceModel.CaseQty}</div>
    <div>Cost Price: {priceModel.CostPrice}</div>
    <div>Margin: {priceModel.Margin}</div>
  </Box>
)

export class PriceUpdateForm extends Component {
  static propTypes = {
    priceModel: PropTypes.object,
    updatePrice: PropTypes.func.isRequired,
    currentContext: PropTypes.object
  }

  static defaultProps = {
    priceModel: null,
    currentContext: null
  }

  state = {
    price: 0
  }

  componentDidMount() {
    if (this.props.priceModel) {
      this.setState({ price: this.props.priceModel.SellingPrice })
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.state.priceModel !== newProps.priceModel) {
      this.setState({ price: newProps.priceModel.SellingPrice })
    }
  }

  @autobind
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  @autobind
  onSubmit(e) {
    e.preventDefault()

    const { type, value } = this.props.currentContext

    this.props.updatePrice({
      [type === 'product' ? 'productId' : 'barcode']: value,
      price: this.state.price
    })
  }

  render() {
    const css = `
      #barcodeInputContainer .grommetux-button__icon {
        display: none;
      }

      #barcodeInputContainer .grommetux-number-input {
        display: block;
      }

      #barcodeInputContainer input {
        width: 100%;
      }

      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
      }
      input[type="number"] {
          -moz-appearance: textfield;
      }
    `
    return (
      <Form onSubmit={this.onSubmit}>
        <style>{css}</style>
        <div id='barcodeInputContainer'>
          <input
            placeholder='Enter New Price'
            name='price'
            type='number'
            value={this.state.price}
            onChange={this.onChange}
          />
        </div>
        <Button
          type='submit'
          label='Update Price'
          fill
          primary
          disabled={!this.state.price}
        />
      </Form>
    )
  }
}

const PriceUpdateFormContainer = connect(
  state => ({
    currentContext: priceCheckSelectors.currentContextSelector(state)
  }),
  dispatch => ({
    updatePrice: newPrice =>
      dispatch(priceCheckOperations.updatePrice(newPrice))
  })
)(PriceUpdateForm)

export const PriceCheck = ({
  priceModel,
  priceUpdateIntent,
  intendUpdatePrice,
  allowPriceUpdate
}) =>
  priceModel && (
    <Box>
      <PriceModelDisplay priceModel={priceModel} />
      {allowPriceUpdate &&
        (priceUpdateIntent ? (
          <PriceUpdateFormContainer priceModel={priceModel} />
        ) : (
          <Button onClick={intendUpdatePrice} fill label='Begin Price Update' />
        ))}
    </Box>
  )

export default connect(
  state => ({
    priceModel: priceCheckSelectors.lastPriceCheckSelector(state),
    priceUpdateIntent: priceCheckSelectors.priceUpdateIntentSelector(state),
    allowPriceUpdate: appSelectors.allowPriceUpdateSelector(state)
  }),
  dispatch => ({
    intendUpdatePrice: () => dispatch(priceCheckOperations.intendUpdatePrice())
  })
)(PriceCheck)
