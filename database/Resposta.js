// DEFININDO BANCO DE DADOS PARA AS RESPOSTAS
const Sequelize = require('sequelize');
const connection = require('./database')

const resposta = connection.define('respostas',{
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaid:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

resposta.sync({force: false})

module.exports = resposta


