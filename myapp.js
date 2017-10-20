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
