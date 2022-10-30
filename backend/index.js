const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({
    origin: '*'
}));

app.use(express.json())

app.get("/", (req, res) => {
    console.log("Acessou diretorio padrao")
    res.send(['Ola do diretorio normal!'])
})

app.post('/square', (req, res) => {

    let valor = req.body.valor

    if (typeof valor == typeof Null) {

        res.status(400).json()
    } else {

        let resultado = valor * valor
        res.status(200).json({valor: resultado})
    }
})

app.listen(3125, ()=>console.log("Listening"))