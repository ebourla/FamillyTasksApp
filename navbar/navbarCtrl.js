app.controller("navbarCtrl", function($scope, userSrv, $location, $log) {

    $scope.isUserLoggedIn = function() {
        return user.isLoggedIn();
    }

    $scope.logout = function() {
        user.logout();
        $location.path("/");
    }
}) 