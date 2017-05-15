(function(){
	
angular.module("POMODORO").controller('mainPageController',mainPageController);
mainPageController.$inject=['$scope','$rootScope','$interval'];
function mainPageController($scope,$rootScope,$interval){
	'use strict';
	$scope.mnts="00";
	$scope.scns="00";
	
	$scope.startTimer=function startTimer(time_length){
		$scope.mnts=parseInt(time_length,10)>9?time_length+'':'0'+time_length;
		$scope.scns=59;
		
		var mntsTimer=$interval(function(){
			var t=parseInt($scope.mnts,10);
			if(t!==0){
				$scope.scns="59";
				t--;
				$scope.mnts = t>9?t+'':'0'+t;
			}else{
				$scope.mnts="00"
				$interval.cancel(secnsTimer);
				$interval.cancel(mntsTimer);
			}
		},59000),
		
		secnsTimer=$interval(function(){
				var t=parseInt($scope.scns,10);
				t>0?t--:'';
				$scope.scns = t>9?t+'':'0'+t
		},1000);
	}
}
}());

