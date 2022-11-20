
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

    novaPostagem(body){
        if(this.postagens.length >= MAX_POSTAGENS){
            this.#deletarMaisAntigo();
        }

        this.postagens.push({
            "username": body.username,
            "titulo": body.titulo,
            "texto": body.texto
        })
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

        if((usuario != null) && (usuario_com_nome_novo == null)){
            usuario.username = username_novo;
        }

        return usuario;
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

module.exports = {ControlUsuarios, ControlPostagens}
