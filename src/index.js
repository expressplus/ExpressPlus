// author: Ulvi Memmedov
'use strict';

try {
    const {Global,SetGlobal,DeleteGlobal} = require('./Global/global');

    const { Mysql, Mongoose } = require('./Database/database');

    const { Helmet, Cors } = require('./Security/security');

    const CookieParser = require('./CookieParser/cookieParser');

    const Apicache = require('./Caching/caching');

    const Logger = require('./Logger/logger');

    const SwaggerUi = require('./ApiDocs/swaggerUi');

    const { Handler, AsyncHandler } = require('./ExceptionHandler/Handler');

    const Validation = require('./Validation/validation');

    const { Service, JsonParser, UrlEncoded,Service,Router } = require('./Server/server');

    module.exports = {
        Service,
        Router,
        JsonParser,
        UrlEncoded,
        Handler,
        Static,
        CookieParser,
        Set,
        Helmet,
        Cors,
        Validation,
        AsyncHandler,
        Logger,
        SwaggerUi,
        Apicache,
        Mysql,
        Mongoose,
        Global,
        SetGlobal,
        DeleteGlobal
    }

} catch (error) {
    console.log(
        `
        error: Something went wrong \n 
        msg: ${error}

        `
    );
}