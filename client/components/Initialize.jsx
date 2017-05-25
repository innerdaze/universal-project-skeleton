import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Box from 'grommet/components/Box'
import Notification from 'grommet/components/Notification'
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

  _onApiRootFieldChange(e) {
    this.setState({ apiRoot: e.target.value })
  }

  _onFormSubmit(e) {
    e.preventDefault()
    this.props.onApiRootFormSubmit(this.state.apiRoot)
  }

  render() {
    return (
      <Box justify='center'
        align='center'
        full={true}>
        <Form onSubmit={this._onFormSubmit}>
          <Header>
            <Heading>
              Welcome
            </Heading>
          </Header>
          <Paragraph size='large'>
            I see it's your first time here.
          </Paragraph>
          <Paragraph>
            Enter the API root URL a provided by Orbis to get started.
          </Paragraph>
          <FormField>
            <TextInput name='apiRoot' value={this.state.apiRoot} onDOMChange={this._onApiRootFieldChange} />
          </FormField>
          <Footer pad={{vertical: 'medium'}}>
            <Button label='Continue' type='submit' onClick={this._onFormSubmit} />
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
