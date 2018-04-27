describe('The Initialization Form', () => {
  beforeEach(() => {
    cy.fixture('config.json').as('config')

    indexedDB.deleteDatabase('localforage')

    cy.server()

    cy.route({
      method: 'POST',
      url: '/',
      response: []
    })

    cy.visit('/', {
      onBeforeLoad: win => {
        cy.spy(win, 'fetch').as('fetchSpy')
      }
    })
  })

  it('successfully loads', () => {
    cy.url().should('include', '/initialize')
  })

  const testCall = (fetchConfig, expectedServiceName) => {
    const data = JSON.parse(fetchConfig.body)

    expect(data.method).to.eq(expectedServiceName)
  }
  describe('success', () => {
    it('synchronizes the remote data', function() {
      cy
        .get('input[name=apiRoot]:first')
        .type(this.config.apiRoot)
        .should('have.value', this.config.apiRoot)
      //cy.get('input[name=storeID]').type()
      cy
        .get('footer > .grommetux-button')
        .contains('Continue')
        .click()
      cy.wait(5000)
      cy.get('@fetchSpy').should(spy => {
        expect(spy).to.have.callCount(6)

        testCall(spy.args[0][1], 'GeneralService.GetTimeStamp')
        testCall(spy.args[1][1], 'SystemLoginService.Login')
      })
      cy.wait(10000)
      cy.url().should('include', '/login')
    })

    // it('Continue button click', () => {
    //   // cy
    //   //   .get('footer > .grommetux-button')
    //   //   .contains('Continue')
    //   //   .click()
    //   cy.wait(5000)
    //   cy.url().should('include', '/login')
    // })
  })
})
