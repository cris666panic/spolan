var L = require('leaflet');
var request = require('superagent');
var GeoJSONCluster = require('../');

var map = L.map('map').setView([30.25, -97.75], 13);
L.Icon.Default.imagePath = 'images';

L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  , id: 'paulserraino.n0dn3pbe'
}).addTo(map);


function toGeoJSON (data) {
  var collection = {
    "type": "FeatureCollection",
      "features": []
  };

  var tmpl = [
  '{'
  , '"type": "Feature",'
  , '"properties": {"foo": "bar"},'
  , '"geometry": {'
  ,  '"type": "Point",'
  ,  '"coordinates": [:loc]'
    , '}'
  , '}'
  ].join('');

  data.forEach(function (datum) {
    try {
      var t = tmpl.replace(':loc', datum.location.split(',').reverse().join(','))
      t = JSON.parse(t);
      collection.features.push(t);
    } catch (err) {
      console.log('error parsing', datum);
    }
  });

  return collection;
}

request
  .get('https://data.texas.gov/resource/9e7h-gz56.json')
  .end(function(error, response){
    if (error) return console.error(error);

    var json = toGeoJSON(response.body);
    var markers = GeoJSONCluster(json);
    map.addLayer(markers)
  });