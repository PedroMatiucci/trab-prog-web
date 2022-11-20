
// Inicio da parte do banco com MongoDB

//import {ControlUsuarios} from './components/usuarios'

const {ControlUsuarios, ControlPostagens} = require('service_usuarios');

let controlUsuarios = new ControlUsuarios();
let controlPostagens = new ControlPostagens();

const {MongoClient} = require('mongodb')
const DB_NAME = 'backenddb'
const USERS_COLLECTION_NAME = 'usuarios'
const POSTS_COLLECTION_NAME = 'postagens'
const MONGO_URL = `mongodb://localhost/27017/${DB_NAME}`

var client = new MongoClient(MONGO_URL, {useUnifiedTopology: true})

async function cadastrarUsuarioBaseDeDados(username, email) {
    const connected_client = await client.connect()

    const db = connected_client.db(DB_NAME)

    const collection = db.collection(COLLECTION_NAME)

    const doc = {
        "username": username,
        "email": email
    }

    const res = await collection.insertOne(doc)

    console.log(`Adicionado: ${res.insertedId}`)
}

async function pegarTodaBase() {
    const connected_client = await client.connect()

    const db = connected_client.db(DB_NAME)

    const collection = db.collection(COLLECTION_NAME)

    const lista = await collection.find().toArray()

    return lista
}

// Fim da parte do banco com MongoDB

function isDadoDefined(dado) {
    let status = true;
    if(typeof dado === 'undefined'){
        status = false;
    }
    return status;
}

// Inicio da parte do express

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3212

app.use(express.static('public'));

app.get("/hello", (req, res) => {
    res.send("hello!")
})

app.get("/usuarios", (req, res) => {
    res.status(200).json(controlUsuarios.users);
})

app.get("/postagens", (req, res) => {
    res.status(200).json(controlPostagens.postagens);
})

app.use(bodyParser.json())
app.post("/usuarios/cadastrar/via-json", (req, res) => {
    const body = req.body;
    const username = body.username;
    const password = body.password;

    res.status(200).send();
})

// POSTs via URL
app.use(bodyParser.urlencoded({extended: false}))
app.get("/usuarios/cadastrar/:username/:password", (req, res) => {
    const routeParams = req.params;
    const username = routeParams.username;
    const password = routeParams.password;

    let status;
    let resultado = null;

    if( !isDadoDefined(username) || !isDadoDefined(password) ){
        status = 400;
    }
    else{
        status = 200;
        resultado = controlUsuarios.cadastrar(username, password);
    }
    res.status(status).send(resultado);
})

app.get("/usuarios/remover/:username", (req, res) => {
    const routeParams = req.params
    const username = routeParams.username

    let usuario_deletado = controlUsuarios.deletar(username)

    res.status(200).send(usuario_deletado);
})

app.get("/usuarios/logar/:username/:password", (req, res) => {
    const routeParams = req.params;
    const username = routeParams.username;
    const password = routeParams.password;

    let resultado = controlUsuarios.logar(username, password);

    res.status(200).send(resultado);
})

app.get("/usuarios/alterar/username/:username_atual/:username_novo", (req, res) => {
    const routeParams = req.params;
    const username_atual = routeParams.username_atual;
    const username_novo = routeParams.username_novo;

    let resultado = controlUsuarios.alterarUsername(username_atual, username_novo);
    controlPostagens.atualizarUsernameDasPostagens(username_atual, username_novo);

    res.status(200).send(resultado);
})

app.get("/usuarios/alterar/password/:username_atual/:username_novo", (req, res) => {
    const routeParams = req.params;
    const username_atual = routeParams.username_atual;
    const username_novo = routeParams.username_novo;

    let resultado = controlUsuarios.alterarUsername(username_atual, username_novo);

    res.status(200).send(resultado);
})

app.listen(port)
console.log('Server started at http://localhost:' + port)