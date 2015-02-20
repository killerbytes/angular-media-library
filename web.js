var express = require('express')
  , http = require('http')
	, app = express()


app.use(express.static(__dirname + '/dist'));


app.listen(process.env.PORT || 8000, function(){
	console.log('Server running at http://127.0.0.1:8000/');
})


