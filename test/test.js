const assert = require('chai').assert;
const gameOfLife = require('../life.js');

describe('Application', () => {

  it('Provided example', (done) => {
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
    done();
  })
  it('All 0', (done) => {
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
    done();
  })
  it('All 1', (done) => {
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
    done();
  })
  it('Single-element input', (done) => {
      const singleInput = [1];
      const singleOutput = null;
    assert.deepEqual(gameOfLife.getNextGen(singleInput), singleOutput);
    done();
  })
  it('Non-rectangular input', (done) => {
      const nonRectInput = [
          [1,0,0],
          [1,1],
          [0],
      ];
      const nonRectOutput = null;
    assert.deepEqual(gameOfLife.getNextGen(nonRectInput), nonRectOutput);
    done();
  })
  it('Integers input other than 1', (done) => {
      const badIntInput = [
          [0,1,2],
          [3,4,5],
          [5,6,7]
      ];
      const badIntOutput = null;
    assert.deepEqual(gameOfLife.getNextGen(badIntInput), badIntOutput);
    done();
  })
  it('Non-number inputs', (done) => {
      const nonNumInput = [
          ["thing1", "thing2", 3],
          [4, "thing5", "thing6"],
          [7, 8, "thing9"]
      ];
      const nonNumOutput = null;
    assert.deepEqual(gameOfLife.getNextGen(nonNumInput), nonNumOutput);
    done();
  })
});
