


const URL_USUARIOS_GET_ALL = "/usuarios";
const URL_USUARIOS_NOVO = "/usuarios/cadastrar/:username/:password";
const URL_USUARIOS_REMOVER = "/usuarios/remover/:username";
const URL_USUARIOS_LOGAR = "/usuarios/logar/:username/:password";
const URL_USUARIOS_ALTERAR_USERNAME = "/usuarios/alterar/username/:username_atual/:username_novo";
const URL_USUARIOS_ALTERAR_PASSWORD = "/usuarios/alterar/password/:username/:password-atual/:password-nova";

const URL_POSTAGENS_GET_ALL = "/postagens";
const URL_POSTAGENS_NOVO = "/postagens/novo";

// Coisas do banco de dados mongoDB. Nao funcional ainda.
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


// Classes para manipular BD
const MAX_POSTAGENS = 5;

class ControlPostagens {
    constructor(){
        this.postagens = [{
            "username": "victor",
            "titulo": "Postagem exemplo",
            "texto": "esta eh uma postagem!"
        }];
    }

    buscarPorUsuario(username){
        let postagens_filtradas = [];
        for(const postagem of this.postagens){
            if(postagem.username == username){
                postagens_filtradas.push(postagem)
            }
        }
        return postagens_filtradas;
    }

    novaPostagem(username, titulo, texto){
        if(this.postagens.length >= MAX_POSTAGENS){
            this.#deletarMaisAntigo();
        }

        const postagem = {
            "username": username,
            "titulo": titulo,
            "texto": texto
        }

        this.postagens.push(postagem);

        return postagem;
    }

    atualizarUsernameDasPostagens(username_antigo, username_novo){
        for(let postagem of this.postagens){
            if(postagem.username == username_antigo){
                postagem.username = username_novo;
            }
            console.log(postagem)
        }
    }

    #deletarMaisAntigo(){
        this.postagens.shift();
    }
}

class ControlUsuarios {
    constructor(){
        this.users = [{
            "username": "victor",
            "password": "abc"
        }];

    }

    buscar(username) {
        let usuario = null;
        for(const user of this.users){
            if(user.username == username){
                usuario = user;
                break;
            }
        }
        return usuario;
    }
    
    logar(username, password) {
        sucesso = false;

        let usuario = this.buscar(username);
    
        if(usuario != null){
            if(usuario.password == password){
                sucesso = true;
            }
        }

        return sucesso;
    }

    cadastrar(new_username, new_password) {
        if(!this.#isUsernameDisponivel(new_username)){
            return null;
        }

        const novo_usuario = this.#criarObjetoUsuario(new_username, new_password);
        this.users.push(novo_usuario);

        return novo_usuario;
    }

    alterarUsername(username_atual, username_novo) {

        let usuario = this.buscar(username_atual);
        let usuario_com_nome_novo = this.buscar(username_novo);

        let sucesso = false;

        if((usuario != null) && (usuario_com_nome_novo == null)) {
            usuario.username = username_novo;
            sucesso = true;
        }

        return sucesso;
    }

    alterarPassword(username, password_atual, password_novo) {
        let usuario = this.buscar(username);

        if(usuario != null) {
            if(usuario.password = password_atual){
                usuario.password = password_novo;
            }
        }
        return usuario
    }

    deletar(username) {
        let usuario = this.buscar(username);
    
        if(usuario == null){
            return(null);
        }
        else{
            const index_usuario = this.users.findIndex(user => {
                return user.username === username;
            })
            const usuario_removido = this.users.splice(index_usuario, 1);

            return(usuario_removido[0]);
        }
    }

    #isUsernameDisponivel(username) {
        let is_disponivel = true;
    
        const usuario = this.buscar(username)

        if(usuario != null){
            is_disponivel = false;
        }

        return is_disponivel;
    }
    
    #criarObjetoUsuario(username, password) {
        return {
            "username": username,
            "password": password
        };
    }

}

let controlUsuarios = new ControlUsuarios();
let controlPostagens = new ControlPostagens();

// fim de classes para manipular db

// Inicio da parte do express

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3212

// Funcionalidades do tipo GET
app.use(express.static('public'));

app.get("/hello", (req, res) => {
    res.send("hello!")
})

app.get(URL_USUARIOS_GET_ALL, (req, res) => {
    res.status(200).json(controlUsuarios.users);
})

app.get(URL_POSTAGENS_GET_ALL, (req, res) => {
    res.status(200).json(controlPostagens.postagens);
})

// POSTs via JSON
app.use(bodyParser.json())

app.post(URL_POSTAGENS_NOVO, (req, res) => {
    const body = req.body;
    const username = body.username;
    const titulo = body.titulo;
    const texto = body.texto;

    let resultado = null;

    if(isDadoDefined(username) && isDadoDefined(titulo) && isDadoDefined(texto)){
        resultado = controlPostagens.novaPostagem(username, titulo, texto);
    }
    res.status(200).send(resultado);
})

// POSTs via URL
app.use(bodyParser.urlencoded({extended: false}))

app.get(URL_USUARIOS_NOVO, (req, res) => {
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

app.get(URL_USUARIOS_REMOVER, (req, res) => {
    const routeParams = req.params
    const username = routeParams.username

    let usuario_deletado = controlUsuarios.deletar(username)

    res.status(200).send(usuario_deletado);
})

app.get(URL_USUARIOS_LOGAR, (req, res) => {
    const routeParams = req.params;
    const username = routeParams.username;
    const password = routeParams.password;

    let resultado = controlUsuarios.logar(username, password);

    res.status(200).send(resultado);
})

app.get(URL_USUARIOS_ALTERAR_USERNAME, (req, res) => {
    const routeParams = req.params;
    const username_atual = routeParams.username_atual;
    const username_novo = routeParams.username_novo;

    let resultado = controlUsuarios.alterarUsername(username_atual, username_novo);
    controlPostagens.atualizarUsernameDasPostagens(username_atual, username_novo);

    res.status(200).send(resultado);
})

// Retorna true se operacao foi sucesso
app.get(URL_USUARIOS_ALTERAR_PASSWORD, (req, res) => {
    const routeParams = req.params;
    const username = routeParams.username;
    const password_atual = routeParams.password-atual;
    const password_nova = routeParams.password-nova;

    let resultado = controlUsuarios.alterarPassword(username, password_atual, password_nova);

    res.status(200).send(resultado);
})

app.listen(port)
console.log('Server started at http://localhost:' + port)