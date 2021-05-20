const socket = io('/')
 const videoGrid = document.getElementById('video-grid')
 const chatdiv = document.getElementById('chatdiv');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');

 const myPeer = new Peer()
 const myVideo = document.createElement('video')

 myVideo.muted = true
 const peers = {}
 navigator.mediaDevices.getUserMedia({
   video: true,
   audio: true
 }).then(stream => {
   addVideoStream(myVideo, stream)

   myPeer.on('call', call => {
     call.answer(stream)
     const video = document.createElement('video')
     call.on('stream', userVideoStream => {
       addVideoStream(video, userVideoStream)
     })
   })

   socket.on('user-connected', userId => {
     console.log("User Connected " + userId)
     connectToNewUser(userId, stream)
   })
 })

 socket.on('user-disconnected', userId => {
   if (peers[userId]) peers[userId].close()
 })


 myPeer.on('open', id => {
   socket.emit('join-room', ROOM_ID, id)
 })

 socket.on('receive',(data) => {
  messageAppend({message:data.message,name:data.name},"left");
})


form.addEventListener('submit',(e) => {
  e.preventDefault();
  const name = window.sessionStorage.getItem('name');
  const messageinput = messageInput.value;
  messageAppend({message:messageinput,name:"You"},"right");
  socket.emit('send',{message:messageinput,name:name});
  messageInput.value='';
})

function messageAppend(message,position) {
  const messagediv = document.createElement('div');
  const spam = document.createElement('h5');
  spam.classList.add('name');
  spam.innerHTML=message.name;
  messagediv.innerHTML=message.message;
  messagediv.classList.add('message');
  messagediv.classList.add(position);
  messagediv.append(spam);
  chatdiv.append(messagediv);
}


 function connectToNewUser(userId, stream) {
   const call = myPeer.call(userId, stream)
   const video = document.createElement('video')
   call.on('stream', userVideoStream => {
     addVideoStream(video, userVideoStream)
   })
   call.on('close', () => {
     video.remove()
   })

   peers[userId] = call
 }

 function addVideoStream(video, stream) {
   video.srcObject = stream
   video.addEventListener('loadedmetadata', () => {
     video.play()
   })
   videoGrid.append(video)
 }

var modal = document.getElementById("myModal");


var button = document.getElementById("bottomnav");
button.onclick = function(){
  modal.style.display = "flex";
}

 
var span = document.getElementsByClassName("close")[0];


span.onclick = function() {
  modal.style.display = "none";
}
