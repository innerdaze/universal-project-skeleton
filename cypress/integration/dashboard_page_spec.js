describe('The Dashboard Form', () => {
  beforeEach(() => {
    cy.fixture('config.json').as('config')
    cy.server()

    cy.route({
      method: 'POST',
      url: '/',
      response: []
    })

    cy.visit('/', {})
  })

  it('successfully loads', () => {
    cy.url().should('include', '/order')
  })
  describe('find right side block on click left side links', () => {
    it('click Delivery', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Delivery')
        .click()

      cy.get('.grommetux-box > header > div > span').contains('Delivery')
    })

    it('click Order', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Order')
        .click()

      cy.get('.grommetux-box > header > div > span').contains('Order')
    })

    it('click Shelf Labels', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Shelf Labels')
        .click()

      cy.get('.grommetux-box > header > div > span').contains('Shelf Labels')
    })

    it('click Stock Adjustment', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Stock Adjustment')
        .click()

      cy
        .get('.grommetux-box > header > div > span')
        .contains('Stock Adjustment')
    })

    it('Price Check', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Price Check')
        .click()

      cy.get('.grommetux-box > header > div > span').contains('Price Check')
    })

    it('click Stocktake', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Stocktake')
        .click()

      cy.get('.grommetux-box > header > div > span').contains('Stock Take')
    })
    describe('Click on search button and open popup', () => {
      it('click on search for Delivery', () => {
        cy
          .get('.grommetux-anchor')
          .contains('Delivery')
          .click()
        //input value for barcode
        cy.get('#barcodeInputContainer > input').type('1')
        //click on search button
        cy
          .get('button')
          .contains('Search')
          .click()
        //after search finding for quantity popup
        cy.get('form > div > header > h1').contains('Set Quantity')
      })
      it('click on search for Order', () => {
        cy
          .get('.grommetux-anchor')
          .contains('Order')
          .click()
        //input value for barcode
        cy.get('#barcodeInputContainer > input').type('1')
        //click on search button
        cy
          .get('button')
          .contains('Search')
          .click()
        //after search finding for quantity popup
        cy.get('form > div > header > h1').contains('Set Quantity')
      })
      it('click on search for Shelf Labels', () => {
        cy
          .get('.grommetux-anchor')
          .contains('Shelf Labels')
          .click()
        //input value for barcode
        cy.get('#barcodeInputContainer > input').type('1')
        //click on search button
        cy
          .get('button')
          .contains('Search')
          .click()
        //after search finding for quantity popup
        cy.get('form > div > header > h1').contains('Set Quantity')
      })
      it('click on serach for Stock Adjustment', () => {
        cy
          .get('.grommetux-anchor')
          .contains('Stock Adjustment')
          .click()
        //input value for barcode
        cy.get('#barcodeInputContainer > input').type('1')
        //click on search button
        cy
          .get('button')
          .contains('Search')
          .click()
        //after search finding for quantity popup
        cy
          .get('form > div > header > h1')
          .contains('Change Stock Adjustment Type')

        cy
          .get('footer > a')
          .contains('Cancel')
          .click()
      })
      it('click on search for Price Check', () => {
        cy
          .get('.grommetux-anchor')
          .contains('Price Check')
          .click()
        //input value for barcode
        cy.get('#barcodeInputContainer > input').type('1')
        //click on search button
        cy
          .get('button')
          .contains('Search')
          .click()
        //after search finding for quantity popup
        cy.get('div > div > div').contains('Description')
      })
      it('click on search for Stocktake', () => {
        cy
          .get('.grommetux-anchor')
          .contains('Stocktake')
          .click()
        //input value for barcode
        cy.get('#barcodeInputContainer > input').type('1')
        //click on search button
        cy
          .get('button')
          .contains('Search')
          .click()
        //after search finding for quantity popup
        cy.get('form > div > header > h1').contains('Set Quantity')
      })
    })
    describe('click on footer link for reconfiguration and logout', () => {
      it('reconfigration click', () => {
        cy
          .get('.grommetux-anchor')
          .contains('Reconfigure')
          .click()
        cy.url().should('include', '/initialize')
      })
      it('logout click', () => {
        cy
          .get('.grommetux-anchor')
          .contains('Logout')
          .click()
        cy.url().should('include', '/login')
      })
    })
  })
})
