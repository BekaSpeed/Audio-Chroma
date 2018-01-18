var boxes = [];
var fequencies = [16,17,18,19,20,21,22,23,24,25,27,28,29,30,31,32,33,34,35,37,39,41,44,47,49,52,
					55,58,62,65,69,73,78,82,83,87,92,93,98,104,110,116,117,123,131,138,139,147,155,156,
					165,175,185,196,208,220,233,247,262,277,293,294,311,330,349,370,392,415,440,466,494,
					523,554,587,622,659,698,699,740,784,831,880,932,988,1046,1047,1109,1175,1244,1245,
					1318,1319,1397,1480,1568,1661,1760,1865,1975,1976,2093,2217,2349,2489,2637,2794,2960,
					3136,3322,3323,3520,3729,3951];//,4186,4435,4699,4978,5274,5587,5588,5920,6272,6645, 7040,7459,7902];
var resolution = 930;//30 * 31
for(i = 0; i < resolution; i++) {
  hex_color = '';
  for(j = 0; j < 6; j++) {hex_color += Math.floor(Math.random()*16).toString(16);}
  // console.log(hex_color);
  var box = document.createElement('div');
  box.className = "box";
  box.style.backgroundColor = '#' + hex_color;
  document.getElementById('boxes').appendChild(box);
  boxes.push(box);
}

$.getJSON('/getMusic', function(json) {
  var options = '<option value=""></option>';
  $.each(json, function(i, item) {
    options += '<option value="' + item + '">' + item + '</option>';
  });
  $('#songs').html(options);
})
.done(function() { console.log('getMusic getJSON request succeeded!'); })
.fail(function(jqXHR, textStatus, errorThrown) {
  console.log('getMusic getJSON request failed! ' + textStatus);
  console.log('incoming ' + jqXHR.responseText);
})
.always(function() { console.log('getMusic getJSON request ended!');
});

$('#songs').on('change', function() {
  var $selected = $('#songs').find(':selected').text();
  $('#audio').attr('src', './music/' + $selected);
});

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
var audio = document.getElementById('audio');
var audioSrc = audioCtx.createMediaElementSource(audio);
audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);

analyser.fftSize = 8192;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);
//console.log(dataArray);


function draw() {

 
  analyser.getByteTimeDomainData(dataArray);
 
  var num_of_slices = resolution,
  //STEP = Math.floor(dataArray.length /num_of_slices),
  STEP=1,
  No_Signal = 128;
  
 drawVisual = requestAnimationFrame(draw);
   for (var i = 0, n = 0; i < num_of_slices; i++) {

	//var slice = boxes[i];
	if((i % 3) == 0)
	{
		n++;
	}
	if (n >= fequencies.length)
	{
		n = 0;
	}
	var N = fequencies[n];
    var val = Math.abs(dataArray[N]) / No_Signal;//0-2
	var balance =  Math.abs(dataArray[N]) - No_Signal;//0-30ish
	//console.log("val: " + val);
	
    hex_color = '';
    var a = N % 16;//0-16 key
	var oct = Math.floor(N / 255);//0-16 octave
	var r1,r2,g1,g2,b1,b2;
	var power = Math.floor((Math.pow((balance),2)/26)+1);
	if(a < 5)
	{
		r1 = power;
		r2 = power;
		g1 = (oct/2)*val;
		g2 = (oct/2)*val;
		b1 = 0;
		b2 = 0;
		
	}
	else if (a > 5 && a < 10)
	{
		r1 = 0;
		r2 = 0;
		g1 = power;
		g2 = power;
		b1 = (oct/2)*val;
		b2 = (oct/2)*val;
		
	}
	else
	{
		r1 = (oct/2)*val;
		r2 = (oct/2)*val;
		g1 = 0;
		g2 = 0;
		b1 = power;
		b2 = power;
	}
    //n::=16-31,31-66,66-131,131-262,262-524,524-1047,1047-2093,2093-4187,4187-7903. ::= scale
	//C=16.35,cd=17.32,D=18.35,de=19.45,E=20.60,F=21.83,fg=23.12,G=24.50,ga=25.96,A=27.5,ab=29.14,B=30.87
	//C[1]*2=C[2] works for all notes up to b[8]; 63 notes
	//d[n] := intensity at that frequency
	//0-15 0-255
	// ff0000 red 00ff00 green 0000ff blue
	hex_color += r1.toString(16);
	hex_color += r2.toString(16);
	hex_color += g1.toString(16);
	hex_color += g2.toString(16);
	hex_color += b1.toString(16);
	hex_color += b2.toString(16);

    //console.log(hex_color);
	boxes[i].style.backgroundColor = '#' + hex_color;
	
  }
};
 
draw();

alert('WARNING!  Do not use if you are epileptic or prone to seizures.');
