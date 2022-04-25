/// <reference types="cypress" />


const _loadPage = () => cy.visit('http://localhost:3000/docs/demos/usearray')


const _display = () => cy.get('#demo-display')
const _testValue = () => cy.get('#test-value')

const _clearTestValue = () => cy.get('#clear-test-value').click({force:true})

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

  /** # X set()*/
  _x1: () => cy.get('#method-set-x1').click({force:true}),

  /** # X set()*/
  _x2: () => cy.get('#method-set-x2').click({force:true}),

  /** # X set()*/
  _x3: () => cy.get('#method-set-x3').click({force:true}),

  /** # X set()*/
  _x4: () => cy.get('#method-set-x4').click({force:true}),

  /** # X set()*/
  _x5: () => cy.get('#method-set-x5').click({force:true}),

  /** # X set()*/
  _x6: () => cy.get('#method-set-x6').click({force:true}),

  /** # X set('not an array')*/
  _x7: () => cy.get('#method-set-x7').click({force:true}),

  /** # X set([])*/
  _x8: () => cy.get('#method-set-x8').click({force:true}),
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

  /** # X push() */
  _x1: () => cy.get('#method-push-x1').click({force:true}),

  /** # X push(false) */
  _x2: () => cy.get('#method-push-x2').click({force:true}),

  /** # X push({}) */
  _x3: () => cy.get('#method-push-x3').click({force:true}),

  /** # X push('string') */
  _x4: () => cy.get('#method-push-x4').click({force:true}),

  /** # X push([]) */
  _x5: () => cy.get('#method-push-x5').click({force:true}),
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

  /** # X unshift() */
  _x1: () => cy.get('#method-unshift-x1').click({force:true}),

  /** # X unshift() */
  _x2: () => cy.get('#method-unshift-x2').click({force:true}),

  /** # X unshift() */
  _x3: () => cy.get('#method-unshift-x3').click({force:true}),

  /** # X unshift() */
  _x4: () => cy.get('#method-unshift-x4').click({force:true}),
}

const _pop = {
  /** # pop() */
  _1: () => cy.get('#method-pop-1').click({force:true}),

  /** # X pop(true) */
  _x1: () => cy.get('#method-pop-x1').click({force:true}),

  /** # X pop(true) */
  _x2: () => cy.get('#method-pop-x2').click({force:true}),

  /** # X pop(true) */
  _x3: () => cy.get('#method-pop-x3').click({force:true}),

  /** # X pop(true) */
  _x4: () => cy.get('#method-pop-x4').click({force:true}),

  /** # X pop(true) */
  _x5: () => cy.get('#method-pop-x5').click({force:true}),

  /** # X pop(true) */
  _x6: () => cy.get('#method-pop-x6').click({force:true}),

  /** # X pop(true) */
  _x7: () => cy.get('#method-pop-x7').click({force:true}),

  /** # X pop(true) */
  _x8: () => cy.get('#method-pop-x8').click({force:true}),

}

const _shift = {
  /** # shift() */
  _1: () => cy.get('#method-shift-1').click({force:true}),

  /** # X shift(true) */
  _x1: () => cy.get('#method-shift-x1').click({force:true}),

  /** # X shift(false) */
  _x2: () => cy.get('#method-shift-x2').click({force:true}),

  /** # X shift(null) */
  _x3: () => cy.get('#method-shift-x3').click({force:true}),

  /** # X shift(undefined) */
  _x4: () => cy.get('#method-shift-x4').click({force:true}),

  /** # X shift(1) */
  _x5: () => cy.get('#method-shift-x5').click({force:true}),

  /** # X shift('string') */
  _x6: () => cy.get('#method-shift-x6').click({force:true}),

  /** # X shift({}) */
  _x7: () => cy.get('#method-shift-x7').click({force:true}),

  /** # X shift([]) */
  _x8: () => cy.get('#method-shift-x8').click({force:true}),
}

