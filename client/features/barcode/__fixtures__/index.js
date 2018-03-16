import faker from 'faker'
import { compose, map, applySpec, always } from 'ramda'

// TODO: Write MockModel Class to code gen the generate methods

// Wastage
export const barcodeModel = {
  barcodeID: always(0),
  json: always([
    {
      Barcode: 1,
      Deleted: false
    },
    {
      Barcode: 2,
      Deleted: true
    },
    {
      Barcode: 3,
      Deleted: false
    }
  ]),
  jsonBarcodeEntities: always([
    {
      Barcode: 1,
      Deleted: true
    },
    {
      Barcode: 2,
      Deleted: false
    },
    {
      Barcode: 3,
      Deleted: true
    },
    {
      Barcode: 4,
      Deleted: false
    }
  ]),
  receiveBarcodeJson: always([
    {
      Barcode: 1,
      ProductID: 'Foo1',
      Deleted: true
    },
    {
      Barcode: 2,
      ProductID: 'Foo2',
      Deleted: false
    },
    {
      Barcode: 3,
      ProductID: 'Foo3',
      Deleted: true
    },
    {
      Barcode: 4,
      ProductID: 'Foo4',
      Deleted: false
    }
  ])
}

export const generatebarcodeModel = applySpec(barcodeModel)
export const generatebarcodeModelArray = compose(
  map(generatebarcodeModel),
  Array
)
