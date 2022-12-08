const { Router } = require('express');

const UserController = require('./Controllers/UserController');
const PostController = require('./Controllers/PostController');


const routes = Router();

routes.get('/health', (req, res)=> {
    return res.status(200).json({message: 'Server is on...'});
})

routes.post('/users', UserController.create);
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.post('/posts', PostController.create);
routes.get('/posts', PostController.index);
routes.get('/posts/:id', PostController.show);
routes.put('/posts/:id', PostController.update);
routes.delete('/posts/:id', PostController.destroy);


module.exports = routes;