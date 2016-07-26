var ProdutosDAO = function(connection) {
    this._connection = connection;
};

ProdutosDAO.prototype.lista = function(callback) {
    this._connection.query('select * from livros', callback);
};

ProdutosDAO.prototype.salva = function(produto, callback) {
    this._connection.query('insert into livros (titulo, descricao, preco) values (?,?,?)', 
        [produto.titulo, produto.descricao, produto.preco], 
        callback);
};

ProdutosDAO.prototype.buscarPorId = function(id, callback) {
    this._connection.query('select * from livros where id = ?', [id], callback);
}

module.exports = function() {
    return ProdutosDAO;
};
