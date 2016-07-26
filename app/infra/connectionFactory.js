var mysql = require('mysql');

// Essa função foi criada para ser retornada quando o módulo for carregado e 
// quem for usar o módulo deverá invocá-la.
var connectMYSQL = function() {

    // process está disponível em qualquer js quando usando o node.
    // process.env.NODE_ENV é uma variável de ambiente que está sendo definida no package.json quando
    // rodamos a task 'test'
    // ou poderia ser defininda na linha de comando quando rodamos os testes por exemplo:
    // NODE_ENV=test node_modules/.bin/mocha
    if(!process.env.NODE_ENV | process.env.NODE_ENV === 'development') {
        return mysql.createConnection({
                user : 'root',
                password : 'root',
                database : 'casadocodigo',
                host : 'localhost',
                debug : false
            });
    }

    if(process.env.NODE_ENV === 'test') {
        return mysql.createConnection({
            user : 'root',
            password : 'root',
            database : 'casadocodigo_test',
            host : 'localhost',
            debug : false
        });
    }

    if(process.env.NODE_ENV === 'production') {
        return mysql.createConnection({
            user : 'b397a60b706f3f',
            password: '7bac1f42',
            host : 'us-cdbr-iron-east-04.cleardb.net',
            database : 'heroku_a65a5e2be8d7667'
        });
        /*
        var urlConexao = process.env.CLEARDB_DATABASE_URL;
        var grupos = urlConexao.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?reconnect=true/);
        return mysql.createConnection({
            user : grupos[1],
            password : grupos[2],
            host : grupos[3],
            database : grupos[4],
            debug : false
        });
        */
    }    
}

// Retorna a função connectMYSQL para quem precisar
module.exports = function() {
    return connectMYSQL;
}