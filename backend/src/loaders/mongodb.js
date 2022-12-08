const mongoose = require('mongoose'); 

async function startDB (){
    await mongoose.connect('mongodb+srv://pedromandelli:programacaoweb@ufscprogweb.oa8oi3f.mongodb.net/test');
}

module.exports = startDB