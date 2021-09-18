'use strict';

const mongoose = require('mongoose');

const main = async(err) =>{
    await mongoose.connect('mongodb://127.0.0.1:27017/nodepop');
}

main().then(result => console.log('Conectado a MongoDB, base de datos:', mongoose.connection.name))
main().catch(err => {                              //Gestión del error al intentar establecer la conexión
    console.log('Error al intentar establecer la conexión: ', err.message);
    process.exit(1);
    });


mongoose.connection.on('error', (err)=>  {         //Gestión de errores una vez establecida la conexión
    console.log('Se ha perdido la conexión con la base de datos', err.message);
    });
      
 
module.exports = mongoose.connection;