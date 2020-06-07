const sqlLite = require('sqlite3').verbose()
const modal = require('./modal')
const db = new sqlLite.Database('./src/database/database.db',function(err){
    if(err)
        return console.log(err)
    console.log()
    console.log('SqlLite3 inciado')
})

// const objPost = {
                //     itens:[],
                //     entidade:"",
                //     url:"",
                //     address:"",
                //     number:"",
                //     state:""

                // // }
     // db.serialize(()=> {
                //     
                //     `);
                //     const query = (`
                //         INSERT INTO places(
                //             url,
                //             entidade,
                //             adress,
                //             number,
                //             state,
                //             city,
                //             itens
                //         ) VALUES (?,?,?,?,?,?,?);
                //     `)
                    
                //     db.run(`DELETE FROM places WHERE id=?`,[1],function(err){
                //         if(err)
                //             console.log(err)
                //         console.log('Apagado com sucesso')
                //     })
                //     // db.run(query,["121212"
                //     // ,"Caio Caik Fresneda Souza",
                //     // "Rua Joao Ventura Batista-",
                //     // "121212","RO","[1241,12312312]","Alta floreta"],function(err){
                //     //     if(err)
                //     //         return console.log('erro')
                //     //     console.log('cadastrado com sucesso')
                //     //     console.log(this)
                //     // })

                // })

 db.run(`
     CREATE TABLE IF NOT EXISTS places ${modal.create};`)
module.exports = {
    list:(list = '*') => new Promise ((resolve,reject) =>{
        db.all(`SELECT ${list} FROM places`,function (err, rows){
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