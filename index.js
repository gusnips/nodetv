var koa=require('koa')
var path=require('path')
var app=koa()

require('koa-ejs')(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layouts/index'
});
app.use(require('koa-error-ejs')())

//routes first then file stream
app.use(require('./configs/routes.js'))
//if no route found, it's a file
app.use(require('./middlewares/stream-file.js'))


if(!module.parent){
    app.listen(3000,function(){
        console.log('app running on port 3000')
    })
} else {
    module.exports=app
}
