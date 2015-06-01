var server=require('../modules/db-server')
var config=require('../configs/db')
var async=require('../modules/async')
var fs=require('fs')

if(!config.dbname)
    throw new Error('Database dbname not defined')
/**
 * properties format 'propertyName':'Type',
 * indexes format 'property':'Type',
 */
var _createDbClass = async(function*(db, className, extendsName, properties, indexes){
    var fullName=(extendsName ? className+'.'+extendsName : className);
    var deleted=yield db.class.drop(className)
    if(deleted)
        console.log('Class "'+fullName+'" deleted')
    var Class=yield db.class.create(className, extendsName).error(function(e){
        throw e
    })
    console.log('Class "'+fullName+'" created')
    if(properties){
        for(var x in properties){
            yield Class.property.create({
                name: x,
                type: properties[x]
            }).error(function(e){
                console.log('Property "'+Class.name+'.'+x+'" exists.')
            })
            console.log('Property "'+Class.name+'.'+x+'" created.')
        }
    }
    if(indexes){
        for(var x in indexes){
            yield Class.db.index.create({
                name: Class.name+'.'+x,
                type: indexes[x]
            }).error(function(e){
                console.log('Index "'+Class.name+'.'+x+'" exists')
            })
            console.log('Index "'+Class.name+'.'+x+'" created')
        }
    }
});
var run = async(function* (){
    var db=yield server.create({
        name: config.dbname,
        type: 'graph',
        storage: 'plocal'
    }).error(function(e){
        console.log('Database "'+config.dbname+'" exists')
    });
    if(db)
        console.log('Created the database "'+config.dbname+'"')
    else
        db=server.use(config.dbname)

    _createDbClass(db, 'User', 'V', {
        'username':'String',
        'email':'String',
        'created': 'Datetime'
    },{
        'email':'unique'
    })
    _createDbClass(db, 'Video', 'V', {
        'name': 'String',
        'key':'String',
        'status': 'Boolean',
        'created': 'Datetime'
    },{
        'key':'unique'
    })
    createOptionsFile(db)
})();

function createOptionsFile(){
    var location=__dirname+'/../oriento.opts';
    if(fs.existsSync(location)){
        return console.log('Options file for oriento "'+location+'" exists')
    }
    var contents='--host='+(config.host || 'localhost')+
'--port='+(config.port || '2424')+
'--dbname='+config.dbname+
'--username='+(config.username || 'root')+
'--password='+db.password;
    fs.writeFile(location,contents,function(err){
        if(err)
            throw err
        console.log('Created an options file for oriento "'+location+'"')
    })
}
