// CONEXÃO COM O BANCO DE DADOS, IMPORTADO O SEQUELIZE

const Sequelize = require('sequelize');
const connection = new Sequelize('guiaperguntas','root','123',{
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = connection;
