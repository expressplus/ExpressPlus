"use strict";
exports.__esModule = true;
var uuid_1 = require("uuid");
var state_1 = require("./state");
var logging_1 = require("./logging");
var Transaction = /** @class */ (function () {
    function Transaction(request, response) {
        var _this = this;
        this.statusCode = 0; // If none of our hooks catch it, it was probably a 404.
        this.didComplete = false;
        this.metadataCollection = {};
        this.request = request;
        this.response = response;
        var postData = "";
        request.on('data', function (chunk) {
            postData += chunk;
        });
        request.on('end', function () {
            if (postData.length != 0) {
                _this.postBody = postData;
            }
        });
        this.uuid = uuid_1.v4();
        this.start = new Date();
        logging_1["default"]("Created transaction " + this.uuid);
    }
    Transaction.prototype.setResponse = function (data) {
        this.responseBody = data;
    };
    Transaction.prototype.setStatus = function (status) {
        this.statusCode = status;
    };
    Transaction.prototype.setHeaders = function (headers) {
        this.headers = headers;
    };
    Transaction.prototype.setDidComplete = function (flag) {
        this.didComplete = flag;
    };
    Transaction.prototype.finalize = function () {
        state_1["default"].finalizeTransaction(this);
        this.end = new Date();
    };
    Transaction.prototype.getUUID = function () {
        return this.uuid;
    };
    Transaction.prototype.attachMetadata = function (metadata) {
        var metadataName = metadata.constructor.name;
        if (typeof this.metadataCollection[metadataName] !== 'undefined') {
            throw new Error('Failed to attach metadata: allready attached');
        }
        this.metadataCollection[metadataName] = metadata;
    };
    Transaction.prototype.serialize = function () {
        return {
            didComplete: this.didComplete,
            request: {
                fresh: this.request.fresh,
                host: this.request.hostname,
                ip: this.request.ip,
                ips: this.request.ips,
                method: this.request.method,
                originalUrl: this.request.originalUrl,
                params: this.request.params,
                query: this.request.query,
                headers: this.request.headers,
                body: this.postBody
            },
            response: {
                code: this.statusCode,
                headers: typeof this.headers === "undefined" ? {} : this.headers,
                body: this.responseBody
            },
            metadata: this.metadataCollection,
            start: this.start,
            end: this.end
        };
    };
    Transaction.prototype.serializeSummary = function () {
        return {
            didComplete: this.didComplete,
            uuid: this.uuid,
            url: this.request.originalUrl,
            method: this.request.method,
            code: this.statusCode,
            start: this.start,
            end: this.end
        };
    };
    return Transaction;
}());
exports["default"] = Transaction;
