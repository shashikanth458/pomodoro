( function() {
		'use strict';
		angular.module("POMODORO").factory('appDataFactory', appDataFactory);
		function appDataFactory() {
			var adf = {},
			    adf_var = {};
			adf.setIsTimerOn = function(b) {
				adf_var.is_timer_on = b;
			};
			adf.getIsTimerOn = function() {
				return adf_var.is_timer_on;
			};
			adf.setIsBreakOn = function(b) {
				adf_var.is_break_on = b;
			};
			adf.getIsBreakOn = function() {
				return adf_var.is_break_on;
			};
			adf.setWarningCount = function(num){
			 adf_var.warning_count = num; 
			};
			adf.getWarningCount = function(){
        return adf_var.warning_count||null; 
      };
			return adf;
		}

	}());
