const express = require('express')
const nunjucks = require('nunjucks') 
const db = require('./src/database')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
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
    const query = req.query.city
    if(query == "")
        return res.render('search.html',{
            places:0
        })
    const places = await db.list('*',query)


    return res.render('search.html',{
        total:places.length,
        places:places
    })
})

app.post('/cadastrar',async(req,res)=> {
    const body = await (req.body)
    const arr = [
        body.url,
        body.entidade,
        body.address,
        body.number,
        body.state,
        body.city,
        body.itens,
    ]
    await db.add(arr)
    return res.render('cadastrarUmPontoDeColeta.html', {
        cadastro:true
    })
})
app.get('/cadastrarUmPontoDeColeta',(req,res)=> {
    return res.render('cadastrarUmPontoDeColeta.html')
})
app.listen('3000',()=> {
    console.clear()
    console.log('Server iniciado')
})