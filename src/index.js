// author: Ulvi Memmedov
'use strict';

try {

    const MongoController = require('./Controllers/mongoBaseController')
    
    const Multer = require('./Multer/multer');

    const { Global, SetGlobal, DeleteGlobal } = require('./Global/global');

    const { Mysql, Mongoose } = require('./Database/database');

    const { Helmet, Cors } = require('./Security/security');

    const CookieParser = require('./CookieParser/cookieParser');

    const Logger = require('./Logger/logger');

    const SwaggerUi = require('./ApiDocs/swaggerUi');

    const { Handler, AsyncHandler } = require('./ExceptionHandler/Handler');

    const Validation = require('./Validation/validation');

    const {Service,Router, JsonParser, UrlEncoded } = require('./Server/server');
    
    module.exports = {
        Service,
        Router,
        JsonParser,
        UrlEncoded,
        Handler,
        CookieParser,
        Helmet,
        Cors,
        Validation,
        AsyncHandler,
        Logger,
        SwaggerUi,
        Mysql,
        Mongoose,
        Global,
        SetGlobal,
        DeleteGlobal,
        Multer,
        MongoController
    }

} catch (error) {
    console.log(
        `
        error: Something went wrong \n 
        msg: ${error}

        `
    );
}