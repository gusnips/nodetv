/* general configs */
var path=require('path')
var extend=require('../modules/extend')

var config={
    server: {
        port: 3000,
    },
    session: {
        keys: ['NodeTVSession'],
    },
    ejs: {
        root: path.join(__dirname, '..', 'views'),
        layout: '/layouts/index',
    },
    error:{
      view: 'error/error', //(optional)
      layout: 'layouts/error', //(optional)
      custom: { //(optional)
            //401: 'error/login',
            //403: 'error/forbidden',
            //404: 'error/not-found',
            //500: 'error/sorry'
        }
    },
    peer:{
        key: '6b4d8479-2e79-4e10-ac70-c69037d38b4e',
        //host: '0.peerjs.com',
        //port: '80',
        //secure: false,
        //turn: false,
        //path: '/',
        debug: 0,
        //config: {
        //    'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }]
        //},
    },
}
try{
    var local=require('./general-local.js')
    extend(config, local)
}catch(e){
}
module.exports=config;
