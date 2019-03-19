var app = angular.module("TodoApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "home/home.html"
    }).when("/login", {
        templateUrl: "login/login.html",
        controller: "loginCtrl"
    }).when("/signup", {

    }).when("/tasks", {
        templateUrl: "/tasks/task.html",
        controller: "taskCtrl"
    }).when("task/:taskId", {

    }).when("new", {
        templateUrl: "tasks/newTask.html",
        controller: "newtaskCtrl"
    }).otherwise({
        redirectTo: "/"
    })
})