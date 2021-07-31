// author: Ulvi Memmedov
'use strict';

const AsyncHandler = require('express-async-handler');
const dotenv = require('dotenv');

dotenv.config();
/**
@HttpErrorHandler
error Handler
* */
const Handler = (err, req, res, next) => {

        console.log(err)

        res.status(500).json({ error: err });

}
/**
@AsyncErrorHandler
error Handler
* */

module.exports = {Handler,AsyncHandler};
