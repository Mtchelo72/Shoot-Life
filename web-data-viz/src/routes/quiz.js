var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/quizController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/quiz", function (req, res) {
    usuarioController.quiz(req, res);
})



module.exports = router;