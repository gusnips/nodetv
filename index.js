var koa=require('koa');
var router=require('koa-router')();
var fs=require('fs');
var path=require('path');
var extname=path.extname;
var error= require('koa-error-ejs');

var app=module.exports=koa();

require('koa-ejs')(app, {
  root: path.join(__dirname, 'views'),
  layout: false
});

app.use(error());

// try GET /app.js
router
    .get('/', function *(next){
        this.body='Hello World!';
        console.log(next);
    })
    .get('/videos', function *(next){
        yield this.render('index');
    })
    .get('/video/:id', function *(next){
        yield this.render('index');
    })
    .get('/channels', function *(next){
        yield this.render('index');
    })
    .get('/channel/:id', function *(next){
        yield this.render('index');
    });


app.use(router.routes())
    .use(router.allowedMethods());

app.use(streamFile);


if(!module.parent){
    app.listen(3000);
}

/**
 * thunkify stat
 */

function * streamFile(){
    var path=__dirname + this.path;
    var fstat=yield stat(path);

    if(fstat.isFile()){
        this.type=extname(path);
        this.body=fs.createReadStream(path);
    }
 }
function stat(file){
    return function(done){
        fs.stat(file, done);
    }
}
