window.onload = function() {
	
var boxes1 = [];
var boxes2 = [];
var boxes3 = [];

var boxes_lenght = 252;

var fequencies = [16,17,18,19,20,21,22,23,24,25,27,28,29,30,31,32,33,34,35,37,39,41,44,47,49,52,
					55,58,62,65,69,73,78,82,83,87,92,93,98,104,110,116,117,123,131,138,139,147,155,156,
					165,175,185,196,208,220,233,247,262,277,293,294,311,330,349,370,392,415,440,466,494,
					523,554,587,622,659,698,699,740,784,831,880,932,988,1046,1047,1109,1175,1244,1245,
					1318,1319,1397,1480,1568,1661,1760,1865,1975,1976,2093,2217,2349,2489,2637,2794,2960,
3136,3322,3323,3520,3729,3951,4186,4435,4699];//,4978,5274,5587,5588,5920,6272,6645, 7040,7459,7902];
for(i = 0; i < boxes_lenght; i++) {
  hex_color = '';
  for(j = 0; j < 6; j++) {hex_color += Math.floor(Math.random()*16).toString(16);}
  // console.log(hex_color);
  var box = document.createElement('div');
  box.className = "box";
  box.style.backgroundColor = '#' + hex_color;
  document.getElementById('boxes1').appendChild(box);
  boxes1.push(box);
}	

for(i = 0; i < boxes_lenght; i++) {
  hex_color = '';
  for(j = 0; j < 6; j++) {hex_color += Math.floor(Math.random()*16).toString(16);}
  // console.log(hex_color);
  var box = document.createElement('div');
  box.className = "box";
  box.style.backgroundColor = '#' + hex_color;
  document.getElementById('boxes2').appendChild(box);
  boxes2.push(box);
}	

for(i = 0; i < boxes_lenght; i++) {
  hex_color = '';
  for(j = 0; j < 6; j++) {hex_color += Math.floor(Math.random()*16).toString(16);}
  // console.log(hex_color);
  var box = document.createElement('div');
  box.className = "box";
  box.style.backgroundColor = '#' + hex_color;
  document.getElementById('boxes3').appendChild(box);
  boxes3.push(box);
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

analyser.fftSize = 4096;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

  // Get a canvas defined with ID "oscilloscope"
var canvas = document.getElementById("myCanvas");
var canvasCtx = canvas.getContext("2d");

  function draw() {

  drawVisual = requestAnimationFrame(draw);

  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

  canvasCtx.beginPath();

  var sliceWidth = canvas.width * 1.0 / bufferLength;
  var x = 0;
  var z = 0;

  for (var i = 0; i < bufferLength; i++, z++) {

	hex_color1 = 0;
	hex_color1 += Math.floor(Math.abs(dataArray[i] - 128)).toString(16);
	hex_color2 = 50;
	hex_color2 += Math.floor(Math.abs(dataArray[i] - 50)).toString(16);
	hex_color3 = 0;
	hex_color3 += Math.floor(Math.abs(dataArray[i])).toString(16);
	z = z % boxes_lenght;
    //console.log(hex_color);
	boxes1[z].style.backgroundColor = '#' + hex_color1;
	boxes2[z].style.backgroundColor = '#' + hex_color2;
	boxes3[z].style.backgroundColor = '#' + hex_color3;
	
    var v = dataArray[i] / 128.0;
    var y = v * canvas.height / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
	
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();
};

draw();
};