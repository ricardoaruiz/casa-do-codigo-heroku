// Esse arquivo funciona como um controller onde terão os endpoints para acesso aos recursos
// Ele foi carregado pelo express-load e está vinculado ao express pelo parâmetro "app"
// O módulo recebe como parametro o app para poder ter acesso aos outros módulos
// carregados em app.
module.exports = function(app) {
    
    var produtosService = app.services.ProdutosService;
    
    // Rota para listagem de produtos
    app.get('/produtos', function(req, res, next) {
        produtosService.lista(function(erros, resultados) {
            if(erros) {
                return next(erros);
            }
            res.format({
                html : function() {
                    res.render('produtos/lista', {lista:resultados});
                },
                json : function() {
                    res.json(resultados);
                }
            });            
        });
    });

    // Rota para o formulário de cadastro de produtos
    app.get('/produtos/form', function(req, res) {
        res.render('produtos/form', 
            {
                errosValidacao : {},
                produto : {}
            });
    });

    // Rota para que o produto seja salvo a partir do submit do formulário
    // Sempre após um post fazer um redirect
    app.post('/produtos', function(req, res) {

        if(!validaFormInclusao(req, res)) {
            return;
        }

        produtosService.salva(req.body, function(erros, resultados){
            res.redirect('/produtos');
        });           

    });

    // valida o formulário de inclusão de livro utilizando o express-validator
    var validaFormInclusao = function(req, res) {
        var toReturn = true;

        var produto = req.body;

        // quando inserimos o express-valitor o req ganha diversos métodos de validação
        // como por exemplo assert().notEmpty();
        req.assert('titulo','Título é obrigatório').notEmpty();
        req.assert('preco','Formato inválido').isFloat();
        
        var erros = req.validationErrors();
        if(erros) {
            res.format({
                html : function() {
                    res.status(400).render('produtos/form', 
                        {
                            errosValidacao : erros,
                            produto : produto
                        }
                    );
                },
                json : function() {                    
                    res.status(400).json(erros);
                }
            });
            toReturn = false;
        }

        return toReturn;

    };
}