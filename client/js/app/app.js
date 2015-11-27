'use strict';

(function() {
	var app = angular.module('pmm', [
	    'ui.router',
	    'ui.bootstrap',
	    // Controllers
	    'pmm.controller.login',
	    'pmm.controller.signup',
	    'pmm.controller.messenger',
	    // Services
	    'pmm.service.authentication',
	    'pmm.service.socket'
	]);

	app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
	    function ($locationProvider, $stateProvider, $urlRouterProvider) {

	        $locationProvider.html5Mode(true);
	        $urlRouterProvider.otherwise('error');

	        $stateProvider
	            .state('home', {
	                url: '/',
	                controller: 'MessengerCtrl',
	                templateUrl: '/views/messenger.html'
	            })
	            .state('login', {
	            	url: '/login',
	            	controller: 'LoginCtrl',
	            	templateUrl: '/views/login.html' 
	            })
	            .state('signup', {
	            	url: '/signup',
	            	controller: 'SignupCtrl',
	            	templateUrl: '/views/login.html'
	            })
	            // error states
	            .state('error', {
	                url: '/error?status&message',
	                params: {
	                    status: '404',
	                    message: 'We can\'t find the page you are looking for'
	                },
	                templateUrl: '/assets/error/error.html',
	                controller: ['$scope', '$stateParams', function($scope, $stateParams) {
	                    $scope.error = {
	                        status: $stateParams.status,
	                        message: $stateParams.message
	                    };
	                }]
	            });
	    }
	]);

	app.run(['$rootScope', '$state', 'AuthService', function ($rootScope, $state, AuthService) {
	  	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
	    	if (toState.name !== 'login' && toState.name !== 'signup' && AuthService.isLoggedIn() === false) {
	    		event.preventDefault();
	      		$state.go('login');
	    	}
	  	});
	}]);
})();
