const express = require('express');

const usersRouter = express.Router();

usersRouter.get('/',(req, res) => {
  const { limit, offset } = req.query
  if(limit && offset){
    res.json({
      limit: limit,
      offset: offset
    })
  }else res.send('No query parameters received')
})

module.exports = usersRouter;
