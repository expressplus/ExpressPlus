// author: Ulvi Memmedov
'use strict';

try {
    
    const dotenv = require('dotenv');

    dotenv.config();

    const Notifer = require('./Notifer/notifer');

    const ExpressPlusDebug = require('./DebugPanel/index');

    const MongoController = require('./Controllers/Mongo/MongoBaseController')

    const Multer = require('./Multer/multer');

    const { Global, SetGlobal, DeleteGlobal } = require('./Global/global');

    const { Mysql, Mongoose } = require('./Database/database');

    const MysqlController = require('./Controllers/Mysql/MysqlBaseController')

    const { Helmet, Cors,Guard ,csurf } = require('./Security/security');

    const CookieParser = require('./CookieParser/cookieParser');

    const Logger = require('./Logger/logger');

    const SwaggerUi = require('./ApiDocs/swaggerUi');

    const { Handler, AsyncHandler } = require('./ExceptionHandler/Handler');

    const Validation = require('./Validation/validation');

    const { Service, Router, JsonParser, UrlEncoded, Static } = require('./Server/server');

    if (process.env.EXPRESSPLUS == "true") {

        Notifer.notify({

            title: 'Message from Express+',
            message: 'Service is Running'

        });
    }

    module.exports = {
        MysqlController,
        csurf,
        Guard,
        dotenv,
        Static,
        ExpressPlusDebug,
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
    console.error(
         
        `
                  Express+

         msg: Something Went Wrong :( \n 
         ${Error(error)}

        `
    );
}
