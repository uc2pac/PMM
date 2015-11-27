angular.module('pmm.controller.login', []).
	controller('LoginCtrl', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {
		$scope.controllerName = 'login';

		$scope.user = {};

		// Login user
		$scope.login = function() {
			AuthService.login($scope.user).then(function(data) {
				if (data === 200) {
					$state.go('home');
				}
			});
		};

	}]);