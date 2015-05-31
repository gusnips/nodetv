var router=require('koa-router')()
// try GET /app.js
router
    .get('/', require('../controllers/index'))
    .get('/videos', require('../controllers/videos'))
    .get('/video/:id', require('../controllers/video'))
    .get('/channels', require('../controllers/channels'))
    .get('/channel/:id', require('../controllers/channel'));

module.exports=router.routes();
