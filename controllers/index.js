var db=require('../modules/db');
module.exports=function *(next){
    console.log('index',this.params);
    yield this.render('index');
}
