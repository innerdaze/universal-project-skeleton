import React from 'react'
import ProductSearchResults from '../../components/ProductSearchResults'

let wrapper, items

describe('Testing on ProductSearchResults...', () => {
  beforeEach(() => {
    items = [
      {
        ProductID: 'FooID',
        ProductName: 'BarName'
      }
    ]
    wrapper = shallow(<ProductSearchResults items={items} />)
  })

  describe('ProductSearchResults layout', () => {
    test('Expect to have a List and ListItem comps', () => {
      expect(wrapper.find('List')).toHaveLength(1)
      expect(wrapper.find('ListItem')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })

    test('Expect to have a List and without ListItem comp if items props is empty array', () => {
      items = []
      wrapper = shallow(<ProductSearchResults items={items} />)
      expect(wrapper.find('List')).toHaveLength(1)
      expect(wrapper.find('ListItem')).toHaveLength(0)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Testing on prop', () => {
    test('Expect to have multiple ListItem if more items passed in', () => {
      items = [
        ...items,
        {
          ProductID: 'FooID2',
          ProductName: 'FooName2'
        },
        {
          ProductID: 'FooID3',
          ProductName: 'FooName3'
        }
      ]

      wrapper = shallow(<ProductSearchResults items={items} />)

      expect(wrapper.find('List')).toHaveLength(1)
      expect(wrapper.find('ListItem').length).toBeGreaterThan(1)

      expect(wrapper).toMatchSnapshot()
    })
  })
})
