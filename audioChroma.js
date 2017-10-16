angular.module("Page", []) 
.controller('PageController', function($scope) {
    $scope.tracks = ["Final_Fantasy_6_Magicite_Made_My_Mind_Melt_OC_ReMix.mp3"];
    $scope.playTracks = function(tracks) {
        angular.forEach(tracks, function(track, key) {
            track.play();
        });
        $scope.playing = true;
    };
    
    function tick() {
        angular.forEach($scope.currentSong.tracks, function(track, key) {
            if (track.analyser) {
                _drawStuff(track.cCtx, track.analyser);
            }
        });
        window.requestAnimationFrame(tick);
    }
})
 .controller('TrackController', function($scope, $element) {
    $scope.trackVolume = 100;
    $scope.canvas = $element[0].getElementsByTagName('canvas')[0];
    
    $scope.track.play = function() {
        $scope.track.audio.play();
    };
    
    $scope.track.stop = function() {
        $scope.track.audio.pause();
    };
    
    $scope.$watch('trackVolume', function(value) {
        value = value / 100;
        if ($scope.track.gainNode) {
            $scope.track.gainNode.gain.value = value;
        }
    });
});

var analyser = _aCtx.createAnalyser();
analyser.smoothingTimeConstant = 0.6;
analyser.fftSize = 256;

// Each frame:
var byteFreqArr = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(byteFreqArr);

var timeDomainArr = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteTimeDomainData(timeDomainArr);

canvasContext.clearRect(0, 0, _cWidth, _cHeight);
canvasContext.beginPath();

for (var i=0,iLen=byteFreqArr.length; i<iLen; i++) {
    canvasContext.fillRect(i*_freqDrawWidth, _cHeight - (byteFreqArr[i] / 256 * _cHeight), (_freqDrawWidth - 2), _cHeight);
    
    var percent = timeDomainArr[i] / 256;
    var offset = _cHeight - (percent * _cHeight) - 1;
    canvasContext.lineTo(i*_timeDrawWidth, offset);
}
canvasContext.stroke();