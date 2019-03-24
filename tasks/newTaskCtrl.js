app.controller("newTaskCtrl", function($scope, taskSrv, $location, $log) {
    
    $scope.createTask = function() {
        // call service createTask
        taskSrv.createTask($scope.name, $scope.date, $scope.userID, $scope.isCompleted, $scope.description).then(function() {
            $location.path("Tasks/newTask");
        }, function(err) {
            $log.error(err);
        })
    };

});