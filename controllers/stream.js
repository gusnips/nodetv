var db=require('../modules/db');
var config=require('../configs/general');
module.exports=function *(next){
    console.log('stream',this.params);
    //for testing purposes, later load user info from db
    var user={
        username: 'gusnips'
    }
    yield this.render('stream',{
        config: config.peer,
        user: user,
    });
}
