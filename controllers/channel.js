var db=require('../modules/db')
var config=require('../configs/general');
module.exports=function *(next){
    console.log('video',this.params);
    var channel=yield db.select()
        .from('User')
        .where({username: this.params.username})
        .limit(1)
        .one();
    if(!channel){
        //for testing purposes, otherwise throw 404 page
        channel={
            username: this.params.username
        }
    }
    user={
        username: this.session.id
    }
    yield this.render('channel',{
        'user': user,
        'config': config.peer,
        'channel': channel,
    });
}
