const app = require("./app")
const Loaders = require('./loaders/index.js')

Loaders.start();

app.listen(3333, ()=> console.log('server is running'))