const sqlLite = require('sqlite3').verbose()
const modal = require('./modal')
const db = new sqlLite.Database('./src/database/database.db',function(err){
    if(err)
        return console.log(err)
    console.log()
    console.log('SqlLite3 inciado')
})

 db.run(`
     CREATE TABLE IF NOT EXISTS places ${modal.create};`)
module.exports = {
    list:(list = '*',city) => new Promise ((resolve,reject) =>{
        db.all(`SELECT ${list} FROM places WHERE city LIKE '%${city}%'`,function (err, rows){
                    if(err)
                        return reject ({err})
                    resolve(rows)
                    
                })}),
    add:(itens = []) => new Promise((resolve,reject) =>{
    db.run(modal.query,itens,function(err){
        if(err)
            return reject(err)
        console.log('cadastrado com sucesso')
        resolve('Cadastrado')
    })}),
    delete:(id) => new Promise((resolve,reject)=>{
        db.run(`DELETE FROM places WHERE id=?`,[id],function(err) {
            if(err)
                reject( {err} )
            resolve('Deletado com sucessos')
        })
    })
    }