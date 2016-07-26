var http = require('http');

var config = {
    host : 'localhost',
    port : 3000,
    path : '/produtos',
    method : 'GET',
    headers : {
        'Accept' : 'application/json'
        //'Accept' : 'text/html'
    }
}

var request = http.request(config, function(res) {
    console.log(res.statusCode);
    res.on('data', function(body) {
        console.log('Body: ' + body);
    })
});

request.end();