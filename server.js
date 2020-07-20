const path = require('path');
const hbs = require('hbs');
const utils = require('./utils');

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

const viewspath = partialsPath = publicDir = path.join(__dirname);
app.use(express.static(publicDir)); // for client.js load
app.set('views', viewspath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Index'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) return res.send({ error: 'Please input the address' });
  utils.geocode(address, (error, data = null) => {
    if (error) {
      return res.send('Some server error');
    } 

    utils.forecast(data, (error, forecastData = null) => {
      if (error) {
        return res.send('Some server error');
      }
      res.send(forecastData);
    })
  })
})

app.get('/forecast', (req, res) => {
  res.render('forecast', {
    title: 'Forecast'
  });
})

app.get('*', (req, res) => {
  res.render('404');
})

app.listen(port, () => {
  console.log('Server Start')
});