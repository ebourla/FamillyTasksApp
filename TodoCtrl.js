app.controller("TodoCtrl", function($scope) {

  $scope.markedItemArr = [];
  $scope.currentFilterStatus = 0;
  $scope.todoList = [];
  $scope.filteredList = $scope.todoList;
    
    function Todo(name, status) {
      this.name = name;
      this.isDone = false;
      this.status = status; // 0=all; 1=active; 2=completed
    }
    
    //currentFilterStatus
    $scope.onStatusChanged = function(displayStatus){
        //$scope.currentFilterStatus = displayStatus;
        
        // loop on  $scope.todoList
        // find all elemnts with displayStatus
       
        $scope.filteredList = [];
        
        for(var i=0; i< $scope.todoList.length; i++) {
          var element = $scope.todoList[i];
          
          if(displayStatus === 0) {
            // all
            $scope.filteredList =  $scope.todoList;
          } else {
            if(element.status === displayStatus) {
              $scope.filteredList.push(element);
            }  
          }
          
        }
      }
  
    $scope.todoAdd = function() {
      if ($scope.todoInput) {
        $scope.addTodoToArr($scope.todoInput, 1);
      }
      $scope.todoInput = "";
    };
  
    $scope.remove = function(){
     if(window.confirm("Are you sure you want to delete?")){
      
       for(var i=0; i<$scope.markedItemArr.length; i++) {
         var x = $scope.markedItemArr[i];
         var pos = $scope.todoList.indexOf(x);
         if (pos > -1) {
           $scope.todoList.splice(pos, 1);
         }
       }
     }
    }
    
    $scope.addTodoToArr = function(name, status){
      if(!$scope.todoList) {
        $scope.todoList = [];
      }
      var newTodo = new Todo(name, status);
      $scope.todoList.push(newTodo);
    }
    
    $scope.onCheckboxChecked = function(checkedItem){
      
      if(checkedItem.Todo.isDone) {
        checkedItem.Todo.status = 2;
        $scope.markedItemArr.push(checkedItem.Todo)
        
      } else {
        checkedItem.Todo.status = 0;
         var pos = $scope.markedItemArr.indexOf(checkedItem);
         if(pos > -1){
           $scope.markedItemArr.slice(pos,1)
         }
      }
      console.log(event)
    }
    
    $scope.addTodoToArr('Clean House', 0);
  });