const assert = require('chai').assert;
const gameOfLife = require('../app.js');

describe('Application', () => {

  it('Provided example', () => {
      const provInput = [
          [0,1,0,0,0],
          [1,0,0,1,1],
          [1,1,0,0,1],
          [0,1,0,0,0],
          [1,0,0,0,1]
      ];
      const provOutput = [
          [0,0,0,0,0],
          [1,0,1,1,1],
          [1,1,1,1,1],
          [0,1,0,0,0],
          [0,0,0,0,0]
      ];
    assert.deepEqual(gameOfLife.getNextGen(provInput), provOutput);
  })
  it('All 0', () => {
      const zeroInput = [
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0]
      ];
      const zeroOutput = [
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0]
      ];
    assert.deepEqual(gameOfLife.getNextGen(zeroInput), zeroOutput);
  })
  it('All 1', () => {
      const oneInput = [
          [1,1,1,1],
          [1,1,1,1],
          [1,1,1,1],
          [1,1,1,1],
      ];
      const oneOutput = [
          [1,0,0,1],
          [0,0,0,0],
          [0,0,0,0],
          [1,0,0,1]
      ];
    assert.deepEqual(gameOfLife.getNextGen(oneInput), oneOutput);
  })
  it('Single-element input', () => {
      const singleInput = [1];
      const singleOutput = null;
    assert.deepEqual(gameOfLife.getNextGen(singleInput), singleOutput);
  })
  it('Non-rectangular input', () => {
      const nonRectInput = [
          [1,0,0],
          [1,1],
          [0],
      ];
      const nonRectOutput = null;
    assert.deepEqual(gameOfLife.getNextGen(nonRectInput), nonRectOutput);
  })
  it('Integers input other than 1', () => {
      const badIntInput = [
          [0,1,2],
          [3,4,5],
          [5,6,7]
      ];
      const badIntOutput = null;
    assert.deepEqual(gameOfLife.getNextGen(badIntInput), badIntOutput);
  })
  it('Non-number inputs', () => {
      const nonNumInput = [
          ["thing1", "thing2", 3],
          [4, "thing5", "thing6"],
          [7, 8, "thing9"]
      ];
      const nonNumOutput = null;
    assert.deepEqual(gameOfLife.getNextGen(nonNumInput), nonNumOutput);
  })
});
