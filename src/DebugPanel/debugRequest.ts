import express from 'express';

import Metadata from './metadata';

import Transaction from './transaction';

type ExtraDebugFields = {
  debugMetadata: { [key: string]: Metadata };
  transaction: Transaction;
};

type DebugRequest = express.Response | ExtraDebugFields;

export default DebugRequest;
