var server=require('../modules/db-server')
var config=require('../configs/db')
if(!config.dbname)
    throw new Error('Database dbname not defined')
var db=server.use(config.dbname)
module.exports=db;
