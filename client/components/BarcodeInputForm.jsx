import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'grommet/components/Form'
import Button from 'grommet/components/Button'
import Box from 'grommet/components/Box'
import Modes from '../constants/OperationModes'
import { orderSelectors } from '../features/order'
class BarcodeInputForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      barcode: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.receiveFocus = this.receiveFocus.bind(this)
    this.assignInputRef = this.assignInputRef.bind(this)
  }

  componentDidMount() {
    this.receiveFocus()
  }

  componentWillReceiveProps(newProps) {
    if (
      this.props.shouldFocusField !== newProps.shouldFocusField &&
      newProps.shouldFocusField
    ) {
      this.receiveFocus()
    }
  }

  handleChange(e) {
    this.setState({
      barcode: e.target.value
    })
  }

  receiveFocus() {
    setTimeout(() => {
      this.inputRef.focus()
      this.inputRef.select()
    }, 100)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmitBarcode(this.state.barcode)
    this.setState({
      barcode: ''
    })
  }

  assignInputRef(ref) {
    this.inputRef = ref
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
      <Form plain>
        <style>{css}</style>
        <Box direction='row' alignContent='stretch'>
          <div id='barcodeInputContainer'>
            <input
              autoFocus
              placeholder='Enter barcode'
              value={this.state.barcode}
              ref={this.assignInputRef}
              onChange={this.handleChange}
            />
          </div>
          <Button
            secondary
            fill
            label='Search'
            type='submit'
            onClick={this.handleSubmit}
          />
        </Box>
      </Form>
    )
  }
}

BarcodeInputForm.propTypes = {
  onSubmitBarcode: PropTypes.func.isRequired,
  shouldFocusField: PropTypes.bool.isRequired
}

BarcodeInputForm.defaultProps = {
  onSubmitBarcode: Function.prototype,
  shouldFocusField: PropTypes.bool.isRequired
}

export default BarcodeInputForm
