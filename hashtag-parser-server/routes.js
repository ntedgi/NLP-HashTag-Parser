const express = require('express')
const search = require('../algo/lib/search')
module.exports = () => {
  const router = express.Router()

  router.get('/:hash', async (req, res) => {
    try {
      console.log(req.params.hash)
      let response = await search(`#${req.params.hash}`)
      res.json(response)
      
    } catch (err) {
      res.status(500).end(err.message ? err.message : err)
    }
  })

  return router
}
