app.controller("newTaskCtrl", function($scope, recipesSrv, $location, $log) {
    
    $scope.createTask = function() {
        // call service createTask
        tasksSrv.createTask($scope.name, $scope.userID, $scope.status, $scope.description).then(function() {
            $location.path("/Tasks");
        }, function(err) {
            $log.error(err);
        })
    };

});