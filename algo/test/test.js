const chai = require('chai')
const assertArrays = require('chai-arrays')
chai.use(assertArrays)
const expect = chai.expect

const hashTagParser = require('../lib/search')

const excute = async quary => {
  let y = await hashTagParser(quary)
  return y.words
}

const testCases = [
  '#freegaza',
  '#FREEGAZA',
  '#freegazaorg',
  '#FreeGaza',
  '#3Gaza',
  '#free_gaza',
  '#FREE_GAZA',
  '#freeGAZA',
  '#FreeGAZA',
  '#freeGaza'
]

const mapTestToExpected = {
  realdonaldtrump: ['real', 'donald', 'trump'],
  photooftheday: ['photo', 'of', 'the', 'day'],
  photooftheday: ['photo', 'of', 'the', 'day'],
  womenshistorymonth: ['womens', 'history', 'month'],
  internationalwomensday: ['international', 'womens', 'day'],
  happybirthday: ['happy', 'birthday']
}

describe('Hash Tag Parser.', () => {
  describe("Unit Test's", () => {
    testCases.forEach(element => {
      it(`${element} => [free , gaza]`, async () => {
        const result = await excute(element)
        expect(result).to.be.equalTo(['free', 'gaza'])
      })
    })

    let keys = Object.keys(mapTestToExpected)
    keys.forEach(element => {
      it(`${element} => ${mapTestToExpected[element]}`, async () => {
        const result = await excute(element)
        expect(result).to.be.equalTo(mapTestToExpected[element])
      })
    })
  })
})
