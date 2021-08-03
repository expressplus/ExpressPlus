"use strict";
/*
thanks for help Liam Svanåsbakken Crouch spam@petterroea.com
*/
exports.__esModule = true;
var express_1 = require("express");
var state_1 = require("./state");
var exception_1 = require("./metadata/exception");
var logging_1 = require("./logging");
var Notifer = require('node-notifier');    
var path = require('path');
var dotenv = require('dotenv');
dotenv.config();
var RequestCatcher = /** @class */ (function () {
    function RequestCatcher() {
    }
    RequestCatcher.prototype.Start = function (app) {
        if (process.env.DEBUGBAR == "true") {

            Notifer.notify({
              title: 'Message from Express+',
              message: 'Debugbar on'
            });
            
          }
        logging_1["default"]('Attached to Express + instance');
        app.use('/_debug/', this.getRouter());
        app.use(this.middleware.bind(this));
    };
    RequestCatcher.prototype.middleware = function (req, res, next) {
        logging_1["default"]('Catched a request');
        var transaction = state_1["default"].registerTransaction(req, res);
        var metadataInjector = req;
        metadataInjector.debugMetadata = {};
        metadataInjector.transaction = transaction;
        var oldSend = res.send;
        res.send = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            transaction.setStatus(res.statusCode);
            logging_1["default"]("Got SEND request: " + args);
            if (args.length == 2) {
                if (typeof args[0] === "number") {
                    transaction.setResponse(args[1]);
                }
                else {
                    transaction.setResponse(args[0]);
                }
            }
            else {
                transaction.setResponse(args[0]);
            }
            transaction.setHeaders(res.getHeaders());
            transaction.setDidComplete(true);
            return oldSend.apply(res, args);
        };
        var oldJson = res.json;
        res.json = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            transaction.setStatus(res.statusCode);
            transaction.setResponse(args[0]);
            transaction.setHeaders(res.getHeaders());
            transaction.setDidComplete(true);
            return oldJson.apply(res, args);
        };
        try {
            next();
        }
        catch (e) {
            logging_1["default"]("Request failed: " + e);
            transaction.attachMetadata(new exception_1["default"](e));
        }
        transaction.finalize();
        logging_1["default"]('Request is handled');
    };
    RequestCatcher.prototype.getRouter = function () {
        var route = express_1.Router();
        var root = path.join(__dirname+'/front/');
        route.use(express_1.static(root));
        route.use('/api', state_1["default"].getRestApiRouter());
        route.use(function (req, res, next) {
            if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
                res.sendFile('index.html', { root: root });
            }
            else
                next();
        });
        return route;
    };
    return RequestCatcher;
}());
var ExpressPlusDebug = new RequestCatcher();
exports["default"] = ExpressPlusDebug;
