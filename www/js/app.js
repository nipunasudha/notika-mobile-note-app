(function () {

  app = angular.module('mynotes', ['ionic', 'mynotes.notestore'])
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



  app.controller('ListCtrl', function ($scope, NoteStore) {
    $scope.reordering = false
    $scope.notes = NoteStore.list();
    $scope.go = function (id) {
      console.log(id)
      window.location = "#/edit/" + id
    }
    $scope.delete_note = function (id) {
      console.log(id + "delete!")
      NoteStore.delete_note(id)
    }
    $scope.toggle_reordering = function () {
      console.log("Reorder clicked")
      $scope.reordering = !$scope.reordering
    }
    $scope.move = function (note, fromIndex, toIndex) {
      console.log(note + "---" + fromIndex + "---" + toIndex)
      NoteStore.move(note, fromIndex, toIndex)
    }
  })

  //------------------------------------------

  app.controller('AddCtrl', function ($scope, $state, NoteStore) {

    $scope.note = {
      id: new Date().getTime().toString(),
      title: "",
      description: ""
    }
    $scope.save_changes = function () {
      if (NoteStore.add($scope.note)) {
        $state.go('list')
      } else {
        NoteStore.showAlert()
      }

    }
   
  })

  //------------------------------------------

  //------------------------------------------

  app.controller('EditCtrl', function ($scope, $state, NoteStore) {
    showAlert = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Oops!',
        template: 'Your note is incomplete.'
      });

      alertPopup.then(function (res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };
    $scope.noteId = $state.params.noteId;

    $scope.note = angular.copy(NoteStore.get($scope.noteId))
    $scope.save_changes = function () {
      if (NoteStore.update($scope.note)) {
        $state.go('list')
      } else {
        NoteStore.showAlert()
      }

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

