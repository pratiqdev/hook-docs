/// <reference types="cypress" />



it('Load demo - useAsync  ', () => {
  cy.visit('http://localhost:3000/docs/demos/useCountdown')
})


describe('TEST METHODS    ', () => {

  it('initial value', () => {
    cy.get('#total').should('have.value', '3000')
    cy.get('#milliseconds').should('have.value', '0')
    cy.get('#seconds').should('have.value', '3')
    cy.get('#minutes').should('have.value', '0')
    cy.get('#hours').should('have.value', '0')
    cy.get('#days').should('have.value', '0')
    cy.get('#done').should('have.value', 'false')
  })

  it('1-1 | start', () => {
    cy.get('#method-start-1').click()
    cy.get('#total').should('have.value', '3000')
    cy.get('#total').should('have.value', '2900')
    cy.get('#total').should('have.value', '2800')
    cy.get('#total').should('have.value', '2700')
    cy.get('#total').should('have.value', '2600')
    cy.get('#total').should('have.value', '2500')
    cy.get('#total').should('have.value', '2400')
    cy.get('#total').should('have.value', '2300')
    cy.get('#total').should('have.value', '2200')
    cy.get('#total').should('have.value', '2100')
    cy.get('#total').should('have.value', '2000')

    cy.get('#milliseconds').should('have.value', '900')
    cy.get('#milliseconds').should('have.value', '800')
    cy.get('#milliseconds').should('have.value', '700')
    cy.get('#milliseconds').should('have.value', '600')
    cy.get('#milliseconds').should('have.value', '500')
    cy.get('#milliseconds').should('have.value', '400')
    cy.get('#milliseconds').should('have.value', '300')
    cy.get('#milliseconds').should('have.value', '200')
    cy.get('#milliseconds').should('have.value', '100')
    cy.get('#milliseconds').should('have.value', '0')

    cy.get('#total').should('have.value', '1000')
    cy.get('#total').should('have.value', '0')

  })

  it('1-2 | stop', () => {
    cy.get('#method-reset-1').click()
    cy.get('#method-start-1').click()
    cy.wait(950)
    cy.get('#method-stop-1').click()
    cy.get('#total').should('have.value', '2000')

  })

  it('1-3 | reset', () => {
    cy.get('#method-reset-1').click()
    cy.get('#total').should('have.value', '3000')

  })

  it('1-4 | callbacks', () => {
    cy.get('#method-reset-1').click()
    cy.get('#method-start-1').click()
    cy.get('#callback').should('have.value', 'A')
    cy.get('#callback').should('have.value', 'B')
    cy.get('#callback').should('have.value', 'C')
    cy.get('#callback').should('have.value', 'D')
  })



  it('2-1 | long time', () => {
    cy.get('#method-reset-1').click()
    cy.get('#method-start-1').click()
    cy.get('#callback').should('have.value', 'A')
    cy.get('#callback').should('have.value', 'B')
    cy.get('#callback').should('have.value', 'C')
    cy.get('#callback').should('have.value', 'D')
  })
  
})
