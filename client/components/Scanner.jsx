import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'grommet/components/Form'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'

class Scanner extends Component {

  constructor(props) {
    super(props)

    this.state = {
      barcode: null
    }

    this.handleEnterBarcodeManually = this.handleEnterBarcodeManually.bind(this)
    this.handleStartScanClick = this.handleStartScanClick.bind(this)
    this.handleEnterBarcodeFieldChange = this.handleEnterBarcodeFieldChange.bind(this)
  }

  handleEnterBarcodeFieldChange(e) {
    this.setState({
      barcode: e.target.value
    })
  }

  handleEnterBarcodeManually(e) {
    e.preventDefault()
    this.props.onSubmitBarcode(this.state.barcode)
  }

  handleStartScanClick() {
    this.props.scan()
  }

  render() {
    return (
      <Box direction='row'>
        <Form direction='row'>
          <FormField>
            <TextInput
              placeHolder='Enter Barcode'
              onDOMChange={this.handleEnterBarcodeFieldChange}
              />
          </FormField>
          <Button
            primary
            type='submit'
            label='Submit'
            onClick={this.handleEnterBarcodeManually}
            />
        </Form>
      </Box>
    )
  }
}

Scanner.propTypes = {
  onSubmitBarcode: PropTypes.func.isRequired,
  scan: PropTypes.func.isRequired
}

export default Scanner
