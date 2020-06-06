const express = require("express")
const server = express()

//pegar o Banco de Dados
const db = require('./database/db')

//configurar pasta publica
server.use(express.static("public"))

//utilizando template engine
const nunjuncks = require("nunjucks")
nunjuncks.configure("src/views", {
    express: server,
    noCache: true
})

//Configurar caminhos da minha aplicação
//pagina inicial
//req-> Requisição
//res-> Respostas do Servidor
server.get("/", (req, res) => {
   return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search-results", (req, res) => {
   return res.render("search-results.html")
})

//ligar o servidor
server.listen(3000)