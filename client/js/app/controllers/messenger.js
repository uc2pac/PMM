angular.module('pmm.controller.messenger', []).
	controller('MessengerCtrl', ['$scope', '$rootScope', 'Socket', 'dateFilter',function($scope, $rootScope, Socket, dateFilter) {
		$scope.currentUser = $rootScope.currentUser;
		$scope.messages = [];

		$scope.message = {
			subject: '',
			message: '',
			date   : new Date(),
			user   : $scope.currentUser
		};

		// Setting cuurent date as start point on initialization
		$scope.inlineDatepicker = {
			date: new Date()
		};

	    $scope.getMessages = function(date) {
	    	// make sutable format to be stored inti DB
			var params = {
				selectedDate: dateFilter(date, 'yyyy-MM-dd'),
				currentUser: $scope.currentUser
			};

	    	Socket.emit('messages:get', params, function(messages) {
		        $scope.messages = messages;
		    });
	    };

	    // Get messages for current date
	    $scope.getMessages($scope.inlineDatepicker.date);

	    // Get messages for selected date
	    $scope.$watch('inlineDatepicker.date', function(newVal, oldVal) {
	    	if (newVal !== oldVal) {
	    		$scope.getMessages(newVal);
	    	}
	    });

	    // Post new message
		$scope.postMessage = function() {
			// make sutable format to be stored inti DB
			$scope.message.date = dateFilter($scope.message.date, 'yyyy-MM-dd');

			Socket.emit('message', $scope.message, function(message) {
				var inlineDate = dateFilter($scope.inlineDatepicker.date, 'yyyy-MM-dd');
				
				if ($scope.message.date === inlineDate) {
		        	$scope.messages.unshift(message);
		        } else {
		        	$scope.messageAlert = true;
		        }
		    });

		    $scope.message.subject = '';
		    $scope.message.message = '';
		};

		// Datepicker configuration
		$scope.datepicker = {
			opened: false,
			format: 'yyyy-MM-dd',

			open: function($event) {
				this.opened = true;
			}
		};

		// Alert
		$scope.closeAlert = function(index) {
	    	$scope.messageAlert = false;
	  	};

	}]);