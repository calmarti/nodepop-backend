'use strict';

const conn = require('./lib/connectMongoose')
const Advert = require('./models/Advert');
const initialData = require('./advertsSample.json');

main().catch(err=>console.log('Hubo un error: ', err.message));


async function main () {
    await initAdverts();
    conn.close();
};


async function initAdverts() {
        const deleted = await Advert.deleteMany();
        console.log(`Se han eliminado ${deleted.deletedCount} anuncios`);
        const adverts = await Advert.insertMany(initialData.adverts);
        console.log(`La base de datos se ha inicializado con ${adverts.length} anuncios`);
}
  
 


