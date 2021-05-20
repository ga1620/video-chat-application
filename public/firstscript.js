
function createRoomId () {
  const roomText = document.getElementById('roomid')
  var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
      roomText.innerHTML=uuid;
      roomText.style.display='flex';
}

function getSecondPage(event){
  event.preventDefault()
   const name = document.getElementById('namefirst').value;
   window.sessionStorage.setItem('name',name);
   const roomid = document.getElementById('roomidfirst').value;
   window.location.href=`${roomid}`;
}

