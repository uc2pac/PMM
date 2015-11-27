angular.module('pmm.controller.messenger', []).
	controller('MessengerCtrl', ['$scope', 'Socket', 'dateFilter',function($scope, Socket, dateFilter) {
		$scope.messages = [];

		$scope.message = {
			subject: '',
			message: '',
			date: dateFilter(new Date(), 'yyyy-MM-dd')
		};

		Socket.on('message', function(messages) {
			console.log(messages);
	        $scope.messages = messages;
	    });

		$scope.postMessage = function() {
			Socket.emit('message', $scope.message, function(message) {
		        $scope.messages.push(message);
		    });
		};

	}]);