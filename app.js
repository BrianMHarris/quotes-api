var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var quotesRoutes = require("./routes/quotes");
var cors = require('cors');

app.use(bodyParser.json()); // we need this to parse JSON!
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());
app.use('/quotes', quotesRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

app.get('/', function(req, res, next) {
  res.redirect('/quotes');
})

app.listen(8000, function(){
  console.log("Server is listening on port 8000");
});
