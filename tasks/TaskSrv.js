app.factory("taskSrv", function ($q, $log, userSrv) {

    function Task(parseTask) {
        this.name = parseTask.get("name");
        this.date = parseTask.get("date");
        this.userId = parseTask.get("userId");
        this.isCompleted = parseTask.get("isCompleted");
        this.description = parseTask.get("description");
        
        //this.objectId = parseTask.get("objectId")
        // this.isCompleted = isCompleted; // 0=all; 1=active; 2=completed
    }

    function getActiveUserTasks() {
        var async = $q.defer();
        var activeUserId = userSrv.getActiveUser().id;
        
        var tasks = [];

        const TaskParse = Parse.Object.extend('Task');
        const query = new Parse.Query(TaskParse);
        query.equalTo("userId", Parse.User.current());
        query.find().then(function (results) {

            for (var i = 0; i < results.length; i++) {
                tasks.push(new Task(results[i]));
            }

            async.resolve(tasks);

        }, function (error) {
            $log.error('Error while fetching Task', error);
            async.reject(error);
        });

        return async.promise
    }

    function createTask(name, date, iserId, isCompleted, description) {
        var async = $q.defer();
        const TaskParse = Parse.Object.extend('Task');
        const newTask = new TaskParse();
        
        newTask.set('name', name);
        newTask.set('date', date);
        newTask.set('userId', Parse.User.current());
        newTask.set('isCompleted',isCompleted || false);
        newTask.set('description', description);

        
        
        newTask.save().then(
          function(result) {
            $log.info('Task created', result);
            var newTask = new Task(result);
            async.resolve(newTask);
          },
          function(error) {
            $log.error('Error while creating Task: ', error);
            async.reject(error);
          }
        );        

        return async.promise;
    }

    return {
        getActiveUserTasks: getActiveUserTasks,
        createTask: createTask
    }

});