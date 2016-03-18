var EventEmitter=require('events').EventEmitter;
var getMessages=function(){
var msgEmitter=new EventEmitter();
setTimeout(function(){
msgEmitter.emit('begin');
msgEmitter.emit('message','node.js');
msgEmitter.emit('message','express.js');
msgEmitter.emit('end',2);
},5000);
return msgEmitter;
};
var results=getMessages();
results.on('message',function(msg){
console.log(" Received Message -> "+msg);
});
results.on('end',function(num){
console.log(" Got "+num+"message events");
});
results.on('begin',function(){
console.log("Begin...");
});
console.log("Waiting for emitted messages.....");