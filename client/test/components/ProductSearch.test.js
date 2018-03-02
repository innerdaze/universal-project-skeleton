import React from 'react'
import ProductSearch from '../../components/ProductSearch'

let wrapper, search, onSelect, results

describe('Testing on ProductSearch...', () => {
  beforeEach(() => {
    search = jest.fn()
    onSelect = jest.fn()
    results = []
    wrapper = shallow(
      <ProductSearch search={search} onSelect={onSelect} results={results} />
    )
  })

  describe('ProductSearch layout', () => {
    test('Expect ProductSearch to have a Search comp', () => {
      expect(wrapper.find('Search')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect search prop function to be called if Search onDOMChange is triggered', () => {
      wrapper.find('Search').prop('onDOMChange')({
        target: {
          value: 'foo'
        }
      })

      expect(search).toBeCalled()
      expect(wrapper).toMatchSnapshot()
    })

    test('Expect search prop function not called if text length less than 2', () => {
      wrapper.find('Search').prop('onDOMChange')({
        target: {
          value: 'fo'
        }
      })

      expect(search).not.toBeCalled()
      expect(wrapper).toMatchSnapshot()
    })

    test('Expect onSelect prop function to be call if Search onSelect is triggered', () => {
      results = [
        ...results,
        {
          product: 'FooProduct',
          ProductName: 'BarName'
        }
      ]
      wrapper.find('Search').prop('onSelect')({
        suggestion: {
          product: 'FooProduct'
        }
      })

      expect(onSelect).toBeCalled()
      expect(wrapper).toMatchSnapshot()
    })

    test('Expect result prop array is mapped before passed to Search suggestions prop', () => {
      results = [
        ...results,
        {
          product: 'FooProduct',
          ProductName: 'BarName'
        }
      ]

      wrapper = shallow(
        <ProductSearch search={search} onSelect={onSelect} results={results} />
      )
      let remappedResult = wrapper.find('Search').prop('suggestions')
      expect(remappedResult[0]).toHaveProperty('product')
      expect(remappedResult[0]).toHaveProperty('label')

      expect(wrapper).toMatchSnapshot()
    })
  })
})
