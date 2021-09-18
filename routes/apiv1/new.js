'use strict';
const express = require('express');
const router = express.Router();

const Advert = require('../../models/Advert');
const { body, validationResult } = require('express-validator');

//segundo endpoint: creación de un documento nuevo

router.post('/',
    body('price').isNumeric({ no_symbols: true }),  //validación de precios: número no negativo
    body('sale').isBoolean(),                       //validación de variable 'sale' como booleana

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
            err.status = 400;   //error de validación por dejar el campo vacío (propiedad 'require:true' en el schema)
            next(err);
        }

    });



module.exports = router;