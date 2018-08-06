const request = require('request');

const geocodeAddress = (address, callback) => {
  const encodedInput = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedInput}&key=AIzaSyAplSJozsCQIlJieNGmB-0LFZFQlT2rFrw`,
    json: true
  }, (err, response, body) => {
    debugger;
    if(err) {
      callback('Unable to connect to google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address');
    } else if(body.status === 'OVER_QUERY_LIMIT') {
      callback(body.error_message);
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    } else {
      callback('Unkown error', err);
    }
  });
}

module.exports.geocodeAddress = geocodeAddress;
