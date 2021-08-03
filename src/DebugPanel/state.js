"use strict";
exports.__esModule = true;
var express_1 = require("express");
var transaction_1 = require("./transaction");
var State = /** @class */ (function () {
    function State() {
        this.transactions = {};
        this.pendingTransactions = {};
    }
    State.prototype.registerTransaction = function (req, res) {
        var transaction = new transaction_1["default"](req, res);
        this.pendingTransactions[transaction.getUUID()] = transaction;
        return transaction;
    };
    State.prototype.finalizeTransaction = function (transaction) {
        if (typeof this.pendingTransactions[transaction.getUUID()] !== 'undefined') {
            if (typeof this.transactions[transaction.getUUID()] === 'undefined') {
                this.transactions[transaction.getUUID()] = transaction;
                delete this.pendingTransactions[transaction.getUUID()];
            }
            else {
                throw new Error('Internal state error: tried to finalize transaction that is already finalized');
            }
        }
        else {
            throw new Error('Internal state error: tried to finalize transaction that is already finalized');
        }
    };
    State.prototype.getRestApiRouter = function () {
        var _this = this;
        var route = express_1.Router();
        route.get('/:uuid', function (req, res) {
            var uuid = req.params.uuid;
            if (typeof _this.transactions[uuid] !== 'undefined') {
                res.json(_this.transactions[uuid].serialize());
            }
            else {
                res.status(404).json({ success: false,
                    msg: 'Not found' });
            }
        });
        route.get('/', function (req, res) {
            var summary = [];
            for (var obj in _this.transactions) {
                summary.push(_this.transactions[obj].serializeSummary());
            }
            res.json(summary.reverse());
        });
        return route;
    };
    return State;
}());
var DebugState = new State();
exports["default"] = DebugState;
