var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Validação dos parâmetros
    if (email == undefined) {
        return res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        return res.status(400).send("Sua senha está indefinida!");
    } else {
        // Chama o método de autenticação no model
        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                console.log(`Resultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar) { // Verifica se o usuário foi encontrado
                    res.json({
                        id: resultadoAutenticar.idusuario, // Retorna o id do usuário
                        email: resultadoAutenticar.email,
                        nome: resultadoAutenticar.nome,
                        cpf: resultadoAutenticar.cpf,
                        senha: resultadoAutenticar.senha, // Retorna a senha (não recomendado em produção)
                    });
                } else {
                    res.status(403).send("Email e/ou senha inválido(s)");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro);
                res.status(500).json({ error: "Erro interno no servidor ao realizar o login" });
            });
    }
}

function cadastrar(req, res) {
    // Recuperando os dados do corpo da requisição
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;

    // Validação dos parâmetros
    if (nome == undefined) {
        return res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        return res.status(400).send("Seu email está undefined!");
    } else if (cpf == undefined) {
        return res.status(400).send("Seu CPF está undefined!");
    } else if (senha == undefined) {
        return res.status(400).send("Sua senha está undefined!");
    } else {
        // Chama o método de cadastro no model
        usuarioModel.cadastrar(nome, email, cpf, senha)
            .then(function (resultado) {
                res.status(201).json(resultado); // Retorna resposta positiva após cadastro
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro);
                res.status(500).json({ error: erro.sqlMessage });
            });
    }
}

module.exports = {
    autenticar,
    cadastrar
};