import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Box from 'grommet/components/Box'
import Form from 'grommet/components/Form'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
import Paragraph from 'grommet/components/Paragraph'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'

class Initialize extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apiRoot: ''
    }

    this._onApiRootFieldChange = this._onApiRootFieldChange.bind(this)
    this._onFormSubmit = this._onFormSubmit.bind(this)
  }

  handleApiRootFieldChange(e) {
    this.setState({ apiRoot: e.target.value })
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.props.onApiRootFormSubmit(this.state.apiRoot)
  }

  render() {
    return (
      <Box
        full
        justify='center'
        align='center'
        pad={{ horizontal: 'medium' }}
        >
        <Form onSubmit={this.handleFormSubmit}>
          <Header>
            <Heading>
              Welcome
            </Heading>
          </Header>
          <Paragraph size='large'>
            I see it\'s your first time here.
          </Paragraph>
          <Paragraph>
            Enter the API root URL provided by Orbis to get started.
          </Paragraph>
          <FormField error={this.props.apiRootValidationError}>
            <TextInput name='apiRoot' value={this.state.apiRoot} onDOMChange={this.handleApiRootFieldChange}/>
          </FormField>
          <Footer pad={{ vertical: 'medium' }}>
            <Button label='Continue' type='submit' onClick={this.handleFormSubmit}/>
          </Footer>
        </Form>
      </Box>
    )
  }
}

Initialize.propTypes = {
  onApiRootFormSubmit: PropTypes.func.isRequired
}

Initialize.defaultProps = {
  onApiRootFormSubmit: Function.prototype
}

export default Initialize
