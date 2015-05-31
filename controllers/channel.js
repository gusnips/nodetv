var db=require('../modules/db');
module.exports=function *(next){
    console.log('channel',this.params);
    yield this.render('channel');
}
