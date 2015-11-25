angular.module('pmm.controller.login', []).
	controller('LoginCtrl', ['$scope', function($scope) {
		$scope.controllerName = 'login';

		$scope.user = {};

		// Login user
		$scope.login = function() {
			console.log($scope.user);
		};

	}]);