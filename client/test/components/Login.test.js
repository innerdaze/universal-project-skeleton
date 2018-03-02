import React from 'react'
import Login from '../../components/Login'

let wrapper, login

describe('Testing on Login...', () => {
  beforeEach(() => {
    login = jest.fn()
    wrapper = shallow(<Login login={login} />)
  })

  describe('Login layout', () => {
    test('Expect Login to have parent Box comp and child LoginForm comp', () => {
      expect(wrapper.find('Box')).toHaveLength(1)
      expect(wrapper.find('Box').find('LoginForm')).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect login prop func to called if LoginForm onSubmit is triggered', () => {
      wrapper.find('LoginForm').simulate('submit', {
        username: 'Foo',
        password: 'Bar'
      })

      expect(login).toBeCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on state', () => {
    test('Expect default username and password state is both empty string', () => {
      expect(wrapper.state('username')).toEqual('')
      expect(wrapper.state('password')).toEqual('')
      expect(wrapper).toMatchSnapshot()
    })
  })
})
