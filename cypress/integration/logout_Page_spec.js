describe('The logout Link', () => {
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
  describe('click on footer link for logout', () => {
    it('logout click', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Logout')
        .click()
      cy.url().should('include', '/login')
    })
  })
})
