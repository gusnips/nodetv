
module.exports=function *(next){
    console.log('channels',this.params);
    yield this.render('channels');
    if(next)
        yield next;
}
