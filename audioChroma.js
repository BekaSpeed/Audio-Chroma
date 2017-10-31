var tracks = ["Final_Fantasy_6_Magicite_Made_My_Mind_Melt_OC_ReMix.mp3"];

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
var audio = document.getElementById('audio');
var audioSrc = audioCtx.createMediaElementSource(audio);
audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

// Get a canvas defined with ID "oscilloscope"
var canvas = document.getElementById("oscilloscope");
var canvasCtx = canvas.getContext("2d");

// draw an oscilloscope of the current audio source

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

  for (var i = 0; i < bufferLength; i++) {

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

angular.module('myapp',['ngAnimate'])
.controller('MainCtrl', ['$scope',function($scope) {
  $scope.boxes = [];

  for(i = 0; i < 930; i++) {
    hex_color = '';
    for(j = 0; j < 6; j++) {hex_color += Math.floor(Math.random()*16).toString(16);}
    console.log(hex_color);
    $scope.boxes.push({
    "width": "3vw",
    "height": "3vh",
    "float":"left",
    "display" : "flex",
    "justify-content" : "space-around",
    "margin" : "1px",
    "background-color" : '#'+hex_color,
    "-webkit-animation-name": "example", /* Safari 4.0 - 8.0 */
    " -webkit-animation-duration":(8 + i/930) +"s", /* Safari 4.0 - 8.0 */
    "animation-name": "example",
    "animation-duration": (8 + i/930) +"s",
    })
  }
}])
