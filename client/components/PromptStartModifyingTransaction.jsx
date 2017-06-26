import React from 'react'
import PropTypes from 'prop-types'
import Layer from 'grommet/components/Layer'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
import Title from 'grommet/components/Title'
import Paragraph from 'grommet/components/Paragraph'
import Footer from 'grommet/components/Footer'
import Anchor from 'grommet/components/Anchor'
import CloseIcon from 'grommet/components/icons/base/Close'
import NextLinkIcon from 'grommet/components/icons/base/LinkNext'

const PromptStartModifyingTransaction = ({
  handleSubmit = Function.prototype,
  handleCancel = Function.prototype
}) => (
  <Layer>
    <Header>
      <Title>
        Not so fast!
      </Title>
    </Header>
    <Heading tag='h2'>
      There is already an entry for this product.
    </Heading>
    <Paragraph>
      Would you like to change the quantity?
    </Paragraph>
    <Footer
      pad={{ vertical: 'medium' }}
      justify='between'
      >
      <Anchor
        label='Cancel'
        icon={<CloseIcon/>}
        onClick={handleCancel}
        />
      <Anchor
        primary
        label='Continue'
        icon={<NextLinkIcon/>}
        onClick={handleSubmit}
        />
    </Footer>
  </Layer>
)

PromptStartModifyingTransaction.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
}
