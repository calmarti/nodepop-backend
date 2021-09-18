var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

require('./lib/connectMongoose');
const { isApiRequest } = require('./lib/utils');


// configuración de las vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//endpoints de la API
app.use('/apiv1/adverts', require('./routes/apiv1/adverts'));     //para búsquedas con o sin filtros
app.use('/apiv1/adverts/new', require('./routes/apiv1/new'))      //para crear un nuevo documento
app.use('/apiv1/adverts/tags', require('./routes/apiv1/tags'));   //para obtener la lista de las etiquetas



//ruta única de front-end
app.use('/', require('./routes/index'));



// middleware que captura errores 404 y lo pasa al gestor de errores
app.use(function (req, res, next) {
  next(createError(404));
});


// gestor de errores
app.use(function (err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  //renderizado del error según el destino de la petición (api o front-end)
  if (isApiRequest(req)) {
    return res.json({ error: err.message })
  }

  res.render("error");

});


module.exports = app;


//TODO: primero que nada borrar el repo subido (tiene una carpeta de más) y arreglar esto!, no olvidar luego poner la URL definitiva en el README.md

//TODO: Al acabar la revisión de código, no tocarlo más y probar de nuevo el recurso NEW!! (y los otros dos recursos) de todas las formas habidas y por haber

//TODO: Revisar leyendo 'desde afuera' el README.md, cazar gazapos y pulirlo

//TODO: Hacer la documentación con io.docs

//Post-práctica:

//TODO: pensar en toda la app en términos de MVC, digerirla y visualizarla; lo mismo para express, mongoose y MongoDB










