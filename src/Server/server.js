// author: Ulvi Memmedov


const http = require('http');

const express = require('express');

const Service = express();

const Static = express.static

const Set = Service.set

/**
@AviableParams
{extends : true or false}
UrlEncoded({extended:true})
* */
const UrlEncoded = express.urlencoded;

/**
@Use
Service.use(JsonParser)
* */
const JsonParser = express.json();

/**
@AviableParams
Calback function
@RequiredParams
Port
ProServer.listen(Port, Calback)
* */
const ProServer = http.createServer(Service);

module.exports = { ProServer,Service,UrlEncoded,JsonParser,Static,Set }
