import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layer from 'grommet/components/Layer'
import Form from 'grommet/components/Form'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
import Footer from 'grommet/components/Footer'
import Anchor from 'grommet/components/Anchor'
import FormField from 'grommet/components/FormField'
import Label from 'grommet/components/Label'
import Box from 'grommet/components/Box'
import CloseIcon from 'grommet/components/icons/base/Close'
import NextLinkIcon from 'grommet/components/icons/base/LinkNext'

class ChangeOrderQuantityForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      quantity: 1
    }

    this.handleNumberInputChange = this.handleNumberInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.receiveFocus = this.receiveFocus.bind(this)
    this.assignInputRef = this.assignInputRef.bind(this)
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.order.Qty
    })

    setTimeout(() => {
      this.inputRef.focus()
      this.inputRef.select()
    }, 100)
  }

  handleNumberInputChange(e) {
    this.setState({
      quantity: parseInt(e.target.value, 10)
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    this.props.handleSubmit(this.props.order._id, this.state.quantity)
  }

  handleCancel(e) {
    e.preventDefault()

    this.props.handleCancel()
  }

  receiveFocus() {
    this.inputRef.focus()
  }

  assignInputRef(ref) {
    this.inputRef = ref
  }

  render() {
    return (
      <Layer>
        <Form>
          <Header>
            <Heading>
              Set Quantity
            </Heading>
          </Header>
          {this.props.order.ProductName && (
            <Box>
              <Label>
                {this.props.order.ProductName}
              </Label>
            </Box>
          )}
          <FormField>
            <input
              autoFocus
              type='number'
              placeholder='Enter quantity'
              ref={this.assignInputRef}
              onChange={this.handleNumberInputChange}
              value={this.state.quantity}
              />
          </FormField>
          <Footer
            pad={{ vertical: 'medium' }}
            justify='between'
            >
            <Anchor
              label='Cancel'
              icon={<CloseIcon/>}
              onClick={this.handleCancel}
              />
            <Anchor
              primary
              label='Update'
              icon={<NextLinkIcon/>}
              onClick={this.handleSubmit}
              />
          </Footer>
        </Form>
      </Layer>
    )
  }
}

ChangeOrderQuantityForm.propTypes = {
  order: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
}

ChangeOrderQuantityForm.propDefaults = {
  order: null,
  handleSubmit: Function.prototype,
  handleCancel: Function.prototype
}

export default ChangeOrderQuantityForm
