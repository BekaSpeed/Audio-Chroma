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
  for(i = 0; i < 400; i++) {
    c1 = Math.floor(Math.random()*255).toString(16);
    c2 = Math.floor(Math.random()*255).toString(16);
    c3 = Math.floor(Math.random()*255).toString(16);
    console.log(c1+c2+c3);
    $scope.boxes.push({
       'background-color' : '#'+c1+c2+c3,
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
