/*
thanks for help Liam Svanåsbakken Crouch spam@petterroea.com
*/

import express from 'express';

import DebugState from './state';

import ExceptionMetadata from './metadata/exception';

import DebugRequest from './debugRequest';

import log from './logging';

import Notifer from 'node-notifier';

import path from 'path';

import dotenv from 'dotenv';

dotenv.config();

class RequestCatcher {

  Start(app) {

    if (process.env.DEBUGBAR == "true") {

      Notifer.notify({
        title: 'Message from Express+',
        message: 'Debugbar on'
      });
      
    }

    log('Attached to express + instance');
    app.use('/_debug/', this.getRouter());
    app.use(this.middleware.bind(this));
  }

  private middleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    log('Catched a request');
    const transaction = DebugState.registerTransaction(req, res);

    const metadataInjector: any = req as any;
    metadataInjector.debugMetadata = {};
    metadataInjector.transaction = transaction;

    const oldSend = res.send;
    res.send = (...args: any[]): express.Response<any> => {
      transaction.setStatus(res.statusCode);
      log(`Got SEND request: ${args}`);

      if (args.length == 2) {
        if (typeof args[0] === "number") {
          transaction.setResponse(args[1]);
        } else {
          transaction.setResponse(args[0]);
        }
      } else {
        transaction.setResponse(args[0]);
      }

      transaction.setHeaders(res.getHeaders());
      transaction.setDidComplete(true);
      return oldSend.apply(res, args);
    };

    const oldJson = res.json;
    res.json = (...args): express.Response<any> => {
      transaction.setStatus(res.statusCode);
      transaction.setResponse(args[0]);
      transaction.setHeaders(res.getHeaders());
      transaction.setDidComplete(true);
      return oldJson.apply(res, args);
    };

    try {
      next();
    } catch (e) {
      log(`Request failed: ${e}`);
      transaction.attachMetadata(new ExceptionMetadata(e));
    }

    transaction.finalize();
    log('Request is handled');
  }

  private getRouter(): express.Router {
    const route = express.Router();
    var root = path.join(__dirname + '/front/');

    route.use(express.static(root));

    route.use('/api', DebugState.getRestApiRouter());

    route.use(function (req, res, next) {
      if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
        res.sendFile('index.html', { root })
      } else next()
    });
    return route;
  }
}

const ExpressPlusDebug = new RequestCatcher();

export default ExpressPlusDebug;
