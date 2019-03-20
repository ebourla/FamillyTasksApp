app.factory("taskSrv", function ($q) {

    function Task(parseTask) {
        this.name = parseTask.get("name");
        this.userId = parseTask.get("userId");
        this.status = parseTask.get("isCompleted");
        this.description = parseTask.get("description");
        //this.objectId = parseTask.get("objectId")
        // this.status = status; // 0=all; 1=active; 2=completed
    }

    function getActiveUserTasks(user) {
        var async = $q.defer();
        const TaskParse = Parse.Object.extend('Task');
        const query = new Parse.Query(TaskParse);
        query.equalTo("userId", Parse.User.current());
       
        var tasks = [];
        query.find().then(function (results) {

            for (var i = 0; i < results.length; i++) {
                tasks.push(new Task(results[i]));
            }

            async.resolve(tasks);

        }, function (error) {
            console.log(error);
            async.reject(error);
        });

        return async.promise
    }

    function createTask(name, description, img, ingredients, steps, duration) {
        var async = $q.defer();

        const TaskParse = Parse.Object.extend('Task');
        const newTask = new TaskParse();
        
        newTask.set('name', name);
        newTask.set('description',description);
        newTask.set('image', new Parse.File(name+".jpg", { base64: img }));
        newTask.set('ingredients', ingredients);
        newTask.set('steps', steps);
        newTask.set('duration', duration);
        newTask.set('userId', Parse.User.current());
        
        newTask.save().then(
          function(result) {
            $log.info('Recipe created', result);
            var newRecipe = new Recipe(result);
            async.resolve(newRecipe);
          },
          function(error) {
            $log.error('Error while creating Recipe: ', error);
            async.reject(error);
          }
        );        

        return async.promise;
    }

    return {
        getActiveUserRecipes: getActiveUserRecipes,
        createRecipe: createRecipe
    }

})

    function addTaskToArr(arr, name, status) {
        var userId =  Parse.User.current().id;
        var newTask = new Task(name, userId, status);
        arr.push(newTask);
        return arr;
    }

    return {
        getActiveUserTasks: getActiveUserTasks,
        addTaskToArr: addTaskToArr
    }
});