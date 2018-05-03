describe('The Price Check Link', () => {
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
    it('click on Price Check', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Price Check')
        .click()

      cy.get('.grommetux-box > header > div > span').contains('Price Check')
    })
  })
  describe('Click on search button and open popup', () => {
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
      cy.wait(3000)
      //after search finding for quantity popup
      cy.get('div > div > div').contains('Description')
    })
  })
})
