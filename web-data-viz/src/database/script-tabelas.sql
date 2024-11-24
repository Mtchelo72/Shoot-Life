-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE shootlife;

USE shootlife;


CREATE TABLE usuario (
	idusuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	
);

CREATE TABLE quiz (
	idquiz INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
);

create table escolha (
	fk_idusuario int,
	constraint fkidusuario foreign key (fk_idusuario) references usuario(idusuario),
	fk_idquiz int,
	constraint fkidquiz foreign key (fk_idquiz) references quiz(idquiz),
	
	constraint pkescolha primary key(fk_idusuario, fk_idquiz)
);





