angular.module('pmm.controller.signup', []).
	controller('SignupCtrl', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {  
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