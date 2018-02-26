import React from 'react'
import ScannedItem from '../../components/ScannedItem.jsx'

test('render a ScannedItem', () => {
  const wrapper = shallow(
    <ScannedItem
      data={{}}
      onChangeQuantityClick={Function.prototype}
      onDeleteClick={Function.prototype}
      render={Function.prototype}
    />
  )
  expect(wrapper).toMatchSnapshot()
})

test('render a ScannedItem with data and a render prop', () => {
  const wrapper = shallow(
    <ScannedItem
      data={{ title: 'TEST' }}
      onChangeQuantityClick={Function.prototype}
      onDeleteClick={Function.prototype}
      render={({ title }) => <span>{title}</span>}
    />
  )
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('span').text()).toEqual('TEST')
})
