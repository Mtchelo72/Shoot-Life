var database = require("../database/config");

// Função para autenticar o usuário
function quiz(quiz, idusuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticar(): ", quiz, idusuario);

    var instrucaoSql = `
        insert into escolha values (${idusuario}, ${quiz});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql)}

    module.exports = {
        quiz
    };