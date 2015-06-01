/* general configs */
var path=require('path')
var extend=require('../modules/extend')

var config={
    sessionKeys: ['NodeTVSession'],
    ejs: {
        root: path.join(__dirname, '..', 'views'),
        layout: '/layouts/index',
    }
}
try{
    var local=require('./general-local.js')
    module.exports=extend({},config, local)
}catch(e){
    module.exports=config;
}
