const chai = require('chai')
const assertArrays = require('chai-arrays')
chai.use(assertArrays)
const expect = chai.expect

const hashTagParser = require('../lib/search')

const p = async quary => {
  let y = await hashTagParser(quary)
  return y.words
}



describe('Hash Tag Parser.', () => {
  describe("Unit Test's", () => {
    it('#freegaza => [free , gaza]', async () => {
      const x = await p('#freegaza')
      expect(x).to.be.equalTo(['free', 'gaza'])
    })
  })
})


// hashtagsParser("#freetibet")  // = > ["Free", "Tibet"]
// hashtagsParser("#FREETIBET")  // = > ["Free", "Tibet"]
// hashtagsParser("#freetibetorg")  // = > ["Free", "Tibet"]
// hashtagsParser("#FreeTibet") // = > ["Free", "Tibet"]
// hashtagsParser("#3Tibet")  // = > ["Free", "Tibet"]
// hashtagsParser("#free_tibet")  // = > ["Free", "Tibet"]
// hashtagsParser("#FREE_TIBET") // =>  ["Free", "Tibet"]
// hashtagsParser("#freeTIBET") // =>  ["Free", "Tibet"]
// hashtagsParser("#FreeTIBET") // =>  ["Free", "Tibet"]
// hashtagsParser("#freeTibet") // =>  ["Free", "Tibet"]