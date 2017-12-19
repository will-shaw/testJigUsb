const SerialPort = require('serialport');

var port = null;

function listPorts() {
	var ports = SerialPort.list(function (err, ports) {
		if (err != null)
			reject(err);		
	});
	const promise = new Promise(function (resolve, reject) {
		resolve(ports)
	});
		
	return promise;
}

function runTest(portName, testKey, callbackRunTest) {	
	var msgSerial = '';
	var result = {};	
	var counterEmptyMsgSerial = 0;

	port = new SerialPort(portName, {
		baudrate: 9600
	});

	if (port === null) {
		result = 'Invalid Port Name';
		callbackRunTest(result);
	}
	if (port.isOpen) {
		result = 'Test Jig is busy';
		port.close();
		callbackRunTest(result);
	}						

	if ((testKey === 'high') || (testKey === 'low')) {		
		console.log('send testkey')
		port.write(testKey);	
		port.on('readable', function () {			
			msgSerial += port.read().toString();			
			if(msgSerial.includes('Test completed\n')){
				msgSerial = msgSerial.replace('undefined', '');
				console.log(msgSerial);				
				var msgArray = msgSerial.split('\n');				
				var aux;
				var i = 0;
				while(msgArray[i] != 'Test completed') {
					aux = msgArray[i].split(': ');
					result[aux[0].toString()] = aux[1];
					i++;						
				}					
				port.close();
				//result = JSON.stringify(result);
				result = adcConverterJson(result);					
				callbackRunTest(result);									
			} else if(msgSerial.length == 0){
				counterEmptyMsgSerial++;
				if(counterEmptyMsgSerial > 10){
					port.close();
					result = 'No message received! Please try again'
					callbackRunTest(result);
				}
			}			
		});						
	} else {
		port.close();
		result = 'Invalid Test Key'
		callbackRunTest(result);
	}					
}


function runTestView(portName, testKey, res) {	
	var msgSerial = '';
	var str = '';
	var promise;
	var counterEmptyMsg = 0;

	if((port === null) || (!port.isOpen)){
		port = new SerialPort(portName, {
			baudrate: 9600
		});

		if (port === null) {
			throw new Error('Invalid Port Name');
		}				
		
		if ((testKey === 'high') || (testKey === 'low')) {		
			port.write(testKey);
			res.write('<p>');
			port.on('readable', function () {			
				str += port.read().toString();	
				msgSerial += str;
				if(str.includes('\n')){						
					console.log(str);
					str = str.replace(/\n/g, '<br>');
					str = adcConverter(str);					
					res.write(str);
					str = '';
					if(msgSerial.includes('completed\n')){	
						port.close();
						res.write('</p>');				
						res.end();
					}									
				} else if(msgSerial.length == 0){
					counterEmptyMsgSerial++;
					if(counterEmptyMsgSerial > 10){
						port.close();						
						throw new Error('No message received! Please try again');
					}
				}									
			});						
		} else {
			port.close();
			res.end();
			throw new Error('Invalid Test Key')
		}		
		
		promise = new Promise(function (resolve, reject) {					
			resolve('Ok');
		});
	} else {
		promise = new Promise(function (resolve, reject) {	
			port.close();						
			reject('Test Jig is busy');
		});
	}

	return promise;	
}


function adcConverterJson(resultJson){
	for (var key in resultJson) {
		if (resultJson.hasOwnProperty(key)) {
			if(key === 'Supply'){
				resultJson[key] = parseFloat(((2.5 / 4096) * parseInt(resultJson[key]) * 48 / 2.15).toFixed(3));
			} else if ((key.includes('Feedback')) || (key.includes('LED3')) || (key.includes('LED4'))){
				resultJson[key] = parseFloat(((2.5 / 4096) * parseInt(resultJson[key]) * 10 / 2.5).toFixed(3));
			} else if(key.includes('Load')){
				resultJson[key] = parseFloat(((2.5 / 4096) * parseInt(resultJson[key])).toFixed(3));
			}			
		}
	}
	return resultJson;
}

function adcConverter(str){
	var strRawValues = str.match(/ \d+/g);
	var aux
	for (var i = 0; (strRawValues != null) && (i < strRawValues.length); i++) {
		if(str.includes('Supply')){
			aux = (2.5 / 4096) * parseInt(strRawValues[i]) * 48 / 2.15;	
		} else if ((str.includes('Feedback')) || (str.includes('LED3')) || (str.includes('LED4'))){
			aux = (2.5 / 4096) * parseInt(strRawValues[i]) * 10 / 2.5;
		} else {
			aux = (2.5 / 4096) * parseInt(strRawValues[i]);
		}			
		aux = parseFloat(aux.toFixed(3));
		str = str.replace(parseInt(strRawValues[i]).toString(), ' ' + aux.toString() + 'V');		
	}

	return str;	
}

module.exports = {
	listPorts,
	runTest,
	runTestView
}

