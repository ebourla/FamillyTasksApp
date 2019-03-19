app.controller("loginCtrl", function($scope, $location, userSrv) {

    $scope.invalidLogin = false;
    $scope.email = "elizabethbourla@gmail.com";
    $scope.pwd = "123";



    $scope.login = function() {

        userSrv.login($scope.email, $scope.pwd).then(function(activeUser) {
            $location.path("tasks");
        }, function() {
            $scope.invalidLogin = true;
        });

    }

})