angular.module('pmm.controller.signup', []).
	controller('SignupCtrl', ['$scope', 'AuthService', function($scope, AuthService) {  
		$scope.controllerName = 'signup'; 

		$scope.user = {};

		// Signup user
		$scope.signup = function() {
			AuthService.register($scope.user).then(function(data) {
				if (data === 200) {
					$state.go('home');
				}
			});
		};
	}]);  