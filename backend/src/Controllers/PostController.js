const PostModel = require('../Models/PostModel');

class PostController {
    //criar usuarios
    async create(req, res) {
        try {
        const { username, titulo, texto } = req.body;

        const postAlreadyExists = await PostModel.findOne({ titulo });

        if (postAlreadyExists){
            return res.status(400).json({ message: "Um post com esse título já existe"});
        }

        if (!username || !titulo || !texto) {
            return res.status(400).json({ message: "Usuario, título e corpo do post são obrigatórios"});
        }
        
        const createdPost = await PostModel.create(req.body)    

        return res.status(200).json(createdPost);
        } catch (error) {
        return res.status(404).json({ message: "Falha ao criar post"});
        }
    }

  //listar usuarios
    async index(req, res) {
        try {
        const posts = await PostModel.find();

        return res.status(200).json({ posts });
        } catch (error) {
            return res.status(404).json({ message: "Falha ao listar posts"});
        }
    }

  //mostrar um usuario especifico
    async show(req, res) {
        try {
        const { id } = req.params;
        
        const post = await PostModel.findById(id);

        if(!post) {
            return res.status(404).json({ message: "Post não existe"});
        }
        
        return res.status(200).json(post);
        
        } catch (error) {
        return res.status(404).json({ message: "Falha ao encontrar post"})
        }
    }

  //atualizar um usuario
    async update(req, res) {
        try {
            const { id } = req.params;

            await PostModel.findByIdAndUpdate(id, req.body);

            return res.status(200).json({ message: "Post atualizado"});
        } catch (error) {
            return res.status(404).json({ message: "Falha ao atualizar post"});
        }
    } 

  //deletar um usuario
    async destroy (req, res) {
        try {
            const postDeleted = await PostModel.findByIdAndDelete(id);

            if(!postDeleted){
                return res.status(404).json({ message: "Post não existe"});
            }

            return res.status(200).json({ message: "Post deletado"});
        } catch (error) {
            return res.status(404).json({ message: "Falha ao deletar post"});
        }
    }

}

module.exports = new PostController();