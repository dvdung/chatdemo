var stompClient = null;
var reader;
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}




function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        
        stompClient.subscribe('/topic/greetings', function (greeting) {
        	console.log(greeting);
            showGreeting(JSON.parse(greeting.body).content);
            
           
        }
        
        );
        stompClient.subscribe('/topic/greetingsImg', function (greeting) {
        	console.log(greeting.body.content);
            showGreetingImg(JSON.parse(greeting.body).content);
        }); 
    }
    
    
    );  
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val(),'message':$("#message").val()}));
    sendDataImg("image", reader.result);
}

function showGreeting(message) {
	
    $("#greetings").append("<tr><td>" + message+ "</td></tr>");
    if(message!=null){
    	$("#message").val('');
    }
}

function showGreetingImg(message) {
    if(message!=null){
    	$("#message").val('');
    }
      
    var image = new Image();
    image.src = message;
    image.style.width = '50%';
    image.style.height = 'auto';
    $("#greetings").append(image);
}

function sendImage(){
	
}

function previewImage(){
    var file = document.getElementById("fileinput").files[0];

    var preview = document.getElementById("imgpreview");
    reader = new FileReader();
    
    reader.onloadend = function(){
        preview.src=reader.result;
    };
    
    if(file && file.type.match("image")){
        reader.readAsDataURL(file);
    }else{
        preview.src="";
    }
    
}



function sendDataImg(dataType, dataValue){
    
    stompClient.send("/app/img", {},JSON.stringify({
        "name":$("#name").val(),
    	"type":dataType,
        "data":dataValue
    }));
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() {
    	
    	if($("#name").val()==""){alert("Nhập tên vào !!!");}
    	else{connect();}
    	 });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() {
    	
    	if($("#connect").prop('disabled')==true){sendMessage();}
    	else{alert("Chưa kết nối !!!");}
    	
    	 });


});

