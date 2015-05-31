var router=require('koa-router')()
// try GET /app.js
var routes={
    '/':'../controllers/index',
    '/videos': '../controllers/videos',
    '/video/:id': '../controllers/video',
    '/channels': '../controllers/channels',
    '/channel/:id': '../controllers/channel'
}
for(var x in routes)
    router.all(x, require(routes[x]))

module.exports=router.routes();
