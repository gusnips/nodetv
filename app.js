var koa=require('koa')
var session=require('koa-session')
var config=require('./configs/general')
var app=koa()

app.keys = config.sessionKeys;
app.use(session(app));

require('koa-ejs')(app, config.ejs);
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
