var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var mysql = require('mysql');

var port = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the 'public' directory

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Set Handlebars as the view engine
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Import routes and give the server access to them
var routes = require('./controllers/burgers_controller.js')(app);

// app.use('/', routes);

app.get('/public/style.css', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'style.css'));
});

app.listen(port, (err) => {
	if(err)
	{
		console.log('Error: ', err);
	}
	else
	{
		console.log('Server listening: ', port);
	}
});