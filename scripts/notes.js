/**
 * @author Ethan Gardner
 * 
 */

var paper = new Raphael(document.id("fretboard"), 1300, 300);

/**
 * Set up a GTR object to be used for namespacing 
 * @see http://www.ethangardner.com/articles/javascript-namespace-strategy-for-large-applications/
 * for more information.
 */  
var GTR = {};

/**
 * An array of all the notes on a guitar with 24 frets.
 * There is one array per string.
 */ 
GTR.strings = [
	['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
	['B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
	['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G'],
	['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
	['A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A'],
	['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E']
];

/**
 * Calculates the position for each string and draws 
 * the string on the canvas 
 */
GTR.drawStrings = function(){
	var numStrings = GTR.strings.length;
		currentString = i + 1;
	for(i = 0; i < numStrings; i++){
		var position = (i * 50) + 20;
		paper.rect(50, position, 1200, 5).attr({fill: "#dddddd"}); // high E
	}
}

/**
 * Similar to the drawStrings function, this calculates the position 
 * for each fret and draws the string on the canvas 
 */
GTR.drawFrets = function(){
	for(i = 0; i < 24; i++){
		var currentFret = i + 1;
		paper.rect((currentFret * 50) + 50, 10, 5, 275).attr({fill: "#000000"}); // 1st fret
	}
}

/**
 * Puts the position markers on the neck at the specified location
 */
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

/**
 * Draws all the components of the guitar in the 
 * order needed to 
 */
GTR.buildGuitar = function(){
	paper.rect(50, 10, 1200, 275).attr({fill: "#87600C"}); // fretboard
	
	GTR.drawFrets();
	GTR.drawMarkers();
	GTR.drawStrings();
}

window.addEvent('load', function(){
	
	GTR.buildGuitar();
	
	var numStrings = GTR.strings.length,
		st = paper.set(); // add the notes from user input to a set so they can be removed easily

	/**
	 * Diagram the notes based on user input
	 */
	$('draw').addEvent('click', function(){
		var i = 0,
			markers = [],
	    	checked = $$('input[name=notes]:checked');
	    
		st.remove(); // remove the notes in the set
	    
	    if(checked.length !== 0){
			checked.map(function(el){
				markers.push(el.value + '(?!#)'); // loop over all checked notes and push into an array
		    });

			markers = markers.join("|"); // convert array to string for use in regex
			markers = new RegExp(markers);
			
			/**
			 * Loop through all strings and then loop through notes
			 * on each string. If a match to the regex is detected,
			 * plot the note on the guitar for each string.
			 */
		    GTR.strings.each(function(item, index){
			    item.each(function(item, index){
				    if(markers.test(item)){
				    	var position = parseInt(index),
			    			theString = (i * 50) + 22;
				    	position = (position * 50) + 25;
				    	st.push(paper.circle(position, theString, 15, 15).attr({fill: "#ffffff"}));
				    }
				});
				i++;
			});
	    } 
	});
	
	/**
	 * Give the user an easy way to clear all notes
	 * and uncheck all boxes.
	 */
	$('reset').addEvent('click', function(){
		st.remove();
		$$('input[name=notes]:checked').set('checked', false);
	});
});