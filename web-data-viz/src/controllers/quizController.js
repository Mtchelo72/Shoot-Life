var quizModel = require("../models/quizModel");

function quiz(req, res) {
    var quiz = req.body.quizServer;
    var idusuario = req.body.idusuarioServer;
    
        
                    
                    quizModel.quiz(quiz, idusuario)
                        .then(function (resultado) {
                            res.status(201).json(resultado);
                        })
                        .catch(function (erro) {
                            console.log(erro);
                            console.log("\nHouve um erro ao realizar a inserção do quiz! Erro: ", erro);
                            res.status(500).json({ error: erro.sqlMessage });
                        })
    
}

module.exports = {
   quiz
};