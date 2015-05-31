var db=require('../modules/db')
module.exports=function *(next){
    console.log('video',this.params);
    var video=yield db.select()
        .from('Video')
        .where({status: true})
        .limit(1)
        .one();
    var location=video ? [video.location] : ['http://cdn.bem.tv/stream/soccer5/playlist.m3u8'];
    yield this.render('video',{
        'sources': location,
    });
}
