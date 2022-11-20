console.log("hello!")

const form3user = document.getElementById("form3user")
const form3password = document.getElementById("form3password")

async function exemploPostagemViaPostJson() {
    event.preventDefault();

    const data_to_send = {
        username: 'victor',
        titulo: "Primeira postagem",
        texto: "Eu gosto de banana!!!"
    };
    const req = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data_to_send)
    };

    let res = await fetch("/postagens/novo", req);

    if(res.status == 200){
        data = await res.json();
        console.log(data);
    }
}

async function exemploCadastrarViaGetUrl() {
    event.preventDefault();

    const username = 'nome_exemplo';
    const password = 'senha';

    let res = await fetch(`/usuarios/cadastrar/${username}/${password}`);

    if(res.status == 200){
        let data = await res.json();
        console.log(data);
    }
}

async function pegarTodosUsuarios() {
    const res = await fetch("/usuarios")
    
    if(res.status == 200){
        const dados = await res.json()
        console.log(dados)
    }
}

async function pegarTodasPostagens() {
    const res = await fetch("/postagens")
    
    if(res.status == 200){
        const dados = await res.json()
        console.log(dados)
    }
}

document.getElementById("userform3").onsubmit = function submitF(event) {
    event.preventDefault()

    const username = form3user.value;
    const password = form3password.value;

    
    fetch(`/usuarios/cadastrar/${username}/${password}`)
    .then( (response) => response.json())
    .then( text => console.log(text))

    return false
}

