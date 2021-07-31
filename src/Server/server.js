// author: Ulvi Memmedov
const Service = require('../Core/expressCore');
const Router = require('../Core/expressCore')

/**
@AviableParams
{extends : true or false}
UrlEncoded({extended:true})
* */
const UrlEncoded = Service.urlencoded;

/**
@Use
Service.use(JsonParser)
* */
const JsonParser = Service.json();

/**
@AviableParams
Calback function
@RequiredParams
Port
ProServer.listen(Port, Calback)
* */
module.exports = { Service,UrlEncoded,JsonParser,Router }
