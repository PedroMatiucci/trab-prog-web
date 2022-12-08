const { Router } = require('express');

const UserController = require('./Controllers/UserController');

const routes = Router();

routes.get('/health', (req, res)=> {
    return res.status(200).json({message: 'Server is on...'});
})

routes.post('/users', UserController.create);
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);


module.exports = routes;