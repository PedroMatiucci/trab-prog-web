import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Button from 'react-bootstrap/Button';
import {useState} from 'react'

const URL_BACKEND = 'http://localhost:3125/'

function App() {

  const [contador, setContador] = useState(0)

  function aoClicar(){
    console.log("Clicou!")
    setContador(contador + 1)
  }

  //falta exemplo de post!

  async function testarBackend() {

    try {
      let resposta = await fetch(URL_BACKEND)

      let retorno = await resposta.json()

      console.log(retorno)
    }
    catch(e) {

      console.log("Falha ao se comunicar com backend! Verifique se está rodando e se link está certo!")
    }
  }

  return (
    <>
      <div className="App-header">

        <p>Ola mundo</p>

        <Button
          onClick={aoClicar}
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
          onClick={testarBackend}
        >
          Este botao testa backend. Cheque o console.
        </Button>

      </div>
    </>
  );
}

export default App;
