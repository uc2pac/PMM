angular.module('pmm.controller.signup', []).
	controller('SignupCtrl', ['$scope', function($scope) {  
		$scope.controllerName = 'signup'; 

		$scope.user = {};

		// Signup user
		$scope.signup = function() {
			console.log($scope.user);
		};
	}]);  