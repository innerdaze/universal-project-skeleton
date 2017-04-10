import React, { Component } from 'react'
import Layer from 'grommet/components/Layer'
import Form from 'grommet/components/Form'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'
import Anchor from 'grommet/components/Anchor'
import FormField from 'grommet/components/FormField'
import NumberInput from 'grommet/components/NumberInput'
import CloseIcon from 'grommet/components/icons/base/Close'
import NextLinkIcon from 'grommet/components/icons/base/LinkNext'

class ChangeOrderQuantityForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      quantity: null
    }

    this.onNumberInputChange = this.onNumberInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.order.Qty
    })
  }

  onNumberInputChange(e) {
    this.setState({
      quantity: parseInt(e.target.value)
    })
  }

  onSubmit(e) {
    e.preventDefault()

    this.props.changeOrderQuantity(this.props.order.Barcode, this.state.quantity)

    this.props.onSubmit()
  }

  onCancel(e) {
    e.preventDefault()

    this.props.onCancel()
  }

  render() {
    return (
      <Layer>
        <Form>
          <Header>
            <Heading>
              Change Order Quantity
            </Heading>
          </Header>
          <FormField>
            <NumberInput
              min={1}
              value={this.state.quantity}
              onChange={this.onNumberInputChange}/>
          </FormField>
          <Footer
            pad={{'vertical': 'medium'}}
            justify='between'>
            <Anchor
              label='Cancel'
              icon={<CloseIcon/>}
              onClick={this.onCancel}/>
            <Anchor
              primary={true}
              label='Submit'
              icon={<NextLinkIcon/>}
              onClick={this.onSubmit}/>
          </Footer>
        </Form>
      </Layer>
    )
  }
}

ChangeOrderQuantityForm.propTypes = {
  order: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired
}

ChangeOrderQuantityForm.propDefaults = {
  order: null,
  onChangeOrderQuantitySubmit: Function.prototype,
  onChangeOrderQuantityChange: Function.prototype,
}

export default ChangeOrderQuantityForm
