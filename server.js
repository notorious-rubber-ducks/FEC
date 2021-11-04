/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const { default: axios } = require('axios');
const { APIKEY } = require('./config/config');

const app = express();

app.use(express.static(path.join(__dirname, '/client/dis')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

axios.defaults.headers = {
  'Content-Type': 'application/json',
  Authorization: APIKEY,
  host: 'app-hrsei-api.herokuapp.com',
};

const outfitContainer = [];

app.get('/*', (req, res) => {
  console.log('GET req initiated');

  if (req.url === '/outfit') {
    console.log(outfitContainer);
    res.send(JSON.stringify(outfitContainer));
  } else {
    const APIUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-den${req.url}`;
    axios
      .get(APIUrl)
      .then(({ data }) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.end();
      });
  }
});

app.post('/*', (req, res) => {
  console.log('POST initiated');

  if (req.url === '/outfit') {
    outfitContainer.push(req.body);
    console.log('outfit added to container');
    res.send('outfit added to container');
  } else {
    const APIUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-den${req.url}`;

    axios
      .post(APIUrl, req.body)
      .then(() => {
        console.log('post successful');
        res.end();
      })
      .catch((err) => {
        console.log(req);
        console.log(err);
        res.end();
      });
  }
});

app.put('/*', (req, res) => {
  console.log('PUT initiated');

  if (req.url === '/outfit') {
    const { index } = req.body;
    outfitContainer.splice(index - 1, 1);
    res.send('updated outfit list');
  } else {
    const APIUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-den${req.url}`;

    axios
      .put(APIUrl, req.body)
      .then(() => {
        res.end();
      })
      .catch((err) => {
        console.log(err);
        res.end();
      });
  }
});

app.listen(3000);
