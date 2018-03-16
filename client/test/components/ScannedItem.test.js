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

test('onChangeQuantityClick fires with passed data prop', () => {
  const spy = jest.fn()
  const mockData = {}

  const wrapper = shallow(
    <ScannedItem
      data={mockData}
      render={Function.prototype}
      onDeleteClick={Function.prototype}
      onChangeQuantityClick={spy}
    />
  )

  const anchor = wrapper.find('Anchor').get(0)

  shallow(anchor).simulate('click')

  expect(spy).toHaveBeenCalledWith(mockData)
})

test('onDeleteClick fires with passed data prop', () => {
  const spy = jest.fn()
  const mockData = {}

  const wrapper = shallow(
    <ScannedItem
      data={mockData}
      render={Function.prototype}
      onDeleteClick={spy}
      onChangeQuantityClick={Function.prototype}
    />
  )

  const anchor = wrapper.find('Anchor').get(1)

  shallow(anchor).simulate('click')

  expect(spy).toHaveBeenCalledWith(mockData)
})
