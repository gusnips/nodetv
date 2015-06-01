$(function(){
    window.displayMessage = (function displayMessageInit() {
        var node = document.getElementById('message')
        return function displayMessage(message, type, hideTime) {
            if(!type)
                type='info'
            node.innerHTML=message
            node.className='alert alert-'+type
            node.style.display='block'
            if(hideTime){
                setTimeout(function(){
                    node.style.display='none'
                },hideTime)
            }
        };
    }());
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if(!URL)
        return displayMessage('Your browser is not <a href="http://caniuse.com/bloburls">supported</a>!', 'danger')
    if(!navigator.getUserMedia)
        return displayMessage('Your browser is not <a href="http://caniuse.com/getUserMedia">supported</a>!', 'danger')
    if(!window.File || !window.FileReader)
        return displayMessage('Your browser is not <a href="http://caniuse.com/file">supported</a>', 'danger');
    if(!window.Blob)
        return displayMessage('Your browser is not <a href="http://caniuse.com/blobbuilder">supported</a>', 'danger');
});
