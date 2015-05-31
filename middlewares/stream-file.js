var fs=require('fs')
var path=require('path')
var extname=path.extname

module.exports=function * streamFile(){
    var fullpath=path.join(__dirname, '../web', this.path)
    var fstat=yield stat(fullpath)

    if(fstat.isFile()){
        console.log('serving '+fullpath)
        this.type=extname(fullpath)
        this.body=fs.createReadStream(fullpath)
    }
}

/**
 * thunkify stat
 */
function stat(file){
    return function(done){
        fs.stat(file, done)
    }
}
