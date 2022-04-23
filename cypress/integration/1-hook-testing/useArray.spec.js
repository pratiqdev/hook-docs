/// <reference types="cypress" />


const _display = () => cy.get('#demo-display')
const _testValue = () => cy.get('#test-value')

const _matchInitial = () => 
  cy.get("#initial-value").invoke('val').then((text) => {
    _display().should('have.text', text)
  });

const _clear =  () => cy.get('#method-clear').click({force:true})
const _reset =  () => cy.get('#method-reset').click({force:true})


const _set = {
  /** # set([1,2,3]) */
  _1: () => cy.get('#method-set-1').click({force:true}),

  /** # set(['one','two','three']) */
  _2: () => cy.get('#method-set-2').click({force:true}),

  /** # set([{text: "Hello"}, {text: "World"}]) */
  _3: () => cy.get('#method-set-3').click({force:true}),

  /** # set([[[[[["why"]]]]]]) */
  _4: () => cy.get('#method-set-4').click({force:true}),
}

const _push = {
  /** # push(7) */
  _1: () => cy.get('#method-push-1').click({force:true}),

  /** # push('seven') */
  _2: () => cy.get('#method-push-2').click({force:true}),

  /** # push(7,8,9) */
  _3: () => cy.get('#method-push-3').click({force:true}),

  /** # push([7,8,9]) */
  _4: () => cy.get('#method-push-4').click({force:true}),

  /** # push() */
  _5: () => cy.get('#method-push-5').click({force:true}),
}


const _unshift = {
  /** # unshift(9) */
  _1: () => cy.get('#method-unshift-1').click({force:true}),

  /** # unshift('hello') */
  _2: () => cy.get('#method-unshift-2').click({force:true}),

  /** # unshift(9,10,11) */
  _3: () => cy.get('#method-unshift-3').click({force:true}),

  /** # unshift([9,10,11]) */
  _4: () => cy.get('#method-unshift-4').click({force:true}),
}

const _pop = {
  /** # pop() */
  _1: () => cy.get('#method-pop-1').click({force:true}),
}

const _shift = {
  /** # shift() */
  _1: () => cy.get('#method-shift-1').click({force:true}),
}

const _filter = {
  /** # filter(n => typeof n === 'number') */
  _1: () => cy.get('#method-filter-1').click({force:true}),

  /** # filter(n => typeof n === 'string') */
  _2: () => cy.get('#method-filter-2').click({force:true}),
}

const _sort = {
  /** # sort() */
  _1: () => cy.get('#method-sort-1').click({force:true}),

  /** # sort((a,b) => a < b ? 1 : -1) */
  _2: () => cy.get('#method-sort-2').click({force:true}),

  /** # sort((a,b) => a < b ? -1 : 1) */
  _3: () => cy.get('#method-sort-3').click({force:true}),

  /** # sort((a,b) => a > b ? -1 : 1) */
  _4: () => cy.get('#method-sort-4').click({force:true}),


}




it('Load demo - useArray', () => {
  cy.visit('http://localhost:3000/docs/demos/usearray')
  _matchInitial()
})
let initialValue = ''


describe('METHOD 1 | clear()', () => {

  it('1 - 1 | clear()', () => {
    _clear()
    _display().should('have.text', '[]')
  })

})


describe('METHOD 2 | reset()', () => {

  it('1 - 1 | reset()', () => {
    _reset()
    _matchInitial()
  })

})


describe('METHOD 3 | set()', () => {

  it('3 - 1 | set([1,2,3])', () => {
    _set._1()
    _display().should('have.text', '[1,2,3]')
  })

  it("3 - 2 | set(['one','two','three'])", () => {
    _set._2()
    _display().should('have.text', '["one","two","three"]')
  })

  it('3 - 3 | set([{text:"Hello"},{text:"World"}])', () => {
    _set._3()
    _display().should('have.text', '[{"text":"Hello"},{"text":"World"}]')
  })

  it('3 - 4 | set([[[[[["why"]]]]]])', () => {
    _set._4()
    _display().should('have.text', '[[[[[["why"]]]]]]')
  })


})


