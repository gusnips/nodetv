var db=require('../modules/db');
module.exports=function *(next){
    console.log('videos',this.params, next);
    var controller=this;
    var channels=yield db.select()
        .from('User')
        .where({status: true})
        .limit(12)
        .all();
    yield controller.render('channels',{
        'channels': channels,
    });

}
