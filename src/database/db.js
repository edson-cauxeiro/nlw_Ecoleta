//importar a dependencia do sqlite3
const sqlite3 = require('sqlite3').verbose()

//criar o objecto que ira fazer operações no Banco de Dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//utilizar o objecto de banco de dados, para nossos operações
/* db.serialize(() => {
    // Como Comandos SQL eu vou:
    // 1 criar uma Tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // 2 inserir dados na tabela
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
        "Papersider",
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "Guilherme Gemballa, Jardim America",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papeis e Papelão"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Cadastro com sucesso")
        console.log(this)
    }
   // db.run(query, values, afterInsertData)

    // 3 consultar os dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        console.log("Aqui estão seus Registros: ")
        console.log(rows)
    })

    // 4 Deletar um dado da tabela 
    db.run(`DELETE FROM places WHERE id = ?`, [4], function(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Registro deletado com Sucesso!")
    })    
}) */

