const hashTagParser = require('./lib/search')
const p = async () => {
  let y = await hashTagParser('freegazaorg')
  const { words, texts } = y
  if (words.length > 0) console.log(words.join())
  texts.forEach(post => {
    let printed = false
    words.forEach(word => {
      if (!printed && post.toLowerCase().includes(word)) {
        console.log(post)
        printed = true
      }
    })
  })

  return y
}
p()
