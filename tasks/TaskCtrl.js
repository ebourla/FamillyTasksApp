app.controller("TaskCtrl", function ($scope, taskSrv, userSrv, $location, $log) {

  if (!userSrv.isLoggedIn()) {
    $location.path("/");
    return;
  }

  $scope.activeUser = userSrv.getActiveUser();

  $scope.markedItemArr = [];
  $scope.currentFilterStatus = 0;
  $scope.taskList = [];
 

  // function Task(name, status) {
  //   this.name = name;
  //   this.isCompleted = false;
  //   this.status = status; // 0=all; 1=active; 2=completed
  // }

  // code that goes to Parse and populates $scope.taskList with the tasks of the current user
  taskSrv.getActiveUserTasks().then(function (tasks) {
    $scope.tasksList = tasks;
  }, function (err) {
    $log.error(err);
  });


  //currentFilterStatus
  $scope.onStatusChanged = function (displayStatus) {
    //$scope.currentFilterStatus = displayStatus;

    // loop on  $scope.taskList
    // find all elemnts with displayStatus

    $scope.filteredList = [];

    for (var i = 0; i < $scope.taskList.length; i++) {
      var element = $scope.taskList[i];

      if (displayStatus === 0) {
        // all
        $scope.filteredList = $scope.taskList;
      } else {
        if (element.status === displayStatus) {
          $scope.filteredList.push(element);
        }
      }

    }
  }

  $scope.taskAdd = function () {
    if ($scope.taskList) {
      $scope.addTaskToArr($scope.taskList, 1);
    }
    $scope.taskList = "";
  };

  $scope.remove = function () {
    if (window.confirm("Are you sure you want to delete?")) {

      for (var i = 0; i < $scope.markedItemArr.length; i++) {
        var x = $scope.markedItemArr[i];
        var pos = $scope.taskList.indexOf(x);
        if (pos > -1) {
          $scope.taskList.splice(pos, 1);
        }
      }
    }
  }

  $scope.addTaskToArr = function (name, status) {
    if (!$scope.taskList) {
      $scope.taskList = [];
    }

    // $scope.taskList = taskSrv.addTaskToArr($scope.taskList, name, status)
    $scope.filteredList = $scope.taskList;
  }

  $scope.onCheckboxChecked = function (checkedItem) {

    if (checkedItem.Task.isCompleted) {
      checkedItem.Task.status = 2;
      $scope.markedItemArr.push(checkedItem.Task)

    } else {
      checkedItem.Task.status = 0;
      var pos = $scope.markedItemArr.indexOf(checkedItem);
      if (pos > -1) {
        $scope.markedItemArr.slice(pos, 1)
      }
    }
    console.log(event)
  }

  //  $scope.addTaskToArr('Clean House', 0);
});