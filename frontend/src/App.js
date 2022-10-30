import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Button from 'react-bootstrap/Button';
import {useState} from 'react'

const URL_BACKEND = 'http://localhost:3125/'

function App() {

  const [contador, setContador] = useState(0)

  function somarUmAoContador(){
    console.log("Clicou!")
    setContador(contador + 1)
  }

  //falta exemplo de post!

  async function testarGetDoBackend() {

    try {
      let resposta = await fetch(URL_BACKEND)

      let retorno = await resposta.json()

      console.log(retorno)
    }
    catch(e) {

      console.log("Falha ao se comunicar com backend! Verifique se está rodando e se link está certo!")
    }
  }

  async function pedirQuadradoAoBackend() {

    let numero = contador

    const dados = {valor: numero};

    const requestForm = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(dados)
    };

    const response = await fetch(URL_BACKEND + "square", requestForm);

    if (response.status === 200) {

      const data = await response.json();

      console.log("Quadrado do contador (" + numero + ") é: " + data.valor)
    }
    else 
    {
      console.log("Comunicacao falhou! Codigo de erro: " + response.status)
    }
  }

  return (
    <>
      <div className="App-header">

        <p>Ola mundo</p>

        <Button
          onClick={somarUmAoContador}
        >
          Este eh um botao do bootstrap
        </Button>

        <p>{contador}</p>

        {contador > 2 ? (
          <p>Ja clicou 3 vezes!</p>
        ) : (
          <></>
        )}

        <Button
          onClick={pedirQuadradoAoBackend}
        >
          Este botao testa backend. Cheque o console.
        </Button>

      </div>
    </>
  );
}

export default App;
