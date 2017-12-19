const express = require('express')
const TestJig = require('./src/TestJigRunner');
const app = express();
const https = require('https');
const fs = require('fs');

var credentials = {
    key: fs.readFileSync('./etc/hostkey.pem'),
    cert: fs.readFileSync('./etc/hostcert.pem'),        
};

https.createServer(credentials, app).listen(8000);
console.log("listening to port 8000");

app.get('/s', function (req, res) {
	res.header('Content-type', 'text/html');
	return res.end('Hello World!');
});


app.use('//', function (req, res) {
	var arrayPorts = [];
	TestJig.listPorts()
		.then(function (ports) {
			for (var i = 0; i < ports.length; i++) {
				if(ports[i].productId == "6001") {
					console.log(ports[i].comName);
					arrayPorts[i] = ports[i].comName;
				}
			}
		})
		.catch(function (err) {
			console.log(err);
			res.status(400).send('Error on listing ports');
		});

	setTimeout(function () {
		res.setHeader('Content-type', 'text/html');
		res.write('<h1>Syft Universal Test Jig</h1>');
		if(arrayPorts.length == 0){
			res.write('<p>Universal Test Jig not connected!</p>');			
		} else {			
			res.write(`<p>View results on screen</p>`+
			`<a href="/` + arrayPorts[arrayPorts.length-1].toString() + `/high/view">` + `Test Ion Guide High Mass` + `</a><br>`+
			`<a href="/` + arrayPorts[arrayPorts.length-1].toString() + `/low/view">` + `Test Ion Guide Low Mass` + `</a><br>`+
			`<a href="/` + arrayPorts[arrayPorts.length-1].toString() + `/hvpsu/view">` + `Test HV PSU` + `</a><br>` +
			`<br><br>` +
			``			
			);
		}
		res.end();
	}, 300);	
});

app.use('/:port/:testKey/confluence', function (req, res) {
	const portName = req.params.port;
	const testKey = req.params.testKey;	

	if(testKey === 'low'){
		const webDriver = require('./src/A9998.js')
		webDriver.fillA9998(portName, testKey, callbackA9998);
	}else if (testKey === 'high'){
		const webDriver = require('./src/A9999.js')
		webDriver.fillA9999(portName, testKey, callbackA9999);
	}

	//TestJig.runTest(portName, testKey, callback);	

	function callbackA9998(result){
		res.send(result);		
	}
	function callbackA9999(result){
		res.send(result);		
	}
})

app.use('/:port/:testKey/view', function (req, res) {
	const portName = req.params.port;
	const testKey = req.params.testKey;

	console.log(req.statusCode);

	TestJig.runTestView(portName, testKey, res)
		.then(function (result) {	
			console.log(result);			
			console.log('Test in progress...');				
		})
		.catch(function (err) {
			console.log(err);
			res.status(400).send(err + 'Please try again!');
			res.end();			
		})
})

app.use('/:port/:testKey', function (req, res) {
	const portName = req.params.port;
	const testKey = req.params.testKey;
	var responseJson;

	TestJig.runTest(portName, testKey, callbackRunTest);	

	function callbackRunTest(result){
		res.send(result);
		console.log(result);	
	}

})


app.get('/usb', function(req, res){
	//res.redirect('https://'+ req.headers.host+'/');
	var path = require('path');	
	res.sendFile('index.html', { root: path.join(__dirname, 'views') })
});



// app.listen(3010, function () {
// 	console.log('Syft Test Jig listening on port 3010');
// 	//opn('http://localhost:3010/');
// });
