import express from 'express';

import Transaction from './transaction';

type TransactionList = {
  [key: string]: Transaction;
};

class State {
  private transactions: TransactionList = {};

  private pendingTransactions: TransactionList = {};

  registerTransaction(req: express.Request, res: express.Response): Transaction {
    const transaction = new Transaction(req, res);
    this.pendingTransactions[transaction.getUUID()] = transaction;

    return transaction;
  }

  finalizeTransaction(transaction: Transaction) {
    if (typeof this.pendingTransactions[transaction.getUUID()] !== 'undefined') {
      if (typeof this.transactions[transaction.getUUID()] === 'undefined') {
        this.transactions[transaction.getUUID()] = transaction;
        delete this.pendingTransactions[transaction.getUUID()];
      } else {
        throw new Error('Internal state error: tried to finalize transaction that is already finalized');
      }
    } else {
      throw new Error('Internal state error: tried to finalize transaction that is already finalized');
    }
  }

  getRestApiRouter(): express.Router {
    const route = express.Router();
    route.get('/:uuid', (req, res) => {
      const uuid = req.params.uuid;

      if (typeof this.transactions[uuid] !== 'undefined') {
        res.json(this.transactions[uuid].serialize());
      } else {
        res.status(404).json({success:false,
         msg:'Not found'});
      }
    });
    route.get('/', (req, res) => {
      const summary = [];
      for (const obj in this.transactions) {
        summary.push(this.transactions[obj].serializeSummary());
      }
      res.json(summary.reverse());
    });
    return route;
  }
}

const DebugState = new State();

export default DebugState;
