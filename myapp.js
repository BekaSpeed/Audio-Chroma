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
  for(i = 0; i < 10; i++) {
    c1 = Math.floor(Math.random()*255).toString(16);
    c2 = Math.floor(Math.random()*255).toString(16);
    c3 = Math.floor(Math.random()*255).toString(16);
    console.log(c1+c2+c3);
    $scope.boxes.push({
       'background-color' : '#'+c1+c2+c3,
       'color' : 'green',
       'height' : '10px',
       'width' : '5%',
       'display' : 'inline-block'
       })
  }
  $scope.box = colorbox;
  $scope.data = 'my data';
}])
