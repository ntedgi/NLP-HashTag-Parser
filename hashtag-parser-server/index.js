const express =require("express")
const routes = require("./routes")
const path = require('path')



const BUILD_PATH = path.resolve(
  __dirname,
  '..',
  'hashtag-parser-client',
  'build'
)


let app = express()

app.use('/search', routes())
app.use(express.static(path.join(BUILD_PATH)))

app.use('/*', (req, res) => {
  res.sendFile(path.resolve(BUILD_PATH, 'index.html'))
})

app.listen(3000)