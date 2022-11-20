console.log("hello!")

const form3user = document.getElementById("form3user")
const form3email = document.getElementById("form3mail")
const form4user = document.getElementById("form4user")
const form4email = document.getElementById("form4mail")

async function exemploCadastrarViaPostJson() {
    event.preventDefault();

    const data_to_send = {
        username: 'vitasso',
        password: 'aloalo'
    };
    const req = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data_to_send)
    };

    let res = await fetch("/usuarios/is-username-disponivel", req);

    let data = await res.json();

    console.log(data);

    if(data.resultado == true){
        res = await fetch("/usuarios/cadastrar/via-json", req);
        data = await res.json();
        console.log(data);
    }
}

async function exemploCadastrarViaGetUrl() {
    event.preventDefault();

    const username = 'nome_exemplo';
    const password = 'senha';

    let res = await fetch(`/usuarios/cadastrar/via-url/${username}/${password}`);

    let data = await res.json();

    console.log(data);
}

async function pegarTodosUsuarios() {
    const res = await fetch("/users")
    
    if(res.status == 200){
        const dados = await res.json()
        console.log(dados)
    }
    else{
        console.log("Erro ao tentar puxar todos usuarios!")
    }
}

document.getElementById("userform3").onsubmit = function submitF(event) {
    event.preventDefault()
    const data = {
        username: form3user.value,
        email: form3email.value
    }
    
    fetch("/cadastrar-novo-usuario", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    .then( (response) => response.text())
    .then( text => console.log(text))

    return false
}


document.getElementById("userform4").onsubmit = function submitF(event) {
    event.preventDefault()
    const data = {
        username: form4user.value,
        email: form4email.value
    }
    
    fetch(`/registerUserGetAndRoute/${data.username}/${data.email}`)
    .then( (response) => response.text())
    .then( text => console.log(text))

    return false
}
