'use strict';
const express = require('express');
const router = express.Router();

const Advert = require('../../models/Advert');
const { body, validationResult } = require('express-validator');

//segundo endpoint: creación de un documento nuevo

router.post('/',
    body('name'),                             
    body('price').isNumeric({ no_symbols: true }),  //validación del precio: número no negativo
    body('sale').isBoolean(),                       //validación de 'sale': valor booleano

    async function (req, res, next) {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const newData = req.body;

            const newAdvert = new Advert(newData);

            const newAdvertSaved = await newAdvert.save();

            res.status(201).json({ result: newAdvertSaved });

        } catch (err) {
            //err.status = 400;   //error de validación por dejar el campo 'name' vacío (propiedad 'require:true' en el schema)
            next(err);
        }

    });



module.exports = router;