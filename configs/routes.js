var router=require('koa-router')()
// try GET /app.js
var routes={
    '/':'../controllers/index',
    '/channels': '../controllers/channels',
    '/channel/:username': '../controllers/channel',
    '/stream': '../controllers/stream'
}
for(var x in routes)
    router.all(x, require(routes[x]))

module.exports=router.routes();
