let Twitter = require('twitter')
const getTwitterClient = () => {
  const creds = {
    consumer_key_1: 'xPgfl66A3zYYuR8X9DgbcLaez',
    consumer_secret_1: 'vmDug3Jopc46ySf3jBmBvTDTmihS5Xq0ZCHAD8uNFElZE9DWc4',
    access_token_key_1: '841996763158462464-GIwSzt5unl4mT8yKuTuLkzGELVN02Ws',
    access_token_secret_1: '0aajau5xSPYi0YkO1b05yT7kK9Arsk2muXBujTeYnocjd',
    consumer_key_2: 'z1rUQMIaZv0bD33NwCa48MJ3U',
    consumer_secret_2: 'xqnIJZdivrquEijmIufpvK8VGW1D2WHpz1tcuaYPKLL1JThGyU',
    access_token_key_2: '841996763158462464-cu5JSuvBkCUGS3LO9B9XOyvhLgN8m24',
    access_token_secret_2: '20Ds8VAOnV6a0Pz3jZ4f27hnqZ5c6LYSc5K0YE8nEyTLb',
    postgres_user: 'postgres',
    postgres_host: 'localhost',
    postgres_database: 'taged_data_set',
    postgres_password: 'postgres',
    postgres_port: 5432
  }
  let i = Math.random() > 0.5 ? 1 : 0
  let credsSofix = i % 2 == 1 ? '_1' : '_2'

  let twitterClient = new Twitter({
    consumer_key: creds['consumer_key' + credsSofix],
    consumer_secret: creds['consumer_secret' + credsSofix],
    access_token_key: creds['access_token_key' + credsSofix],
    access_token_secret: creds['access_token_secret' + credsSofix]
  })
  return twitterClient
}

const buildStringFromSet = (set, query, index, res) => {
  if (index == query.length) return res
  if (index > query.length) return []
  let ch = query.charAt(index)
  let current = Array.from(set)
    .map(x => x.toLowerCase())
    .filter(x => x.charAt(0) === ch)
  let ans
  for (let i = 0; i < current.length; i++) {
    ans = buildStringFromSet(
      set,
      query,
      index + current[i].length,
      res.concat([current[i]]),
      i
    )
    if (arrayConcatIsTheString(ans, query)) return ans
  }
  return []
}

const arrayConcatIsTheString = (res, str) => {
  return res === undefined ? false : res.join('') === str
}

const splitByAns = res => {
  let dict = new Set()
  res = res.filter(e => e.length > 0)
  res.forEach(phrase => {
    const split = phrase.replace(/([a-z](?=[A-Z]))/g, '$1 ').split(' ')
    split.forEach(e => dict.add(e))
  })
  return buildStringFromSet(
    dict,
    queryTerm.replace('#', '').toLowerCase(),
    0,
    []
  )
}

const calculateWordsSupport = texts => {
  let wordsCounts = {}
  texts.forEach(element => {
    element = element.split(' ')
    element.reduce((ac, cur) => {
      cur = cur.replace(/[^0-9a-z]/gi, '')
      if (ac[cur]) ac[cur] += 1
      else ac[cur] = 1
      return ac
    }, wordsCounts)
  })
  return wordsCounts
}

const extractWordsPartsOfQuery = (cleanQuery, keys) => {
  let result = []
  keys.forEach(element => {
    let e = element.toLowerCase()
    if (e.includes(cleanQuery) || cleanQuery.includes(e)) {
      result.push(element)
    }
  })
  return result
}

const cleanText = str => str.replace(/[^A-Za-z]/g, '')

const findHashTagOrEquivelentInKeys = (cleanQuery, keys) => {
  let candidates = []
  keys = keys.map(e => cleanText(e))
  keys.forEach(e => {
    let cleanTerm = e.toLowerCase()
    if (cleanTerm == cleanQuery) {
      candidates.push(e)
    }
  })
  return candidates
}

const splitHashes = hashTags => {
  let ans = hashTags[0].split(/(?=[A-Z])/).map(e => e.toLowerCase())
  return ans
}

const countWords = (texts, queryTerm) => {

  const wordsCounts = calculateWordsSupport(texts)

  let keys = Object.keys(wordsCounts)

  let cleanQuery = queryTerm.replace('#', '').toLowerCase()

  let hashTags = findHashTagOrEquivelentInKeys(cleanQuery, keys)

  if (hashTags.length > 0) return splitHashes(hashTags)

  let wordsPartOfQuery = extractWordsPartsOfQuery(cleanQuery, keys)

  return wordsPartOfQuery.length > 0 ? splitByAns(wordsPartOfQuery) : []
}

const removeHashTagSeparators = query => {
  let q = query
  const seperators = ['-', '_']
  seperators.forEach(e => {
    q = q.replace(e, '')
  })
  return q
}

const changeNumbersToWords = query => {
  let q = query
  const digit2word = {
    '2': 'to',
    '3': 'free',
    '4': 'for'
  }
  Object.keys(digit2word).forEach(key => {
    q = q.includes(key) ? q.replace(key, digit2word[key]) : q
  })
  return q
}

const removeCommonPostfix =query =>{
  const commonPostfix = ["org"]
  commonPostfix.forEach(e=>{
    if(query.endsWith(e)){
        query = query.slice(0,e.length*-1)
    }
  })
  return query
}

const handleQuery = query => {
  query = removeHashTagSeparators(query)
  query = changeNumbersToWords(query)
  query = removeCommonPostfix(query)

  return query
}
module.exports = query => {
  let queryTerm = handleQuery(query)

  const run = () => {
    return new Promise((resolve, reject) => {
      getTwitterClient().get(
        'search/tweets',
        {
          q: queryTerm,
          count: 80
        },
        (error, tweets, response) => {
          if (error) {
            reject(error)
            console.log(error)
          } else {
            let results = tweets['statuses']
            let texts = new Set(results.map(x => x.text))
            console.log(`${texts.size} qureys returns on term : ${query}`)
            resolve({
              words: countWords(texts, queryTerm),
              texts: [...texts].slice(1, 10)
            })
          }
        }
      )
    })
  }

  return run()
    .then(result => {
      return result
    })
    .catch(err => console.log(err))
}
