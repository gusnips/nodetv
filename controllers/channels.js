var db=require('../modules/db');
module.exports=function *(next){
    console.log('channels',this.params);
    yield this.render('channels');
}
