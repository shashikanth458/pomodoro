(function(){
  'use strict';
  angular.module('POMODORO')
         .constant('CONSTANTS',constantsFn());
         function constantsFn(){
           return{
             Page_header:'Pomodoro'
           };
         }
}());
