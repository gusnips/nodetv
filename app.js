var koa=require('koa')
var session=require('koa-session')
var config=require('./configs/general')
var app=koa()

//session
app.keys = config.session.keys
app.use(session(app))
app.use(function*(next){
    var session=this.session
    if(!session.id){
        var buf=yield require('crypto-promise').randomBytes(48)
        session.id=buf.toString('hex')
    }
    yield next
})

require('koa-ejs')(app, config.ejs)
app.use(require('koa-error-ejs')(config.error))

//routes first then file stream
app.use(require('./configs/routes.js'))
//if no route found, it's a file
app.use(require('./middlewares/stream-file.js'))


if(!module.parent){
    app.listen(config.server.port,function(){
        console.log('app running on port ', config.server.port)
    })
} else {
    module.exports=app
}
