try{
    module.exports=require('./db-local.js');
}catch(e){
    module.exports={
      host: 'localhost',
      port: 2424,
      username: 'root',
      password: 'root',
      dbname: 'nodetv'
    }
}
