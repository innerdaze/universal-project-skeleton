import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layer from 'grommet/components/Layer'
import Form from 'grommet/components/Form'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'
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

    this.onNumberInputChange = this.onNumberInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.receiveFocus = this.receiveFocus.bind(this)
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.order.Qty
    })

    this.inputRef.focus()
    this.inputRef.select()
  }

  onNumberInputChange(e) {
    this.setState({
      quantity: parseInt(e.target.value)
    })
  }

  onSubmit(e) {
    e.preventDefault()

    this.props.onSubmit(this.props.order._id, this.state.quantity)
  }

  onCancel(e) {
    e.preventDefault()

    this.props.onCancel()
  }

  receiveFocus() {
    this.inputRef.focus()
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
              type='number'
              min={1}
              placeholder='Enter quantity'
              onChange={this.onNumberInputChange}
              value={this.state.quantity}
              ref={ref => this.inputRef = ref}
              />
          </FormField>
          <Footer
            pad={{ vertical: 'medium' }}
            justify='between'
            >
            <Anchor
              label='Cancel'
              icon={<CloseIcon/>}
              onClick={this.onCancel}
              />
            <Anchor
              primary
              label='Update'
              icon={<NextLinkIcon/>}
              onClick={this.onSubmit}
              />
          </Footer>
        </Form>
      </Layer>
    )
  }
}

ChangeOrderQuantityForm.propTypes = {
  order: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

ChangeOrderQuantityForm.propDefaults = {
  order: null,
  onSubmit: Function.prototype,
  onCancel: Function.prototype
}

export default ChangeOrderQuantityForm
