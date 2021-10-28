const path = require('path');
const express = require('express');
const { default: axios } = require('axios');
const { helper } = require('./server/routes');

const app = express();

app.use(express.static(path.join(__dirname, '/client/dis')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/*', (req, res) => {
  // helper function just adds API key to headers
  const modifiedheader = helper(req.headers);
  const APIUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-den${req.url}`;

  axios.get(APIUrl, {
    headers: modifiedheader,
  })
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => err);
});

app.listen(3000);
