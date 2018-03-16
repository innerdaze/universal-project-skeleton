import React from 'react'
import Toggle from '../../components/Toggle.jsx'

test('render a Toggle', () => {
  const wrapper = shallow(
    <Toggle renderA={Function.prototype} renderB={Function.prototype} />
  )
  expect(wrapper).toMatchSnapshot()
})

test('render a Toggle and check the default priority is respected', () => {
  const wrapper = shallow(
    <Toggle
      renderA={() => <div>RENDER A</div>}
      renderB={() => <div>RENDER B</div>}
    />
  )
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('div').text()).toEqual('RENDER A')
})

test('render a Toggle and initialize the priority through props', () => {
  const wrapper = shallow(
    <Toggle
      priority='B'
      renderA={() => <div>RENDER A</div>}
      renderB={() => <div>RENDER B</div>}
    />
  )
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('div').text()).toEqual('RENDER B')
})

test('render a Toggle and change the priority through props', () => {
  const wrapper = shallow(
    <Toggle
      renderA={() => <div>RENDER A</div>}
      renderB={() => <div>RENDER B</div>}
    />
  )

  const setStateSpy = jest.spyOn(Toggle.prototype, 'setState')

  const newProps = { priority: 'B' }

  wrapper.setProps(newProps)

  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('div').text()).toEqual('RENDER B')

  expect(setStateSpy).toHaveBeenCalledTimes(1)
  expect(setStateSpy).toHaveBeenCalledWith(newProps)

  wrapper.setProps(newProps)

  expect(setStateSpy).toHaveBeenCalledTimes(1)
})

test('render a Toggle and test a toggle control can be passed to and called from a child', () => {
  const wrapper = shallow(
    <Toggle
      renderA={toggle => (
        <div>
          RENDER A
          <button onClick={toggle} />
        </div>
      )}
      renderB={toggle => (
        <div>
          RENDER B
          <button onClick={toggle} />
        </div>
      )}
    />
  )
  expect(wrapper).toMatchSnapshot()

  wrapper.find('button').simulate('click')

  expect(wrapper.find('div').text()).toEqual('RENDER B')

  wrapper.find('button').simulate('click')

  expect(wrapper.find('div').text()).toEqual('RENDER A')
})
