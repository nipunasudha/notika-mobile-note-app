(function () {

  app = angular.module('starter', ['ionic'])
  app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('list', {
      url: '/list',
      templateUrl: 'templates/list.html'
    })
    $stateProvider.state('edit', {
      url: '/edit/:noteId',
      templateUrl: 'templates/edit.html',
      controller: 'EditCtrl'
    })

    $stateProvider.state('add', {
      url: '/add',
      templateUrl: 'templates/edit.html',
      controller: 'AddCtrl'
    })



    $urlRouterProvider.otherwise('/list')
  })

  var notes = [{
    id: "1",
    title: "First Note",
    description: "This is the First note!"
  }, {

    id: "2",
    title: "Second Note",
    description: "This is the Second note!"
  }, {

    id: "3",
    title: "Third Note",
    description: "This is the Third note!"
  },

  ]
  var getNote = function (id) {
    for (i = 0; i < notes.length; i++) {

      if (notes[i].id == id) {
        return notes[i]
      }
    }
    return "No match"
  }
  var updateNote = function (edited) {
    for (i = 0; i < notes.length; i++) {

      if (notes[i].id == edited.id) {
        notes[i] = edited
        console.log("Saved!")
      }
    }
    return "No match"
  }
  var addNote = function (note) {
    notes.push(note)

  }
  app.controller('ListCtrl', function ($scope) {
    $scope.notes = notes;

  })

  //------------------------------------------

  app.controller('AddCtrl', function ($scope, $state) {

    $scope.note = {
      id: new Date().getTime().toString(),
      title: "",
      description: ""
    }
    $scope.save_changes = function () {
      addNote($scope.note)
      $state.go('list')
    }
  })

  //------------------------------------------

  //------------------------------------------

  app.controller('EditCtrl', function ($scope, $state) {
    $scope.noteId = $state.params.noteId;

    $scope.note = angular.copy(getNote($scope.noteId))
    $scope.save_changes = function () {
      updateNote($scope.note)
      $state.go('list')
    }
  })

  //------------------------------------------



  app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
} ())

