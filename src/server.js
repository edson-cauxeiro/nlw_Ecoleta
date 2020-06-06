const express = require("express")
const server = express()

//pegar o Banco de Dados
const db = require('./database/db')

//configurar pasta publica
server.use(express.static("public"))

// habilitar o uso do re.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))

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

//rota para receber os Dados do Formulario
server.post("/savepoint", (req, res) => {
    //usandos o req.query: Query Strings da nossa URL
    //console.log(req.body)

    //inserir dados no Banco de Dados
    const query = `
        INSERT INTO places (
            nome,
            image,
            address,
            address2,
            state,
            city,
            items
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`

    const values = [
        req.body.nome,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no Cadastro")
        }
        console.log("Cadastro com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }
    db.run(query, values, afterInsertData)   
})

server.get("/search-results", (req, res) => {
    
    const search = req.query.search

    if(search == "") {
        // Pesquisa Vazia
        return res.render("search-results.html", { total: 0})
    }
    
    //Pegando os Registos do Banco de Dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        const total = rows.length
        //mostrar a pagina Html com os dados do banco de Dados
        return res.render("search-results.html", { places: rows, total: total})
    })
})

//ligar o servidor
server.listen(3000)