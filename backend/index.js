const express = require('express')
const cors = require('cors')
const app = express()

// BACKEND FEITO COM JAVASCRIP SIMPLES, TENDO COMO BASE O EXEMPLO DO PROFESSOR

app.use(cors({
    origin: '*'
}));

app.use(express.json())

app.get("/", (req, res) => {
    console.log("Acessou diretorio padrao")
    res.send(['Ola do diretorio normal!'])
})

// exemplo de post do professor
app.post('/check-user', (req, res) => {   

    let username = req.body.username    

    console.log(username)

    if(users.indexOf(username) > -1) {
        res.status(200).json({userExists: true})
    } else {
        res.status(200).json({userExists: false})
    }
})

app.listen(3125, ()=>console.log("Listening"))