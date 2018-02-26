import React from 'react'
import ScannedItemList from '../../components/ScannedItemList.jsx'

test('render a ScannedItemList', () => {
  const wrapper = shallow(
    <ScannedItemList
      onDeleteItemClick={Function.prototype}
      onDeleteItemConfirm={Function.prototype}
      onDeleteItemCancel={Function.prototype}
      onChangeOrderQuantityClick={Function.prototype}
    />
  )
  expect(wrapper).toMatchSnapshot()
})
