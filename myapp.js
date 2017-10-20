angular.module('myapp',['ngAnimate'])
.controller('MainCtrl', ['$scope',function($scope) {
  $scope.boxes = [];
  for(i = 0; i < 1000; i++) {
    hex_color = '';
    for(j = 0; j < 6; j++) {hex_color += Math.floor(Math.random()*16).toString(16);}
    console.log(hex_color);
    $scope.boxes.push({
      'background-color' : '#'+hex_color,
      'height' : '40px',
      'width' : '40px',
      'float':'left',
      'display' : 'flex',
      'justify-content' : 'space-around',
      'margin' : '2px'
    })
  }
}])
