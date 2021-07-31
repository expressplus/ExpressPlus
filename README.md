# ExpressJs+
 All you need tool in one web framework for [NodeJs](http://nodejs.org).

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

