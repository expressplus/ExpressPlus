// author: Ulvi Memmedov
'use strict';

const Helmet = require("helmet");
const Cors = require('cors');
const csurf = require('csurf');

//nosql and sql injection middleware 
const Guard = (req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    if (req.body) {

        Object.keys(req.body).map(function (key, index) {

            req.body[key] = req.body[key].toString();

        });

        req.body = req.body

    }

    if (new RegExp(/(script)|(%)|("&ne")|(&ne)|("&ne": "")|(&ne: "")|(' '==' ')|(find and update)|(TL;DR)|(&lt;)|(&gt;)|(%3c)|(%3e)|(SELECT)|(UPDATE)|(INSERT)|(DELETE)|(GRANT)|(REVOKE)|(UNION)|(&amp;lt;)|(&amp;gt;)/g).test(req.url)) {

        return res.json({ 
            
            guard:"on",
            message:'NO!' 
        
        });

    } else {

        next();

    }
};



module.exports = {Helmet,Cors,Guard,csurf};
