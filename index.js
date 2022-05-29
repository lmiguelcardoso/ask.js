const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const connection = require('./database/database')
const pergunta = require('./database/Pergunta')
const resposta = require('./database/Resposta')
// LINKAR A DATABASE COM O APP;
connection.authenticate().then(()=>{
    console.log('Sucess')
}).catch(()=>{
    console.log('Error')
})

//DECODIFICAR OS DADOS DO FORM EM JS
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//USAR O EJS COMO VIEW ENGINE
app.set('view engine','ejs')
// USAR CSS e ARQUIVOS ESTATICOS
app.use(express.static('public'))

// ROUTES
app.get('/', (req,res)=>{
    //EQUIVALENTE AO SELECT * FROM PERGUNTAS
    pergunta.findAll({raw: true,order:[
        ['id','DESC'] //ASC == CRESCENTE DESC == DECRESCENTE
    ]}).then((perguntas)=>{
        res.render('index',{
            asklist: perguntas
        })
    })
})

app.get('/perguntar',(req,res)=>{
    res.render('perguntar')
})

app.get('/pergunta/:id',(req,res)=>{
    let id = req.params.id;
    pergunta.findOne({
       where:{id:id}
    }).then(pergunta=>{
        if(pergunta != undefined){
            resposta.findAll({
                where: {perguntaid: pergunta.id},
                order: [['id', 'DESC']]
            }).then((respostas)=>{
                res.render('responder',{
                pergunta: pergunta,
                respostas: respostas
            })})

            
        }else{
            res.redirect('/')
        }
    })
})

app.post('/salvarpergunta',(req,res)=>{
    let titulo = req.body.titulo
    let descricao = req.body.descricao
    //EQUIVALENTE AO INSERT INTO NO SQL
    pergunta.create({
        titulo: titulo,
        descricao:descricao
    }).then(()=>{
        res.redirect('/')
    })

})

app.post('/responder',(req,res)=>{
    let corpo = req.body.corpo
    let perguntaid = req.body.pergunta

    resposta.create({
        corpo: corpo,
        perguntaid:perguntaid
    }).then(()=>{
        res.redirect(`/pergunta/${perguntaid}`)
    })
})

app.listen(port,()=>{
    console.log("APP rodando na porta " + port)
})