'use strict';
const express = require('express');
const router = express.Router();

const Advert = require('../../models/Advert');
const { nameFilter, priceRangeFilter } = require('../../lib/utils');

//Primer endpoint: búsquedas de tipo 'query-string' con los siguientes filtros:

//Tipos de filtro:

//búsqueda parcial (solo un atributo o subcojunto de atributos) ==> ?select=atributo_1&select=atributo_2 
//paginación ==> ?skip=valor y  ?limit=valor
//ordenación ascendente ==> ?sort=atributo
//valor de atributo ==> ?atributo:valor
//búsqueda por nombre igual a la cadena o las primeras letras de la cadena introducida ==>  ?name=cadena
//búsqueda por rango de precios ==> ?price=min-  / ?price=min-max  /?price=-max 
//combinaciones de las anteriores

router.get('/', async function (req, res, next) {

    try {

        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const sort = req.query.sort;
        const select = req.query.select;

        const filter = {};

        const sale = req.query.sale;
        if (sale) filter.sale = sale;

        const tags = req.query.tags;
        if (tags) filter.tags = tags;

        const name = req.query.name;
        nameFilter(name, filter);       //filtro auxiliar por primeras letras del nombre

        const price = req.query.price;
        priceRangeFilter(price, filter); //filtro auxiliar para el rango de precios

        const adverts = await Advert.customFind(filter, skip, limit, sort, select);

        res.json({ result: adverts });
    }
    catch (err) {
        next(err);
    }
});


module.exports = router;
