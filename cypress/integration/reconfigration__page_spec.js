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
  describe('click on footer link for reconfiguration and logout', () => {
    it('reconfigration click', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Reconfigure')
        .click()
      cy.url().should('include', '/initialize')
    })
  })
})
