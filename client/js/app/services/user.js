angular.module('pmm.service.authentication', []).
	factory('AuthService', ['$q', '$rootScope', '$timeout', '$http', function($q, $rootScope, $timeout, $http) {
		// create user variable
	    var user = null;

	    // return available functions for use in controllers
	    return ({
	      isLoggedIn: isLoggedIn,
	      getUserStatus: getUserStatus,
	      login: login,
	      logout: logout,
	      register: register
	    });

	    function isLoggedIn() {
	        if(user) {
	          return true;
	        } else {
	          return false;
	        }
	    }

	    function getUserStatus() {
	      return user;
	    }

	    function login(userdata) {

	      // create a new instance of deferred
	      var deferred = $q.defer();

	      // send a post request to the server
	      $http.post('/login', {username: userdata.email, password: userdata.password})
	        // handle success
	        .success(function (data, status) {
	          if(status === 200 && data.status){
	            user = true;

	            $rootScope.currentUser = userdata.email;
	            deferred.resolve(status);
	          } else {
	            user = false;
	            deferred.reject(data);
	          }
	        })
	        // handle error
	        .error(function (data) {
	          user = false;
	          deferred.reject(data);
	        });

	      // return promise object
	      return deferred.promise;

	    }

	    function logout() {

	      // create a new instance of deferred
	      var deferred = $q.defer();

	      // send a get request to the server
	      $http.get('/logout')
	        // handle success
	        .success(function (data) {
	          user = false;
	          deferred.resolve(data);
	        })
	        // handle error
	        .error(function (data) {
	          user = false;
	          deferred.reject(data);
	        });

	      // return promise object
	      return deferred.promise;

	    }

	    function register(userdata) {

	      // create a new instance of deferred
	      var deferred = $q.defer();

	      // send a post request to the server
	      $http.post('/register', {username: userdata.email, password: userdata.password})
	        // handle success
	        .success(function (data, status) {
	          if(status === 200 && data.status){
	          	$rootScope.currentUser = userdata.email;
	            deferred.resolve(status);
	          } else {
	            deferred.reject(data);
	          }
	        })
	        // handle error
	        .error(function (data) {
	          deferred.reject(data);
	        });

	      // return promise object
	      return deferred.promise;

	    }
	}]);