import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

  componentWillReceiveProps(newProps){
    if (this.state.error === newProps.error) {
      return false
    } else {
      this.setState({
        error: newProps.error
      })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmitBarcode(this.state.barcode)
  }

  onCloseError() {
    this.setState({
      error: null
    })
  }

  render() {
    return (
      <Form plain>
        { this.state.error &&
          <Notification
            status='critical'
            onClose={this.onCloseError}
            >
            {this.state.error}
          </Notification>
        }
        <Box
          direction='row'
          alignContent='stretch'
          >
          <TextInput
            placeHolder="Enter barcode"
            onDOMChange={this.onChange}
            value={this.state.barcode}
            />
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
