/// <reference types="cypress" />


const _loadPage = () => 
  cy.visit('http://localhost:3000/docs/demos/useCountdown')



const _matchValue = (el, val) => cy.get(el).should('have.value', val)
const _click = (el) => cy.get(el).click({force: true})
const _insert = (el, value) => cy.get(el).type(value)

const _runTrial = (time, repeat) => {

  for(let i = 0; i <= repeat; i++){
    _click('#method-reset-1')
    _click('#method-start-1')
    cy.wait(time)
    _click('#method-stop-1')

    cy.get('#total')
      .invoke('val')
      .then(val => _accum(val, time))
  }

  cy.log(dev)

}

let dev= {
  trials: [],
  max: 0,
  min: 0,
  avg: 0,
}

const _accum = (val, time) => {
  dev.trials.push(3000 - time - parseInt(val))

  dev.max = Math.max(...dev.trials)
  dev.min = Math.min(...dev.trials) 
  dev.avg = dev.trials.reduce((a,b) => a + b, 0) / dev.trials.length
  dev.trialNum = dev.trials.length


}


it('Load demo - useCountdown', () => {
  _loadPage()
})


describe('TIMER 1 | clear()', () => {

  it('1 - 1 | match initial time', () => {
    _matchValue('#total', '3000')
  })

  it('1 - 2 | match stop time', () => {
    _runTrial(1000, 3)

    cy.log(dev)
    console.log(dev)

      // cy.wait(100)
      // expect(trials.length).to.equal(1)
    // expect(_read('#total')).to.be.within(1500, 2500)

    // _matchValue('#total', '2000')
  })
  
})
