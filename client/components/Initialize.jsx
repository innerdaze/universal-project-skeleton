import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import Box from 'grommet/components/Box'
import Form from 'grommet/components/Form'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
import Paragraph from 'grommet/components/Paragraph'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import NumberInput from 'grommet/components/NumberInput'
import CheckBox from 'grommet/components/CheckBox'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'

class Initialize extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apiRoot: '',
      storeID: '',
      allowPriceUpdate: false
    }

    this.handleApiRootFieldChange = this.handleApiRootFieldChange.bind(this)
    this.handleStoreIDFieldChange = this.handleStoreIDFieldChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleStoreIDFieldChange(e) {
    this.setState({ storeID: e.target.value })
  }

  handleApiRootFieldChange(e) {
    this.setState({ apiRoot: e.target.value })
  }

  @autobind
  handleAllowPriceUpdateFieldChange(e) {
    this.setState({ allowPriceUpdate: e.target.checked })
  }

  handleFormSubmit(e) {
    e.preventDefault()
    window.scrollTo(0, 0)
    this.props.onApiRootFormSubmit({
      apiRoot: this.state.apiRoot,
      storeID: this.state.storeID,
      allowPriceUpdate: this.state.allowPriceUpdate
    })
  }

  render() {
    return (
      <Box full justify='center' align='center' pad={{ horizontal: 'medium' }}>
        <Form onSubmit={this.handleFormSubmit}>
          <Header>
            <Heading>Welcome</Heading>
          </Header>
          <Paragraph size='large'>I see it's your first time here.</Paragraph>
          <Paragraph>
            Enter the API root URL provided by Orbis to get started.
          </Paragraph>
          <FormField error={this.props.apiRootValidationError || ''}>
            <TextInput
              name='apiRoot'
              value={this.state.apiRoot}
              onDOMChange={this.handleApiRootFieldChange}
            />
          </FormField>
          <Paragraph>Set the ID of your store.</Paragraph>
          <FormField>
            <TextInput
              name='storeID'
              value={this.state.storeID}
              onDOMChange={this.handleStoreIDFieldChange}
            />
          </FormField>
          <Paragraph>
            <CheckBox
              toggle
              name='allowPriceUpdate'
              label='Allow price updates'
              checked={this.state.allowPriceUpdate}
              onChange={this.handleAllowPriceUpdateFieldChange}
            />
          </Paragraph>
          <Footer pad={{ vertical: 'medium' }}>
            <Button
              label='Continue'
              type='submit'
              onClick={this.handleFormSubmit}
            />
          </Footer>
        </Form>
      </Box>
    )
  }
}

Initialize.propTypes = {
  onApiRootFormSubmit: PropTypes.func.isRequired,
  apiRootValidationError: PropTypes.any
}

Initialize.defaultProps = {
  onApiRootFormSubmit: Function.prototype,
  apiRootValidationError: null
}

export default Initialize
