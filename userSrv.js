
app.factory("userSrv", function($q, $http, userSrv, $log) {
    var activeUser = null;
    function login(email, pwd){
     var async = $q.defer();

     Parse.User.login(email, pwd).then(function(user) {
         console.log(user);
         activeUser = user;
         async.resolve(activeUser); 
     }).catch(function(error){
         console.error(error);
         async.reject("Invalid email or password")
     })
        return async.promise;
    }
    function isLoggedIn(){
        return activeUser ? true : false;
    } 
    function logout(){
            activeuser = null;
        }
    function getActiveUser(){
        return activeUser;
    }
    return {
        login: login,
        isLoggedIn: isLoggedIn,
        logout: logout,
        getActiveUser: getActiveUser
    }
    
})