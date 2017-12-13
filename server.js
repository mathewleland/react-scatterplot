let path = require('path');
let express = require('express');

let app = express();
let PORT = 3020;

let plotpoints = require('./MOCK_DATA.js')

// app.get('/pass', function(req, res) {
//   let passes = plotpoints.filter( point => point['status'] === 'pass');
//   res.json(passes);
// });

app.get('/:condition', function(req, res) {
  let filtered = plotpoints.filter( point => point['status'] === req.params.condition);
  res.json(filtered);
})

app.get('/', function(req, res) {
  res.json(plotpoints);
});

app.listen(PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`✅  Listening at http://localhost:${PORT}`);
});
