# koa-mobile-agent
A middleware for koa to map the mobile route with user-agent.


## Installation

```js
$ npm install koa-mobile-agent
```

## Example

```js
const agent = require('koa-mobile-agent');
const koa = require('koa');
const app = koa();

app.use(agent({
    status: 301,  //default
    routes: [{
        path: '/',
        target: 'http://m.example.com/'
    }, {
        path: '/list/',
        target: 'http://m.example.com/list/'
    }]
}));
```
## License

  MIT