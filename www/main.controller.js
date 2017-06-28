( function() {
		angular.module("POMODORO").controller("mainController", mainController);
		mainController.$inject = ['$scope', '$rootScope', '$location', '$timeout','appDataFactory','CONSTANTS'];
		function mainController($scope, $rootScope, $location, $timeout,appDataFactory,consts) {
			'use strict';
			var route_change,
			    MAIN = this;
			    MAIN.pomo_count=0;
			$scope.page_title = "";
			$scope.static_text = "";
			$scope.interacted_text = "";
			$scope.user_name = "";
			$scope.button_text = "";
			$scope.spellOut = function(obj) {
				TTS.speak({
				text : obj.text,
				locale : 'en-GB',
				rate:1.2
				}, function() {
					obj.sCallBck ? obj.sCallBck() : '';
				}, function() {
					obj.eCallBck ? obj.eCallBck() : '';
				});

			};

			MAIN.spellUserName = function(t, text) {
				if (text=="Go") {
				$scope.user_name = t;
				$scope.interacted_text = "";
				$scope.static_text = "Hi " + t;
				$scope.spellOut({
				'text' : "Hai" + t,
				sCallBck : function(t) {
				},
				eCallBck : function() {
				}
				});
				} else if(appDataFactory.getIsBreakOn()){
				  MAIN.pomo_count+=1;
				  
				   $scope.page_title = /(\:)/.test($scope.page_title)?
				  $scope.page_title.replace(/(\:\s\d)+/," : "+MAIN.pomo_count)
				  :$scope.page_title+" : "+MAIN.pomo_count;
					
					if(MAIN.pomo_count && MAIN.pomo_count%2 === 0){
						//MAIN.pomo_count=0;
						$scope.$broadcast('timer',3);
						return;
					}
					
					$scope.$broadcast('timer',1);
				} else{
					$scope.$broadcast('timer',2);
				}

			};

			route_change = $rootScope.$on('$locationChangeStart', routeChange);

			function routeChange(event, newUrl) {
				switch($location.path()) {
				case '/':
					$scope.page_title = consts.Page_header;
					break;
				default:
					break;
				}
				return;
			}

		}

	}());
