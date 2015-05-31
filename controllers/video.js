
module.exports=function *(next){
    console.log('video',this.params);
    yield this.render('index');
}
