describe('The Login Form', () => {
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
    cy.url().should('include', '/login')
  })
  describe('Login page', () => {
    it('login click', () => {
      cy
        .get('input[type=text]')
        .type('1')
        .should('have.value', '1')
      cy
        .get('input[type=password]')
        .type('1')
        .should('have.value', '1')
      cy
        .get('footer > button')
        .contains('Log In')
        .click()
      cy.url().should('include', '/order')
    })
  })
})
