const express = require('express');
const cors = require('cors');
var pocket = require('./pocket');
var http = require('http');

// const PORT=3001;

// function handleRequest(request, response){
// 	response.end('It Works!! Path Hit:  ' + request.url);

// }

// var server = http.createServer(handleRequest);

// server.listen(PORT, function(){
// 	console.log("Server listening on: http://localhost:%")



// })


const app = express();

app.set('port', (process.env.PORT || 3001));

// app.use(cors());

var fs = require('fs'), 
	obj


app.get('/api/products', (req,res) => {
	fs.readFile('./products.json', 'utf8',  handleFile)

	function handleFile(err, data){
	if(err) throw err; 
	obj = JSON.stringify(data).replace(/\n/g,"");
	console.log(obj);

}
})


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});










// app.get('/', handlers.rootHandler);

// app.get('/api/products', handlers.apiHandler);

// exports = module.exports = app; 