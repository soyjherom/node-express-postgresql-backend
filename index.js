const boom = require('@hapi/boom');
const cors = require('cors');
const express = require('express');
const routersApi = require('./routes')

const { boomErrorHandler, errorHandler, logErrors } = require('./middleWares/error.handler');

const app = express();
const port = process.env.PORT || 3021;

app.use(express.json())

const whitelist = ['http://localhost:8083', 'https://myapp.co']
const options = {
  origin: (origin,callback)=>{
    if(whitelist.includes(origin) || !origin) callback(null, true)
    else callback(boom.notAcceptable('Unacceptable Origin'));
  }
}
app.use(cors(options));

app.get('/',(req, res)=>{
  res.json({
    message: "Hello World!"
  })
})

routersApi(app)

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
  // eslint-disable-next-line no-console
  console.log(`Server up and listening on port ${port}`)
})
