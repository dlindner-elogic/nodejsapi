// server.js
var app = require('./app');

var port = process.env.PORT || 3000;

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});