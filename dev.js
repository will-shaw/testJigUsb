const SerialPort = require('serialport')

var queue = []
var testKey = '/asd/asd/1'




var asdf = async function(){
    var ports = await SerialPort.list()
    
    for(var i = 0; i < ports.length; i++) {
        console.log(ports[i].comName)
    }

    var a = ports.find(x => x.productId == '6001')

    console.log('x: ' + a)
    
};
asdf()
console.log('.....')


var wrapFunction = function(fn, context, params) {
    return function() {
        fn.apply(context, params);
    };
}


var fun1 = function(key) { 
    console.log(key) 
    return new Promise((resolve, reject) => {
        console.log('p1')
        var serialMessage = 'asd\n'
        if (serialMessage.includes('\n')){
            console.log(serialMessage)
            resolve(serialMessage)
        } else if (serialMessage.length === 0) {
            console.log('Error: No Message received')
            reject(new Error('No Message received'))
        }
    })
};

var fun1_1 = wrapFunction(fun1, this, ["/insd/asdf/1"]);

queue.push('0')
queue.push('1')
queue.push('2')


console.log(queue.length)

for(var i = 0; i < queue.length; i++) {
    console.log(queue[i])
    if(queue[i] == '1') {
        queue.splice(i,1)
    }
}
 
console.log(queue.length)
 

function queueDestroyer(queue) { 
    if(queue.length > 0) {   
        (queue.shift())().then(function(result) {
            //console.log(result)
            //queueDestroyer(queue)
        })
        .catch(function(err){        
            //console.log(err)
        }) 
    }
}

//queueDestroyer(queue);
