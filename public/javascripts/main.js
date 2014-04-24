//Fastclick.js

window.addEventListener('load', function(){

	//Android 2.2 needs FastClick to be instantiated before the other listeners so that the stopImmediatePropagation hack can work.
	FastClick.attach(document.body);
},false);

jQuery(document).ready(function() {

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
	}
	getPlayingtrack();

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

});




	 window.addEventListener('shake', shakeEventDidOccur, false);

	var message=  document.querySelector('#message');

	var topEl = document.querySelector('#top');
	var request = new XMLHttpRequest();
	//function to call when shake occurs
	function shakeEventDidOccur () {

	    //put your own code here etc.
	    	console.log('shaking');



	    	request.open('get', '/command/playpause', true);
	    	request.send();
	}
	var topVar = { x: 0, y: 0, z: 0};

	var chilloutDawg = false;
var i = 0;
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