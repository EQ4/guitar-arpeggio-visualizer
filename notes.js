var E = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E']; 
var A = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A'];
var D = ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'];
var G = ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G'];
var B = ['B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
var strings = [E, B, G, D, A, E];

var paper = new Raphael(document.id("fretboard"), 1300, 400);
var GTR = {};


GTR.drawStrings = function(){
	var numStrings = strings.length;
		currentString = i + 1;
	for(i = 0; i < numStrings; i++){
		var position = (i * 50) + 110;
		paper.rect(100, position, 1200, 5).attr({fill: "#dddddd"}); // high E
	}
}

GTR.drawFrets = function(){
	for(i = 0; i < 24; i++){
		var currentFret = i + 1;
		paper.rect((currentFret * 50) + 100, 100, 5, 275).attr({fill: "#000000"}); // 1st fret
	}
}

GTR.drawMarkers = function(){
	paper.set(
		paper.circle(225, 237, 10, 10),
		paper.circle(325, 237, 10, 10),
		paper.circle(425, 237, 10, 10),
		paper.circle(525, 237, 10, 10),
		paper.circle(675, 137, 10, 10),
		paper.circle(675, 337, 10, 10),
		paper.circle(825, 237, 10, 10),
		paper.circle(925, 237, 10, 10),
		paper.circle(1025, 237, 10, 10),
		paper.circle(1125, 237, 10, 10),
		paper.circle(1275, 137, 10, 10),
		paper.circle(1275, 337, 10, 10)
	).attr({fill: "#d00"});
}

GTR.buildGuitar = function(){
	paper.rect(100, 100, 1200, 275).attr({fill: "#87600C"}); // fretboard
	
	GTR.drawFrets();
	GTR.drawMarkers();
	GTR.drawStrings();
}

window.addEvent('load', function(){
	
	GTR.buildGuitar();
	
	/**
	 * Place Markers
	 */
	var re = /G(?!#)|B(?!#)|D(?!#)/g;
	var numStrings = strings.length;
	var i = 0;
	strings.each(function(item, index){
	    item.each(function(item, index){
		    if(re.test(item)){
		    	var position = parseInt(index),
	    			theString = (i * 50) + 112;
		    	position = (position * 50) + 75;
		    	paper.circle(position, theString, 15, 15).attr({fill: "#ffffff"});
		    }
		});
		i++;
	});

	
});