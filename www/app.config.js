(function(){
	angular.module('POMODORO',['ngRoute'])
			 .config(appConfig);
			 
	function appConfig($routeProvider){
	'use strict';
	$routeProvider.when('/',{
		templateUrl : "components/main-page/main.page.html",
		controller : "mainPageController as MPAGE"
	}).otherwise({
		redirectTo:'/'
		});
}

}());