describe('METHOD 4 | push()', () => {

  it('4 - 1 | push(7)', () => {
    _set._1()
    _push._1()
    _display().should('have.text', '[1,2,3,7]')
  })

  it('4 - 2 | push("seven")', () => {
    _push._2()
    _display().should('have.text', '[1,2,3,7,"seven"]')
  })

  it('4 - 3 | push(7,8,9)', () => {
    _push._3()
    _display().should('have.text', '[1,2,3,7,"seven",7,8,9]')
  })


  it('4 - 4 | push([7,8,9])', () => {
    _push._4()
    _display().should('have.text', '[1,2,3,7,"seven",7,8,9,[7,8,9]]')
  })

  it('4 - 5 | push()', () => {
    _push._5()
    _display().should('have.text', '[1,2,3,7,"seven",7,8,9,[7,8,9]]')
  })


})


describe('METHOD 5 | filter()', () => {

  it('5 - 1 | filter(number)', () => {
    _set._2()
    _push._3()
    _filter._1()
    _display().should('have.text', '[7,8,9]')
  })

  it("5 - 2 | filter(string)", () => {
    _set._2()
    _push._3()
    _filter._2()
    _display().should('have.text', '["one","two","three"]')
  })

})


describe('METHOD 6 | pop()', () => {

  it('6 - 1 | pop()', () => {
    _set._1()
    _pop._1()
    _display().should('have.text', '[1,2]')
    _testValue().should('have.value', '3')
  })

  it('6 - 1 | pop()', () => {
    _pop._1()
    _display().should('have.text', '[1]')
    _testValue().should('have.value', '2')
  })

})


describe('METHOD 7 | shift()', () => {

  it('7 - 1 | shift()', () => {
    _set._1()
    _shift._1()
    _display().should('have.text', '[2,3]')
    _testValue().should('have.value', '1')
  })

  it('7 - 1 | shift()', () => {
    _shift._1()
    _display().should('have.text', '[3]')
    _testValue().should('have.value', '2')
  })

})

describe('METHOD 8 | unshift()', () => {

  it('8 - 1 | unshift(9)', () => {
    cy.get('#method-set-1').click({force: true}) // set([1,2,3])
    cy.get('#method-unshift-1').click({force: true})
    cy.get('#demo-display').should('have.text', '[9,1,2,3]')
    cy.get('#test-value').should('have.value', '4')
  })

  it('8 - 2 | unshift("hello")', () => {
    cy.get('#method-unshift-2').click({force: true})
    cy.get('#demo-display').should('have.text', '["hello",9,1,2,3]')
    cy.get('#test-value').should('have.value', '5')
  })

  it('8 - 3 | unshift(9,10,11)', () => {
    cy.get('#method-unshift-3').click({force: true})
    cy.get('#demo-display').should('have.text', '[9,10,11,"hello",9,1,2,3]')
    cy.get('#test-value').should('have.value', '8')
  })

  it('8 - 4 | unshift(9,10,11)', () => {
    cy.get('#method-unshift-4').click({force: true})
    cy.get('#demo-display').should('have.text', '[[9,10,11],9,10,11,"hello",9,1,2,3]')
    cy.get('#test-value').should('have.value', '9')
  })



})

describe('METHOD 9 | sort()', () => {

  it('9 - 1 | unshift(9)', () => {
    cy.get('#method-set-1').click({force: true}) // set([1,2,3])
    cy.get('#method-unshift-1').click({force: true}) // unshift(9) => 9,1,2,3
    cy.get('#method-unshift-3').click({force: true}) // unshift(9,10,11) => 9,10,11,9,1,2,3
    cy.get('#method-sort-3').click({force: true}) // sort( < )
    // .then(x => {
      cy.get('#demo-display').should('have.text', '[1,2,3,9,9,10,11]')
    // })
  })





})
