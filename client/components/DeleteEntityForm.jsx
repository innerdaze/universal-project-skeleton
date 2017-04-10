import React, { PropTypes } from 'react'
import Layer from 'grommet/components/Layer'
import Paragraph from 'grommet/components/Paragraph'
import Footer from 'grommet/components/Footer'
import Anchor from 'grommet/components/Anchor'
import CloseIcon from 'grommet/components/icons/base/Close'
import TrashIcon from 'grommet/components/icons/base/Trash'

const DeleteEntityForm = ({ message, onConfirm, onCancel }) => (
  <Layer>
    <Paragraph
      align='center'>
      {message}
    </Paragraph>
    <Footer
      justify='between'>
      <Anchor
        label='Cancel'
        icon={<CloseIcon/>}
        onClick={onCancel}/>
      <Anchor
        primary={true}
        label='Confirm'
        icon={<TrashIcon/>}
        onClick={onConfirm}/>
    </Footer>
  </Layer>
)

DeleteEntityForm.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

DeleteEntityForm.defaultProps = {
  message: 'Confirm you would like to delete this item',
  onConfirm: Function.prototype,
  onCancel: Function.prototype
}

export default DeleteEntityForm
