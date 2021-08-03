import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import DebugState from './state';

import Metadata from './metadata';

import log from './logging';

type MetadataList = {
  [key: string]: Metadata;
};

class Transaction {
  private request: express.Request;
  private response: express.Response;
  private uuid: string;
  // Response info
  private responseBody: any;
  private statusCode: number = 0; // If none of our hooks catch it, it was probably a 404.
  private headers: any;
  private postBody: any;
  private didComplete: boolean = false;

  private start;
  private end;

  private metadataCollection: MetadataList = {};

  constructor(request, response) {
    this.request = request;
    this.response = response;

    let postData = ""
    request.on('data', (chunk) => {
      postData += chunk
    })
    request.on('end', () => {
      if(postData.length != 0) {
        this.postBody = postData
      }
    })

    this.uuid = uuidv4();
    this.start = new Date();

    log(`Created transaction ${this.uuid}`);
  }

  setResponse(data: any) {
    this.responseBody = data;
  }

  setStatus(status: number) {
    this.statusCode = status;
  }

  setHeaders(headers: any) {
    this.headers = headers;
  }

  setDidComplete(flag: boolean) {
    this.didComplete = flag;
  }

  finalize() {
    DebugState.finalizeTransaction(this);
    this.end = new Date();
  }

  getUUID(): string {
    return this.uuid;
  }

  attachMetadata(metadata: Metadata) {
    const metadataName = metadata.constructor.name;

    if (typeof this.metadataCollection[metadataName] !== 'undefined') {
      throw new Error('Failed to attach metadata: allready attached');
    }

    this.metadataCollection[metadataName] = metadata;
  }

  serialize() {
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
      end: this.end,
    };
  }

  serializeSummary() {
    return {
      didComplete: this.didComplete,
      uuid: this.uuid,
      url: this.request.originalUrl,
      method: this.request.method,
      code: this.statusCode,

      start: this.start,
      end: this.end,
    };
  }
}

export default Transaction;
