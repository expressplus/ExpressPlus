// author: Ulvi Memmedov
'use strict';

const Core = require('express');
    
const Service = Core();

const Router = Core.Router();

/**
@Use
Service.use(UrlEncoded({{extended:true}}))
@AviableParams
{extends : true or false}
UrlEncoded({extended:true})
* */
const UrlEncoded = Core.urlencoded;

/**
@Use
Service.use(JsonParser)
* */
const JsonParser = Core.json;

module.exports = { Router,UrlEncoded,JsonParser,Service}
