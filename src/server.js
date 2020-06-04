const express = require("express")
const server = express()

//configurar pasta publica
server.use(express.static("public"))

//Configurar caminhos da minha aplicação
//pagina inicial
//req-> Requisição
//res-> Respostas do Servidor
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

server.get("/create-point", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html")
})

server.get("/search-results", (req, res) => {
    res.sendFile(__dirname + "/views/search-results.html")
})

//ligar o servidor
server.listen(3000)