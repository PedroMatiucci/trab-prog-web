const UserModel = require('../Models/UserModel');

class UserController {
  //criar usuarios
  async create(req, res) {
    try {
      const { username, password } = req.body;

      const userAlreadyExists = await UserModel.findOne({ username });

      if (userAlreadyExists){
        return res.status(400).json({ message: "Um usuario com esse nome já existe"});
      }

      if (!username || !password) {
        return res.status(404).json({ message: "Falha ao criar usuario"});
      }

      const createdUser = await UserModel.create(req.body);
    
      return res.status(200).json(createdUser);
    } catch (error) {
      return res.status(404).json({ message: "Falha ao criar usuario"});
    }
  }

  //listar usuarios
  async index(req, res) {
    try {
      const users = await UserModel.find();

      return res.status(200).json({ users });
    } catch (error) {
      return res.status(404).json({ message: "Falha ao listar usuarios"});
    }
  }

  //mostrar um usuario especifico
  async show(req, res) {
    try {
      const { id } = req.params;
    
      const user = await UserModel.findById(id);

      if(!user) {
        return res.status(404).json({ message: "Usuario nao existe"});
      }

      return res.status(200).json(user);
      
    } catch (error) {
      return res.status(404).json({ message: "Falha ao encontrar usuario"})
    }
  }

  //atualizar um usuario
  async update(req, res) {
    try {
      const { id } = req.params;

      await UserModel.findByIdAndUpdate(id, req.body);

      return res.status(200).json({ message: "Usuario atualizado"});
    } catch (error) {
      return res.status(404).json({ message: "Falha ao atualizar usuario"});
    }
  
  }

  //deletar um usuario
  async destroy (req, res) {
    try {
      const { id } = req.params;

      const userDeleted = await UserModel.findByIdAndDelete(id);

      if(!userDeleted){
        return res.status(404).json({ message: "Usuario não existe"});
      }

      return res.status(200).json({ message: "Usuario deletado"});
    
    } catch (error) {
      return res.status(404).json({ message: "Falha ao deletar usuario"});
    }
  }
}

module.exports = new UserController();