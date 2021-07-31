# ExpressJs+


## Usage

Install
```bash
npm install @ulvimemmeedov/expressjsplus
```

Install globally
```bash
npm install -g @ulvimemmeedov/expressjsplus
```

## Create Router And Server
ES5
```javascript
const { Service }  = require('@ulvimemmeedov/expressjsplus');

Service.get('/',(request,response) => response.json("Hello Express.Js Plus")).listen(2000);
```
ES6
```javascript
import { Service } from '@ulvimemmeedov/expressjsplus';

Service.get('/',(request,response) => response.json("Hello Express.Js Plus")).listen(2000);
```
## Router

```javascript
import { Service , Router}  from '@ulvimemmeedov/expressjsplus';

Router.get("/",(request,response) => response.json("Hello Express.Js Plus");

Service.use(Router).listen(port,calback)
