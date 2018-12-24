const chai = require('chai');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
const expect = chai.expect;


const hashTagParser = require("../lib/search")
const p = async (quary) => {
  let y = await hashTagParser(quary);
  return y
}


describe('Hash Tag Parser.', () => {
  describe('Unit Test\'s', () => {
    it('#freegaza => [free , gaza]', () => {
      expect(p("#freegaza")).to.be.equalTo(['free', 'gaza']);
    });
  });
});