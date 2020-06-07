const express = require('express')
const nunjucks = require('nunjucks') 

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

app.get('/search',(req,res)=> {
    return res.render('search.html')
})
app.get('/cadastrarUmPontoDeColeta',(req,res)=> {
    return res.render('cadastrarUmPontoDeColeta.html')
})

app.listen('3000',()=> {
    console.clear()
    console.log('Server iniciado')
})