var db=require('../modules/db');
module.exports=function *(next){
    console.log('videos',this.params, next);
    var controller=this;
    var videos=yield db.select()
        .from('Video')
        .where({status: true})
        .limit(12)
        .all();
    yield controller.render('videos',{
        'videos': videos,
    });
    
}
