import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import { map, prop, flip, compose } from 'ramda'
import { orderSelectors } from '~features/order'
import { appSelectors } from '~features/app'

// export const wastageEntitiesSelector = state =>
//   state.wastage.wastageEntities.byId

export const wastageTypeToOrderMapSelector = state =>
  state.wastage.wastageTypeToOrderMap

export const wastageEntitiesSelector = createSelector(
  orderSelectors.pendingOrdersBySelectedModeSelector,
  wastageTypeToOrderMapSelector,
  appSelectors.storeID,
  (entities, typeMap, storeId) =>
    map(
      entity => ({
        _id: entity._id,
        StoreID: storeId,
        ProductID: entity.ProductID,
        TypeID: typeMap[entity._id],
        DimID: 0,
        Qty: entity.Qty
      }),
      entities
    )
)

export const wastageEntitiesListSelector = createSelector(
  wastageEntitiesSelector,
  Object.values
)

export const isProcessingSelector = state =>
  state.wastage.wastageProcessing.isProcessing

export const isChangingWastageTypeSelector = state =>
  state.wastage.wastageEntities.isChangingWastageType

export const changingWastageTypeForSelector = state =>
  state.wastage.wastageEntities.changingWastageTypeFor

export const wastageTypesByIdSelector = state => state.wastage.wastageTypes.byId

export const wastageTypesAllIdsSelector = state =>
  state.wastage.wastageTypes.allIds

const mapKeysToEntities = compose(map, flip(prop))

export const wastageTypeEntitiesSelector = createSelector(
  wastageTypesByIdSelector,
  wastageTypesAllIdsSelector,
  (byId, allIds) => mapKeysToEntities(byId)(allIds)
)

export const wastageTypeForOrderIdSelector = createCachedSelector(
  wastageTypeToOrderMapSelector,
  wastageTypesByIdSelector,
  (state, orderId) => orderId,
  (wastageTypeMap, wastageTypeEntities, orderId) =>
    wastageTypeEntities[wastageTypeMap[orderId]]
)((state, orderId) => orderId)

export default {
  wastageTypeEntitiesSelector,
  wastageTypeToOrderMapSelector,
  wastageEntitiesSelector,
  wastageEntitiesListSelector,
  isProcessingSelector,
  changingWastageTypeForSelector,
  isChangingWastageTypeSelector,
  wastageTypeForOrderIdSelector
}
