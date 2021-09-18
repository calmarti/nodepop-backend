'use strict';
const express = require('express');
const router = express.Router();
const Advert = require('../../models/Advert');


//tercer endpoint: obtención de la lista de tags 

router.get('/', async function (req, res, next) {
    try {
        const uniqueTags = await Advert.distinct('tags');
        res.json({ result: uniqueTags });
    } catch (err) {
        next(err);
    }

});



module.exports = router;