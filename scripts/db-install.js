var server=require('../modules/db-server')
var config=require('../configs/db')
var fs=require('fs')

if(!config.dbname)
    throw new Error('Database dbname not defined')

server.create({
    name: config.dbname,
    type: 'graph',
    storage: 'plocal'
}).then(function(db){
    console.log('Created the database "'+config.dbname+'"')
    afterDbCreated(db)
}).error(function(e){
    console.log('Database "'+config.dbname+'" exists')
    var db=server.use(config.dbname);
    afterDbCreated(db);
});

function afterDbCreated(db){
    createOptionsFile(db)
    createClasses(db)
}

function createClasses(db){
    _createDbClass(db, 'User', 'V', {
        'username':'String',
        'email':'String'
    },{
        'email':'unique'
    })
    _createDbClass(db, 'Video', 'V', {
        'name': 'String',
        'location':'String',
        'status': 'Boolean',
    },{
        'location':'unique'
    })
}

function _createDbClass(db, className, extendsName, properties, indexes){
    var fullName=(extendsName ? className+'.'+extendsName : className);
    db.class.create(className, extendsName).then(function(Class){
        console.log('Db class "'+fullName+'" created')
        _afterClassCreated(Class, properties, indexes)
    }).error(function(e){
        db.class.get(className).then(function(Class){
            console.log('Db class "'+fullName+'" exists')
            _afterClassCreated(Class, properties, indexes)
        }).error(function(e){
            throw e
        })
    })
}

function _afterClassCreated(Class, properties, indexes){
    if(properties)
        _createClassProperties(Class, properties)
    if(indexes)
        _createClassIndexes(Class, indexes)
    Class.db.delete('VERTEX').all().then(function(count){
        console.log('deleted '+count+' videos');
        Class.db.insert().into('Video').set({
            location: 'http://cdn.bem.tv/stream/soccer5/playlist.m3u8',
            status: true,
        }).one().then(function (video) {
          console.log('Video created', video);
        });
    });
}
/**
 * properties format 'propertyName':'Type',
 */
function _createClassProperties(Class, properties){
    for(var x in properties){
        Class.property.create({
            name: x,
            type: properties[x]
        }).then(function(){
            console.log('Property "'+Class.name+'.'+x+'" created.')
        }).error(function(e){
            console.log('Property "'+Class.name+'.'+x+'" exists.')
        })
    }
}
/**
 * indexes format 'property':'Type',
 */
function _createClassIndexes(Class, indexes){
    for(var x in indexes){
        var indexName=x
        if(!x.indexOf('.'))
            indexName=Class.name+'.'+x
        Class.db.index.create({
            name: indexName,
            type: indexes[x]
        }).then(function(index){
            console.log('Index "'+indexName+'" created')
        }).error(function(e){
            console.log('Index "'+indexName+'" exists')
        })
    }
}

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
