import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'grommet/components/Form'
import NumberInput from 'grommet/components/NumberInput'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'
import Toast from 'grommet/components/Toast'
import Box from 'grommet/components/Box'

class BarcodeInputForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      barcode: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({
      barcode: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    this.props.onSubmitBarcode(this.state.barcode)

    this.setState({
      barcode: ''
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
    `
    return (
      <Form plain>
        <style>{css}</style>
        <Box
          direction='row'
          alignContent='stretch'
          >
          <div id='barcodeInputContainer'>
            <NumberInput
              placeholder="Enter barcode"
              onChange={this.onChange}
              value={this.state.barcode}
              />
          </div>
          <Button
            label='Submit'
            type="submit"
            secondary
            fill
            onClick={this.onSubmit}
            />
        </Box>
      </Form>
    )
  }
}

BarcodeInputForm.propTypes = {
  onSubmitBarcode: PropTypes.func.isRequired,
  barcodes: PropTypes.array.isRequired
}

BarcodeInputForm.defaultProps = {
  onSubmitBarcode: Function.prototype,
  barcodes: []
}

export default BarcodeInputForm