const _filter = {
  /** # filter(n => typeof n === 'number') */
  _1: () => cy.get('#method-filter-1').click({force:true}),

  /** # filter(n => typeof n === 'string') */
  _2: () => cy.get('#method-filter-2').click({force:true}),

  /** # X filter(n => n === n) */
  _x1: () => cy.get('#method-filter-x1').click({force:true}),

  /** # X filter((v, i, a) => a.includes(v)) */
  _x2: () => cy.get('#method-filter-x2').click({force:true}),

  /** # X filter() */
  _x3: () => cy.get('#method-filter-x3').click({force:true}),

  /** # X filter(false) */
  _x4: () => cy.get('#method-filter-x4').click({force:true}),

  /** # X filter(true) */
  _x5: () => cy.get('#method-filter-x5').click({force:true}),

  /** # X filter(null) */
  _x6: () => cy.get('#method-filter-x6').click({force:true}),

  /** # X filter(undefined) */
  _x7: () => cy.get('#method-filter-x7').click({force:true}),

  /** # X filter(1) */
  _x8: () => cy.get('#method-filter-x8').click({force:true}),

  /** # X filter('string') */
  _x9: () => cy.get('#method-filter-x9').click({force:true}),

  /** # X filter({}) */
  _x10: () => cy.get('#method-filter-x10').click({force:true}),
  
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


const allTypes = [
  ['()', 'no-value'],
  ['("string")', 'string'],
  ['("")', ''],
  ['(true)', true],
  ['(false)'],
  ['(1)'],
  ['(0)'],
  ['(null)'],
  ['(undefined)', undefined],
  ['({})',{}],
  ['([])',[]],
  ['(()=>{})',()=>{}],
]


const testArgumentTypes = (method, match, callSetOne) => {
  allTypes.forEach((x,i) => {
    it(`1 - x${i + 1} | ${method}${x[0]}`, () => {
      callSetOne && _set._1()
      cy.get(`#method-${method}-x${i+1}`).click({force:true})
      _display().should('have.text', match)
    })
  })
}


it('Load demo - useArray', () => {
  _loadPage()
  _matchInitial()
})


describe('METHOD 1 | clear()', () => {

  it('1 - 1 | clear()', () => {
    _clear()
    _display().should('have.text', '[]')
  })


  testArgumentTypes('clear', '[]')
  
})


describe('METHOD 2 | reset()', () => {

  it('1 - 1 | reset()', () => {
    _reset()
    _matchInitial()
  })

  testArgumentTypes('reset', '["initial","state"]')
  
})


describe('METHOD 3 | set()', () => {
  it('prep arg tests',() => {
    _clear()
  })

  testArgumentTypes('set', '[]')

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


  it('3 - x1 | set()', () => {
    _set._1()
    _set._x1()
    _display().should('have.text', '[1,2,3]')
  })

  it('3 - x2 | set(null)', () => {
    _set._1()
    _set._x2()
    _display().should('have.text', '[1,2,3]')
  })

  it('3 - x3 | set(undefined)', () => {
    _set._1()
    _set._x3()
    _display().should('have.text', '[1,2,3]')
  })

  it('3 - x4 | set(true)', () => {
    _set._1()
    _set._x4()
    _display().should('have.text', '[1,2,3]')
  })

  it('3 - x5 | set(1)', () => {
    _set._1()
    _set._x5()
    _display().should('have.text', '[1,2,3]')
  })

  it('3 - x6 | set({})', () => {
    _set._1()
    _set._x6()
    _display().should('have.text', '[1,2,3]')
  })

  it('3 - x7 | set("not")', () => {
    _set._1()
    _set._x7()
    _display().should('have.text', '[1,2,3]')
  })

  it('3 - x8 | set([])', () => {
    _set._1()
    _set._x8()
    _display().should('have.text', '[]')
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

  it('4 - x1 | push()', () => {
    _set._1()
    _push._x1()
    _display().should('have.text', '[1,2,3]')
  })

  it('4 - x2 | push()', () => {
    _set._1()
    _push._x2()
    _display().should('have.text', '[1,2,3,false]')
  })

  it('4 - x3 | push()', () => {
    _set._1()
    _push._x3()
    _display().should('have.text', '[1,2,3,{}]')
  })

  it('4 - x4 | push()', () => {
    _set._1()
    _push._x4()
    _display().should('have.text', '[1,2,3,"string"]')
  })

  it('4 - x5 | push()', () => {
    _set._1()
    _push._x5()
    _display().should('have.text', '[1,2,3,[]]')
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

  it("5 - 3 | filter(n => n === 1)", () => {
    _set._2()
    _push._3()
    _filter._2()
    _display().should('have.text', '["one","two","three"]')
  })

  it("5 - x1 | filter(n => n === n)", () => {
    _set._1()
    _filter._x1()
    _display().should('have.text', '[1,2,3]')
  })

  it("5 - x2 | filter((v, i, a) => a.includes(v))", () => {
    _set._1()
    _filter._x2()
    _display().should('have.text', '[1,2,3]')
  })

  it("5 - x3 | filter()", () => {
    _set._1()
    _filter._x3()
    _display().should('have.text', '[1,2,3]')
  })

  it("5 - x4 | filter(false)", () => {
    _set._1()
    _filter._x4()
    _display().should('have.text', '[1,2,3]')
  })

  it("5 - x5 | filter(true)", () => {
    _set._1()
    _filter._x5()
    _display().should('have.text', '[1,2,3]')
  })

  it("5 - x6 | filter(null)", () => {
    _set._1()
    _filter._x6()
    _display().should('have.text', '[1,2,3]')
  })

  it("5 - x7 | filter(undefined)", () => {
    _set._1()
    _filter._x7()
    _display().should('have.text', '[1,2,3]')
  })

  it("5 - x8 | filter(1)", () => {
    _set._1()
    _filter._x8()
    _display().should('have.text', '[1,2,3]')
  })

  it("5 - x9 | filter('string')", () => {
    _set._1()
    _filter._x9()
    _display().should('have.text', '[1,2,3]')
  })

  it("5 - x10 | filter({})", () => {
    _set._1()
    _filter._x10()
    _display().should('have.text', '[1,2,3]')
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

  it("6 - x1 | pop(true)", () => {
    _set._1()
    _pop._x1()
    _display().should('have.text', '[1,2]')
    _testValue().should('have.value', '3')
  })

  it("6 - x2 | pop(false)", () => {
    _set._1()
    _pop._x2()
    _display().should('have.text', '[1,2]')
    _testValue().should('have.value', '3')
  })

  it("6 - x3 | pop(null)", () => {
    _set._1()
    _pop._x3()
    _display().should('have.text', '[1,2]')
    _testValue().should('have.value', '3')
  })

  it("6 - x4 | pop(undefined)", () => {
    _set._1()
    _pop._x4()
    _display().should('have.text', '[1,2]')
    _testValue().should('have.value', '3')
  })

  it("6 - x5 | pop(1)", () => {
    _set._1()
    _pop._x5()
    _display().should('have.text', '[1,2]')
    _testValue().should('have.value', '3')
  })

  it("6 - x6 | pop('string')", () => {
    _set._1()
    _pop._x6()
    _display().should('have.text', '[1,2]')
    _testValue().should('have.value', '3')
  })

  it("6 - x7 | pop({})", () => {
    _set._1()
    _pop._x7()
    _display().should('have.text', '[1,2]')
    _testValue().should('have.value', '3')
  })

  it("6 - x8 | pop([])", () => {
    _set._1()
    _pop._x8()
    _display().should('have.text', '[1,2]')
    _testValue().should('have.value', '3')
  })
})


describe('METHOD 7 | shift()', () => {
  
  it('7 - 1 | shift()', () => {
    _set._1()
    _shift._1()
    _display().should('have.text', '[2,3]')
    _testValue().should('have.value', '1')
  })
  
  it('7 - x1 | shift(true)', () => {
    _set._1()
    _shift._x1()
    _display().should('have.text', '[2,3]')
    _testValue().should('have.value', '1')
  })

  it('7 - x2 | shift(false)', () => {
    _set._2()
    _shift._x2()
    _display().should('have.text', '["two","three"]')
    _testValue().should('have.value', 'one')
  })

  it('7 - x3 | shift(null)', () => {
    _set._1()
    _shift._x3()
    _display().should('have.text', '[2,3]')
    _testValue().should('have.value', '1')
  })

  it('7 - x4 | shift(undefined)', () => {
    _set._2()
    _shift._x4()
    _display().should('have.text', '["two","three"]')
    _testValue().should('have.value', 'one')
  })

  it('7 - x5 | shift(1)', () => {
    _set._1()
    _shift._x5()
    _display().should('have.text', '[2,3]')
    _testValue().should('have.value', '1')
  })

  it('7 - x6 | shift("string")', () => {
    _set._2()
    _shift._x6()
    _display().should('have.text', '["two","three"]')
    _testValue().should('have.value', 'one')
  })

  it('7 - x7 | shift({})', () => {
    _set._1()
    _shift._x7()
    _display().should('have.text', '[2,3]')
    _testValue().should('have.value', '1')
  })

  it('7 - x8 | shift([])', () => {
    _set._2()
    _shift._x8()
    _display().should('have.text', '["two","three"]')
    _testValue().should('have.value', 'one')
  })

})


describe('METHOD 8 | unshift()', () => {

  it('8 - 1 | unshift(9)', () => {
    _loadPage()

    _set._1()
    _unshift._1()
    cy.get('#demo-display').should('have.text', '[9,1,2,3]')
    cy.get('#test-value').should('have.value', '4')
  })

  it('8 - 2 | unshift("hello")', () => {
    _unshift._2()
    cy.get('#demo-display').should('have.text', '["hello",9,1,2,3]')
    cy.get('#test-value').should('have.value', '5')
  })

  it('8 - 3 | unshift(9,10,11)', () => {
    _unshift._3()
    cy.get('#demo-display').should('have.text', '[9,10,11,"hello",9,1,2,3]')
    cy.get('#test-value').should('have.value', '8')
  })

  it('8 - 4 | unshift(9,10,11)', () => {
    _unshift._4()
    cy.get('#demo-display').should('have.text', '[[9,10,11],9,10,11,"hello",9,1,2,3]')
    cy.get('#test-value').should('have.value', '9')
  })

  it('8 - x1 | unshift(9,10,11)', () => {
    _unshift._x1()
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
