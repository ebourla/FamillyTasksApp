app.controller("navbarCtrl", function($scope, userSrv, $location, $log) {

    $scope.isUserLoggedIn = function() {
        return userSrv.isLoggedIn();
    }

    $scope.logout = function() {
        userSrv.logout();
        // $location.path("/");
        window.location.reload();
    }
}) 