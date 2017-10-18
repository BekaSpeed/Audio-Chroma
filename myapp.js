angular.module('myapp',[])
.controller('MainCtrl', ['$scope',function($scope) {
  var colorbox = {
    'background-color' : 'red',
    'color' : 'green',
    'height' : '80px',
    'width' : '50px',
    'display' : 'inline-block'
  };
  $scope.boxes = [];
  for(i = 0; i < 200; i++) {
    hex_color = '';
    for(j = 0; j < 5; j++) {hex_color += Math.floor(Math.random()*16).toString(16);}
    console.log(hex_color);
    $scope.boxes.push({
       'background-color' : '#'+hex_color,
       'color' : 'green',
       'height' : '10px',
       'width' : '10px',
	'float':'left',
	'display' : 'flex',
	'justify-content' : 'space-around',
	'margin' : '2px'
       })
  }
  $scope.box = colorbox;
  $scope.data = 'my data';
}])
