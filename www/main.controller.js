( function() {
		angular.module("POMODORO").controller("mainController", mainController);
		mainController.$inject = ['$scope','$rootScope','$location'];
		function mainController($scope,$rootScope,$location) {
			'use strict';
			var route_change;
			$scope.page_title = "";

			route_change = $rootScope.$on('$locationChangeStart', routeChange);
			
			function routeChange(event, newUrl) {
				switch($location.path()) {
				case '/':
					$scope.page_title = "Activity";
					break;
				default:
					break;
				}
				return;
			}

		}

	}());
