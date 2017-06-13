import React, { Component } from 'react'
import Form from 'grommet/components/Form'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Footer from 'grommet/components/Footer'

class Scanner extends Component {

  constructor(props) {
    super(props)

    this.state = {
      barcode: null
    }

    this.handleEnterBarcodeManually = this.handleEnterBarcodeManually.bind(this)
    this.handleStartScanClick = this.handleStartScanClick.bind(this)
    this.onEnterBarcodeFieldChange = this.onEnterBarcodeFieldChange.bind(this)
  }

  onEnterBarcodeFieldChange(e) {
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
      <Box direction="row">
        <Form direction="row">
          <FormField>
            <TextInput
              placeHolder="Enter Barcode"
              onDOMChange={this.onEnterBarcodeFieldChange}
              />
          </FormField>
          <Button
            type="submit"
            label="Submit"
            primary
            onClick={this.handleEnterBarcodeManually}
            />
        </Form>
      </Box>
    )
  }
}

export default Scanner
