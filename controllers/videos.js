
module.exports=function *(next){
    console.log('videos',this.params);
    yield this.render('videos');
}
