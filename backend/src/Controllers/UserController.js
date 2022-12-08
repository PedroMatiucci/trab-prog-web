const UserModel = require('../Models/UserModel');

class UserController {
  //criar usuarios
  async create(req, res) {
    const createdUser = await UserModel.create(req.body);
    
    return res.status(200).json(createdUser);
  }

  //listar usuarios
  async index(req, res) {
    const users = await UserModel.find();

    return res.status(200).json({ users });
  }

  //mostrar um usuario especifico
  async show() {

  }

  //atualizar um usuario
  async update() {

  }

  //deletar um usuario
  async destroy () {

  }
}

module.exports = new UserController();