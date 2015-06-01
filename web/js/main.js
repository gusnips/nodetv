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
});
