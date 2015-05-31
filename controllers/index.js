module.exports=function *(next){
    console.log('index',this.params);
    yield this.render('index');
    if(next)
        yield next;
}
