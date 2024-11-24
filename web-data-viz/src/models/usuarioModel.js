var database = require("../database/config");

// Função para autenticar o usuário
function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticar(): ", email, senha);

    var instrucaoSql = `
        SELECT idusuario, nome, email, senha FROM usuario WHERE email = '${email}' AND senha = '${senha}';
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

// Função para verificar se o email já está cadastrado
function verificarEmail(email) {
    console.log("Verificando se o email já está cadastrado:", email);

    var instrucaoSql = `
        SELECT * FROM usuario WHERE email = '${email}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql)
        .then(resultado => {
            return resultado.length > 0; // Retorna true se o email já existir
        })
        .catch(error => {
            console.log("#ERRO: " + error);
            throw error;
        });
}

// Função para cadastrar um novo usuário
function cadastrar(nome, email, cpf, senha) {
    console.log("ACESSEI O USUARIO MODEL \n function cadastrar():", nome, email, cpf, senha);

    // Primeiro, verificar se o email já está cadastrado
    return verificarEmail(email)
        .then(emailExiste => {
            if (emailExiste) {
                throw new Error("Email já cadastrado");
            } else {
                var instrucaoSql = `
                    INSERT INTO usuario (nome, email, cpf, senha) 
                    VALUES ('${nome}', '${email}', ${cpf}, '${senha}');
                `;
                console.log("Executando a instrução SQL: \n" + instrucaoSql);

                return database.executar(instrucaoSql);
            }
        })
        .catch(error => {
            console.log("#ERRO: " + error);
            throw error;
        });
}

module.exports = {
    autenticar,
    verificarEmail, // Exporta a função verificarEmail caso precise usá-la em outro lugar
    cadastrar
};