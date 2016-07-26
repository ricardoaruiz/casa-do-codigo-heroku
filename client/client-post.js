var http = require('http');

var config = {
    host : 'localhost',
    port : 3000,
    path : '/produtos',
    method : 'POST',
    headers : {
        'Content-type' : 'application/json'
    }
};

var request = http.request(config, function(res) {
    console.log(res.statusCode);
    res.on('data', function(body) {
        console.log('Body : ' + body);
    });
}).on('error', function(e) {
    console.log('Erro : ' + e);
});

var reqBody = {
    titulo : 'Titulo',
    descricao : 'Descricao',
    preco : 'abc'
};

request.end(JSON.stringify(reqBody));