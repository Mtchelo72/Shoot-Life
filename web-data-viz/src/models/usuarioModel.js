var database = require("../database/config");

// Função de autenticação de usuário
function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticar(): ", email, senha);

    var instrucaoSql = `
        SELECT idusuario, nome, email, senha FROM usuarios WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql)
        .then(resultado => {
            if (resultado.length > 0) {
                // Se o usuário for encontrado e a senha corresponder, retornamos o usuário
                return resultado[0]; // Usuário autenticado
            } else {
                throw new Error("Usuário ou senha inválidos");
            }
        })
        .catch(error => {
            console.log("#ERRO: " + error);
            throw error;
        });
}

// Função de cadastro de usuário
function cadastrar(nome, email, cpf, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, cpf, senha);

    var instrucaoSql = `
        INSERT INTO usuarios (nome, email, cpf, senha) VALUES ('${nome}', '${email}', ${cpf}, '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql)
        .catch(error => {
            console.log("#ERRO: " + error);
            throw error;
        });
}

module.exports = {
    autenticar,
    cadastrar
};