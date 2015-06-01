var extend=require('../modules/extend')
var config=module.exports={
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'root',
  dbname: 'nodetv'
}
try{
    var local=require('./db-local.js')
    extend(config, local)
}catch(e){
}
module.exports=config;
