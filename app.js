// Importa o módulo do express que foi configurado na pasta config
var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io', io);

var porta = process.env.PORT || 3000

// Inicia o servidor na porta informada para escutar as requisições
// que serão tratadas pelo express
http.listen(porta, function() {
    console.log('Servidor no ar na porta ' + porta)
});