
module.exports=function *(next){
    console.log(next);
    console.log('video',this.params);
    yield this.render('video');
}
