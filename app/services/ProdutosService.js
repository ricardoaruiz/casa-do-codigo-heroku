module.exports = function(app) {
    return {
        lista : function(callback) {

            // nesta linha o connectionFactory já está carregado pelo express-load
            // estamos acessando ele a partir da variável app que é quem está com os módulos carregados
            // para acessar os módulos é só seguir o caminho das pastas onde estão a partir da variável
            // app ex: app.infra.connectionFactory();
            var connection = app.infra.connectionFactory();

            var produtosDAO = new app.infra.ProdutosDAO(connection);

            produtosDAO.lista(function(erros, resultados) {
                callback(erros, resultados);
            });

            connection.end();    
        },

        buscarPorId : function(id, callback) {

            var connection = app.infra.connectionFactory();
            var produtosDAO = new app.infra.ProdutosDAO(connection);

            produtosDAO.buscarPorId(id, function(erros, resultados) {
                callback(erros, resultados);
            });

            connection.end();

        },

        salva : function(produto, callback) {
            var connection = app.infra.connectionFactory();
            var produtosDAO = new app.infra.ProdutosDAO(connection);

            produtosDAO.salva(produto, function(erros, resultados) {
                callback(erros, resultados);
            });

            connection.end();
        }
    }
};