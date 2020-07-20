const request = require('request');

const geocode = (address, callback) => {
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibGlhb3JpbyIsImEiOiJjanRxMzdsMjMwYjdvNGJtc2g1eThmYjdxIn0.LyKoo52VZzrYCbWpz1XQcg&limit=1`;
  request({ url, json: true }, (error, res) => {
    if(error) {
      callback('Unable to connect to location services');
    } else if(res.body.features.length === 0) {
      callback('No location found');
    } else {
      const data = res.body.features[0];
      const lat = data.center[1];
      const lon = data.center[0];
      const location = data.place_name;
      callback(null, { lat, lon, location });
    }
  });
}

const forecast = ({ lat, lon }, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=e5f4b8d15239e42e30946efb39966870&units=metric`;
  request({ url, json: true }, (error, res) => {
    if(error) {
      callback('Unable to connect to temperature services');
    } else if(res.body.list.length === 0) {
      callback('No temperature data found');
    } else {
      const data = res.body.list[0];
      callback(null, { temp: data.main.temp, time: data.dt_txt });
    }
  });
}

module.exports = {
  geocode: geocode,
  forecast: forecast
}