import React from 'react'
import OrdersLayout from '../../components/OrdersLayout'
import BarcodeInputFormContainer from '../../containers/BarcodeInputFormContainer'
import ScannedItemListContainer from '../../containers/ScannedItemListContainer'
import ProcessItemsButtonContainer from '../../containers/ProcessItemsButtonContainer'
import PromptStartModifyingTransaction from '../../components/PromptStartModifyingTransaction'
import ChangeOrderQuantityFormContainer from '../../containers/ChangeOrderQuantityFormContainer'

let wrapper,
  mainMenuVisible,
  pendingModification,
  isChangingOrderQuantity,
  onPromptStartModifyingSubmit,
  onPromptStartModifyingCancel

describe('Testing on OrdersLayout...', () => {
  beforeEach(() => {
    mainMenuVisible = false
    pendingModification = null
    isChangingOrderQuantity = false
    onPromptStartModifyingSubmit = jest.fn()
    onPromptStartModifyingCancel = jest.fn()

    wrapper = shallow(
      <OrdersLayout
        mainMenuVisible={mainMenuVisible}
        pendingModification={pendingModification}
        isChangingOrderQuantity={isChangingOrderQuantity}
        onPromptStartModifyingSubmit={onPromptStartModifyingSubmit}
        onPromptStartModifyingCancel={onPromptStartModifyingCancel}
      />
    )
  })

  describe('OrdersLayout layout', () => {
    test('Expect OrdersLayout to have a Split comp with a MainMenu and a Box comp in it', () => {
      expect(wrapper.find('Split')).toHaveLength(1)
      expect(wrapper.find('Split').find('MainMenu')).toHaveLength(1)
      expect(wrapper.find('Split').find('Box')).toHaveLength(1)

      expect(wrapper).toMatchSnapshot()
    })

    test('Expect Box contains OrdersHeaderLayout, BarcodeInputFormContainer, ScannedItemListContainer and ProcessItemsButtonContainer by default', () => {
      expect(wrapper.find('Box').find('OrdersHeaderLayout')).toHaveLength(1)
      expect(
        wrapper.find('Box').contains(<BarcodeInputFormContainer />)
      ).toEqual(true)
      expect(
        wrapper.find('Box').contains(<ScannedItemListContainer />)
      ).toEqual(true)
      expect(
        wrapper.find('Box').contains(<ProcessItemsButtonContainer />)
      ).toEqual(true)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Test on prop', () => {
    test('Expect Split priority prop is set with left if mainMenuVisible prop is true', () => {
      mainMenuVisible = true

      wrapper = shallow(
        <OrdersLayout
          mainMenuVisible={mainMenuVisible}
          pendingModification={pendingModification}
          isChangingOrderQuantity={isChangingOrderQuantity}
          onPromptStartModifyingSubmit={onPromptStartModifyingSubmit}
          onPromptStartModifyingCancel={onPromptStartModifyingCancel}
        />
      )

      expect(wrapper.prop('priority')).toEqual('left')
      expect(wrapper).toMatchSnapshot()
    })

    test('Expect Split priority prop is set with left if mainMenuVisible is not passed', () => {
      wrapper = shallow(
        <OrdersLayout
          pendingModification={pendingModification}
          isChangingOrderQuantity={isChangingOrderQuantity}
          onPromptStartModifyingSubmit={onPromptStartModifyingSubmit}
          onPromptStartModifyingCancel={onPromptStartModifyingCancel}
        />
      )

      expect(wrapper.prop('priority')).toEqual('right')
      expect(wrapper).toMatchSnapshot()
    })

    test('Expect to contain PromptStartModifyingTransaction if pendingModification is not a null object', () => {
      pendingModification = {}

      wrapper = shallow(
        <OrdersLayout
          pendingModification={pendingModification}
          isChangingOrderQuantity={isChangingOrderQuantity}
          onPromptStartModifyingSubmit={onPromptStartModifyingSubmit}
          onPromptStartModifyingCancel={onPromptStartModifyingCancel}
        />
      )

      expect(wrapper.find('PromptStartModifyingTransaction')).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })

    test('Expect to contain ChangeOrderQuantityFormContainer if isChangingOrderQuantity is true', () => {
      isChangingOrderQuantity = true

      wrapper = shallow(
        <OrdersLayout
          pendingModification={pendingModification}
          isChangingOrderQuantity={isChangingOrderQuantity}
          onPromptStartModifyingSubmit={onPromptStartModifyingSubmit}
          onPromptStartModifyingCancel={onPromptStartModifyingCancel}
        />
      )

      expect(wrapper.contains(<ChangeOrderQuantityFormContainer />)).toEqual(
        true
      )
      expect(wrapper).toMatchSnapshot()
    })

    test('Expect handlePromptStartModifyingSubmit prop function is called is PromptStartModifyingTransaction onCancel is trigger', () => {
      pendingModification = {}

      wrapper = shallow(
        <OrdersLayout
          pendingModification={pendingModification}
          isChangingOrderQuantity={isChangingOrderQuantity}
          onPromptStartModifyingSubmit={onPromptStartModifyingSubmit}
          onPromptStartModifyingCancel={onPromptStartModifyingCancel}
        />
      )

      wrapper.find('PromptStartModifyingTransaction').prop('onSubmit')()
      expect(onPromptStartModifyingSubmit).toHaveBeenCalled()
      expect(wrapper).toMatchSnapshot()
    })

    test('Expect onPromptStartModifyingCancel prop function is called is PromptStartModifyingTransaction onCancel is trigger', () => {
      pendingModification = {}

      wrapper = shallow(
        <OrdersLayout
          pendingModification={pendingModification}
          isChangingOrderQuantity={isChangingOrderQuantity}
          onPromptStartModifyingSubmit={onPromptStartModifyingSubmit}
          onPromptStartModifyingCancel={onPromptStartModifyingCancel}
        />
      )

      wrapper.find('PromptStartModifyingTransaction').prop('onCancel')()
      expect(onPromptStartModifyingCancel).toHaveBeenCalled()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
