app = angular.module('starter', ['ionic'])

app.controller('ListCtrl', function ($scope) {
  $scope.notes = [{
      title: "First Note",
      description: "This is the First note!"
    }, {
      title: "Second Note",
      description: "This is the Second note!"
    }, {
      title: "Third Note",
      description: "This is the Third note!"
    },

  ]

})


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