app.controller("newTaskCtrl", function($scope, taskSrv, $location, $log) {
    
    $scope.createTask = function() {
        // call service createTask
        tasksSrv.createTask($scope.name, $scope.date, $scope.userID, $scope.isCompleted, $scope.description).then(function() {
            $location.path("Tasks");
        }, function(err) {
            $log.error(err);
        })
    };

});