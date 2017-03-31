# Data Structures

## Order (object)

+ id (number)
+ productId (string) - The product identifier
+ title (string) - The product name
+ quantity (number) - The amount to order

# Orders [/orders]

## Retrieve All Orders [GET]
+ Response 200 (application/json)

  [
    {
      "id": 1,
      "productId": "1234567890",
      "title": "A Product",
      "quantity": 5
    }, {
      "id": 2,
      "productId": "30410101044",
      "title": "Item B",
      "quantity": 6
    }, {
      "id": 3,
      "productId": "30410392973",
      "title": "Item C",
      "quantity": 1
    }
  ]
