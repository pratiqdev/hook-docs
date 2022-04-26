/// <reference types="cypress" />


const _loadPage = () => cy.visit('http://localhost:3000/docs/demos/useCountdown')


const _display = () => cy.get('#demo-display')

const _matchInitial = () => 
  cy.get("#initial-value").invoke('val').then((text) => {
    _display().should('have.text', text)
  });






it('Load demo - useAsync', () => {
  _loadPage()
  _matchInitial()
})


describe('METHOD 1 | clear()', () => {

  it('1 - 1 | clear()', () => {
    _display().should('have.text', '[]')
  })
  
})
