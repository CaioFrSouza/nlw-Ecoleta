const express = require('express')
const nunjucks = require('nunjucks') 
const db = require('./src/database')
const app = express()

app.use('/',express.static(`${__dirname}/src/public`))

nunjucks.configure('src/views',{
    express:app,
    noCache:true
})

app.get('/',(req,res)=> {
    return res.render('index.html',{
        title:'Seu marketplace de coleta de resíduos'
    })
})

app.get('/search',async(req,res)=> {
    const places = await db.list('*')
    console.log(places)
    db.add(["https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1474&q=80","Coletora de lixo 3000","Rua Depu","300","SP","São Paulo","Sla"])
    return res.render('search.html',{
        title:`${places.length} Pontos encontrados`,
        places:places
    })
})
app.get('/cadastrarUmPontoDeColeta',(req,res)=> {
    return res.render('cadastrarUmPontoDeColeta.html')
})
app.listen('3000',()=> {
    console.clear()
    console.log('Server iniciado')
})