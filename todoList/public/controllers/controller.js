var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
  console.log("Hello World from controller");


  var refresh = function () {
    $http.get('/todoList').success(function (response) {
      console.log("I got the data I requested");
      $scope.todoList = response;
      $scope.todo = "";
    });
  };

  refresh();

  //Functions from html page. Remove, edit, update, deselect.  CRUD 

  $scope.addTodo = function () {
    console.log($scope.todo);
    $scope.todo.complete = false;
    $http.post('/todoList', $scope.todo).success(function (response) {
      console.log(response);
      refresh();
    });
  };

  $scope.remove = function (id) {
    console.log("Remove: ", id);
    $http.delete('/todoList/' + id).success(function (response) {
      refresh();
    });
  };

  $scope.edit = function (id) {
    console.log(id);
    $http.get('/todoList/' + id).success(function (response) {
      console.log("In Edit");
      $scope.todo = response;
    });
  };

  $scope.update = function () {
    console.log("Update: ", $scope.todo._id);
    console.log($scope.todo._id);
    $http.put('/todoList/' + $scope.todo._id, $scope.todo).success(function (response) {
      refresh();
    })
  };

  $scope.deselect = function () {
    $scope.todo = "";
  }

  $scope.complete = function (todo) {
    console.log("In Complete: ", todo);
    //console.log
    if (todo.complete == "true") {
      console.log("In True.Set to false.");
      todo.complete = false;
    }
    else {
      console.log("In False. Set to true.");
      todo.complete = true;
    }
    $http.put('/todoList' + todo._id, todo).success(function (response) {
      refresh();
    })
  };

}]);