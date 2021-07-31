# ExpressJs+
 All you need tool in one web framework for [NodeJs](http://nodejs.org).
##
[![npm version](https://badge.fury.io/js/%40ulvimemmeedov%2Fexpressjsplus.svg)](https://badge.fury.io/js/%40ulvimemmeedov%2Fexpressjsplus)
  <a href="https://www.npmjs.com/package/@ulvimemmeedov/expressjsplus"><img src="https://img.shields.io/npm/dm/@ulvimemmeedov/expressjsplus" alt="npm downloads"></a>
## Usage

Install
```bash
npm install @ulvimemmeedov/expressjsplus
```

Install globally
```bash
npm install -g @ulvimemmeedov/expressjsplus
```

## Start the server

```bash
$ npm start
```

## Create Router And Server
ES5
```js
const { Service }  = require('@ulvimemmeedov/expressjsplus');

Service.get('/',(request,response) => response.json("Hello Express.Js Plus")).listen(2000);
```
ES6
```js
import { Service } from '@ulvimemmeedov/expressjsplus';

Service.get('/',(request,response) => response.json("Hello Express.Js Plus")).listen(2000);
```
## Router

```js
import { Service , Router}  from '@ulvimemmeedov/expressjsplus';

Router.get("/",(request,response) => response.json("Hello Express.Js Plus");

Service.use(Router).listen(port,calback)
```
## <a target="_blank" href="https://expressplus.github.io/doc.html">Docs</a>
