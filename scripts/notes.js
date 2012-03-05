var E = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E']; 
var A = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A'];
var D = ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'];
var G = ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G'];
var B = ['B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
var strings = [E, B, G, D, A, E];

var paper = new Raphael(document.id("fretboard"), 1300, 300);
var GTR = {};


GTR.drawStrings = function(){
	var numStrings = strings.length;
		currentString = i + 1;
	for(i = 0; i < numStrings; i++){
		var position = (i * 50) + 20;
		paper.rect(50, position, 1200, 5).attr({fill: "#dddddd"}); // high E
	}
}

GTR.drawFrets = function(){
	for(i = 0; i < 24; i++){
		var currentFret = i + 1;
		paper.rect((currentFret * 50) + 50, 10, 5, 275).attr({fill: "#000000"}); // 1st fret
	}
}

GTR.drawMarkers = function(){
	paper.set(
		paper.circle(175, 147, 10, 10),
		paper.circle(275, 147, 10, 10),
		paper.circle(375, 147, 10, 10),
		paper.circle(475, 147, 10, 10),
		paper.circle(625, 47, 10, 10),
		paper.circle(625, 247, 10, 10),
		paper.circle(775, 147, 10, 10),
		paper.circle(875, 147, 10, 10),
		paper.circle(975, 147, 10, 10),
		paper.circle(1075, 147, 10, 10),
		paper.circle(1225, 47, 10, 10),
		paper.circle(1225, 247, 10, 10)
	).attr({fill: "#d00"});
}

GTR.buildGuitar = function(){
	paper.rect(50, 10, 1200, 275).attr({fill: "#87600C"}); // fretboard
	
	GTR.drawFrets();
	GTR.drawMarkers();
	GTR.drawStrings();
}

window.addEvent('load', function(){
	
	GTR.buildGuitar();
	
	var numStrings = strings.length;
	//var re = /A(?!#)|C(?!#)|E(?!#)/;
	var st = paper.set();
	/**
	 * Place Markers
	 */
	$('diagram').addEvent('change', function(){
	    var i = 0;
	    st.remove();
	    $$('input[name=notes]:checked').map(function(el){
			strings.each(function(item, index){
			    item.each(function(item, index){
			    	var re = el.value;
			    	re = '/' + re + '(?!#)/';
			    	console.log(re);
				    if(re.test(item)){
				    	var position = parseInt(index),
			    			theString = (i * 50) + 22;
				    	position = (position * 50) + 25;
				    	st.push(paper.circle(position, theString, 15, 15).attr({fill: "#ffffff"}));
				    }
				});
				i++;
			});
	    });

	});
});