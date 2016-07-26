module.exports = function(app) {

    var produtosService = app.services.ProdutosService;

    app.get('/promocoes/form', function(req, res) {
        produtosService.lista(function(erros, resultados) {
            if(!erros) {
                res.render('promocoes/form', {livros:resultados});
            } else {
                // tratar o erro
            }
        });
    });

    app.post('/promocoes', function(req, res) {
        var promocao = req.body;

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosService.buscarPorId(promocao.livro.id, function(erros, resultado){
            if(!erros){
                // app.get('io') => obtem o objeto do socket.io adicionado no express no arquivo app.js
                app.get('io').emit('novaPromocao', 
                    {
                        tituloPromocao : promocao.titulo, 
                        livro : resultado[0]
                    }
                );            
            } else {
                //Tratar o erro
            }
            res.redirect('/promocoes/form');
        });
    });

}