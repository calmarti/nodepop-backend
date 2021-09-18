'use strict';

function isApiRequest(req) {

    const url = req.originalUrl.startsWith('/apiv1/');
    return url;
}


function nameFilter(name, filter) {
    const nameRegex = new RegExp(`^${name}`, 'i');
    if (name) return filter.name = nameRegex;
}


function priceRangeFilter(price, filter) {

    if (price) {
        if (price.indexOf('-') === -1) filter.price = price;

        else if (price.endsWith('-')) {
            const min = price.slice(0, price.indexOf('-'));
            filter.price = { $gte: min };
        }

        else if (price.startsWith('-')) {
            const max = price.slice(price.indexOf('-') + 1);
            filter.price = { $lte: max };
        }

        else if (!price.endsWith('-') && !price.startsWith('-')) {
            const min = price.slice(0, price.indexOf('-'));
            const max = price.slice(price.indexOf('-') + 1);
            filter.price = { $gte: min, $lte: max };
        }
    }
}


module.exports = { isApiRequest, nameFilter, priceRangeFilter };