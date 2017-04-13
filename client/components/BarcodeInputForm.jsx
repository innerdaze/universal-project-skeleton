import React, { Component, PropTypes } from 'react'
import Form from 'grommet/components/Form'
import TextInput from 'grommet/components/TextInput'
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
    this.onCloseError = this.onCloseError.bind(this)
  }

  onChange(e) {
    this.setState({
      barcode: e.target.value,
      error: null
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const foundBarcode = this.props.barcodes[this.state.barcode]

    const found = this.props.matchBarcode(this.state.barcode)

    if (foundBarcode) {

      const now = new Date()

      const order = {
        // Now
        __type: 'HandheldTrans',
        AreaID: '',
        Barcode: this.state.barcode,
        Qty: 1,
        Ref1: '',
        Ref2: '',
        TransType: this.props.mode,
        UnitID: '',
        // When processing
        //TermianlID: store.getState().terminalID,
        TransDate: now.toISOString().substr(-1)
        //UserID: store.getState().user.id
      }

      this.props.createTransaction(this.props.mode, foundBarcode, 1)
    } else {
      this.setState({
        error: 'No match for barcode'
      })
    }
  }

  onCloseError() {
    this.setState({
      error: null
    })
  }

  render() {
    return (
      <Form plain={true}>
        { this.state.error &&
          <Toast
            status='critical'
            onClose={this.onCloseError}>
            {this.state.error}
          </Toast>
        }
        <Box
          direction='row'>
          <TextInput
            placeHolder="Enter barcode"
            onDOMChange={this.onChange}
            value={this.state.barcode}/>
          <Button label='Submit'
            type='submit'
            primary={true}
            onClick={this.onSubmit}/>
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
