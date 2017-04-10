import React, { Component, PropTypes } from 'react'
import { store } from '../index.jsx'
import Form from 'grommet/components/Form'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'
import Toast from 'grommet/components/Toast'

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

    const foundBarcode = store.getState().barcodeEntities[this.state.barcode]

    if (foundBarcode) {

      const now = new Date()

      const order = {
        __type: 'HandheldTrans',
        AreaID: '',
        Barcode: this.state.barcode,
        Qty: 1,
        Ref1: '',
        Ref2: '',
        TermianlID: store.getState().terminalID,
        TransDate: now.toISOString().substr(-1),
        TransType: 10,
        UnitID: '',
        UserID: store.getState().user.id
      }

      this.props.onSubmitBarcode(foundBarcode)
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
      <Form compact={true}>
        { this.state.error &&
          <Toast
            status='critical'
            onClose={this.onCloseError}>
            {this.state.error}
          </Toast>
        }
        <FormField>
          <TextInput
            placeHolder="Enter barcode"
            onDOMChange={this.onChange}
            value={this.state.barcode}/>
        </FormField>
        <Footer>
          <Button label='Submit'
            type='submit'
            primary={true}
            onClick={this.onSubmit}/>
        </Footer>
      </Form>
    )
  }
}

BarcodeInputForm.propTypes = {
  onSubmitBarcode: PropTypes.func.isRequired
}

BarcodeInputForm.defaultProps = {
  onSubmitBarcode: Function.prototype
}

export default BarcodeInputForm
