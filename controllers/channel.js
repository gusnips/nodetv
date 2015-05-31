
module.exports=function *(next){
    console.log('channel',this.params);
    yield this.render('index');
}
