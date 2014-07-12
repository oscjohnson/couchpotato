jQuery(document).ready(function($) {
//Fastclick.js
window.addEventListener('load', function(){

	//Android 2.2 needs FastClick to be instantiated before the other listeners so that the stopImmediatePropagation hack can work.
	FastClick.attach(document.body);
},false);

var shake =true; 
var repeater;

function debounce(a,b,c){var d;return function(){var e=this,f=arguments;clearTimeout(d),d=setTimeout(function(){d=null,c||a.apply(e,f)},b),c&&!d&&a.apply(e,f)}}


function getPlayingtrack(){
	$.ajax({
		url:'/track',
		success: function(data){
			$('#playing-track').html(data.track +" - "+ data.artist);
			if(data.status == "playing"){
				$('#playpause').addClass("playing");
				playpause('notplaying');

			}else{
				playpause('playing');

			}

		}
	});
	//repeater= window.setTimeout(getPlayingtrack(), 1000*2);
}






		var socket = io.connect('http://localhost:1111');

		socket.on('entrance', function(data){
			// $('#chat_log').append(data.message);
			console.log(data.message)
		});


		socket.on('click', function(data){
			// $('#chat_log').append(data.message);
			console.log(data.message)
		});

		


	




	function playpause(status){
		if(status== "playing"){
			$('#play').show();
			$('#pause').hide();
		}else{
			$('#play').hide();
			$('#pause').show();
		}
	}
	function togglePausePlay(){
		$('#playpause').toggleClass('playing');
		if($('#playpause').hasClass('playing') ){
			console.log('playing')
			playpause("notplaying");
		}else{
			console.log('not playing')
			playpause("playing")
		}
	}
	//$('#playing-track').html('Foo Fighters - Wheels <br/> Greatest Hits')

	$('#playpause').on('click', function(){
		$.ajax({url: "/command/playpause"})
		togglePausePlay();
	});

	$('#next').on('click', function(){
		$.ajax({url: "/command/next"})
		getPlayingtrack();

	});

	$('#prev').on('click', function(){
		$.ajax({url: "/command/prev"})
		getPlayingtrack();

	});

	$('input[name="shake"]').on('click', function(e){
		var a =document.querySelector('input[name="shake"]').checked;
		shake = (a) ? true : false;
		console.log(shake)

	})

	var $search = $('#search');

	$('#search').on('keyup', debounce(ajaxcall, 700, false));

	function ajaxcall(){

		var q = $search.val();
		$.ajax({
			url: 'http://ws.spotify.com/search/1/track.json?q='+ q,
			success: function(data){

				$('#search-suggestions ul').empty();

				var infostring="";	
				for (var i = 0; i < 5; i++) {


					infostring+= '<li data-link="'+
						data.tracks[i].href+'">'+
						data.tracks[i].name+'</li>'
				};

				$('#search-suggestions ul').append(infostring);
			}
		});
	}



	$('#search-suggestions ul').on('click', 'li', function(){
		$.ajax({
			url:'command/play',

			data: {link :$(this).data('link')}
		})
		console.log('click')
	});

	$(window).on('devicemotion',function(e){

		checkForAction(e.originalEvent);


		// console.log(x,y,z)

	})


});




	window.addEventListener('shake', shakeEventDidOccur, false);

	//fyfubanana

	var message=  document.querySelector('#message');

	var topEl = document.querySelector('#top');
	//function to call when shake occurs
	var request = new XMLHttpRequest();
	function shakeEventDidOccur () {
		if(shake){
	    	request.open('get', '/command/playpause', true);
	    	request.send();
	   }
	}
	var topVar = { x: 0, y: 0, z: 0};

	var chilloutDawg = false;
var i = 0;


function checkForAction(e){
		var x = e.accelerationIncludingGravity.x
		var y = e.accelerationIncludingGravity.y
		var z = e.accelerationIncludingGravity.z

		// console.log(x,y,z)
}

/*
	window.ondevicemotion = function(event) {  
	    var accelerationX = event.accelerationIncludingGravity.x;  
	    var accelerationY = event.accelerationIncludingGravity.y;  
	    var accelerationZ = event.accelerationIncludingGravity.z; 
	    
	    if(i == 0)
	    	console.log(event);
	    // message.innerHTML = accelerationX.toPrecision(2) + ", " + accelerationX.toPrecision(2) + ", " + accelerationZ.toPrecision(2);

	    i = 1000;

	    // console.log(accelerationX);
	    if(accelerationX > 16 && !chilloutDawg) {
	    	  	request.open('get', '/command/prev', true);
    			request.send();

    			message.innerHTML = 'PREV';

    			topEl.innerHTML = accelerationX.toPrecision(2) + ", " + accelerationY.toPrecision(2) + ", " + accelerationZ.toPrecision(2);

	    }
	    else if(accelerationX < -10 && !chilloutDawg) {
	    	  	request.open('get', '/command/next', true);
    			request.send();

    			message.innerHTML = 'NEXT';

    			topEl.innerHTML = accelerationX.toPrecision(2) + ", " + accelerationY.toPrecision(2) + ", " + accelerationZ.toPrecision(2);
	    }

	    if(accelerationX > 20 || accelerationX < -10) {
	    	console.log('cHILLD');
	    	chilloutDawg = true;
	    	setTimeout(function(){
	    		chilloutDawg = false;
	    	}, 500);
	    }

	    topVar.x = (accelerationX > topVar.x) ? accelerationX : topVar.x;
	    topVar.y = (accelerationY > topVar.y) ? accelerationY : topVar.y;
	    topVar.z = (accelerationZ > topVar.z) ? accelerationZ : topVar.z;



	    // topEl.innerHTML = topVar.x + ", " + topVar.y + ", " + topVar.z;

	} 
*/