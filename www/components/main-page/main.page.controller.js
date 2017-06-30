( function() {

    angular.module("POMODORO").controller('mainPageController', mainPageController);
    mainPageController.$inject = ['$scope', '$rootScope', '$interval', '$timeout', 'appDataFactory'];
    function mainPageController($scope, $rootScope, $interval, $timeout, appDataFactory) {
      'use strict';
      $scope.mnts = "00";
      $scope.scns = "00";
      $scope.secnsTimer = "";
      $scope.mntsTimer = "";
      $scope.is_user_reg = false;

      $scope.$on('timer', function(e, args) {
        $scope.startTimer(args);
      });
      $scope.initMain = function() {
        $scope.$parent.interacted_text = "How Should I remeber You";
        $scope.$parent.button_text = "Go"
        $scope.spellOut({
          'text' : "How Should I remeber You",
          sCallBck : function() {
          },
          eCallBck : function() {
          }
        });
      };

      $scope.stopTimer = function(a) {
        if ($scope.$parent.interacted_text) {
          return;
        }
        $scope.mnts = "00";
        $scope.scns = "00";
        $interval.cancel($scope.secnsTimer);
        $interval.cancel($scope.mntsTimer);
        $scope.mntsTimer = null;
        $scope.secnsTimer = null;
        appDataFactory.setIsTimerOn(false);
        if (a === 'click') {
          return;
        }
        if (appDataFactory.getIsBreakOn()) {
          appDataFactory.setIsBreakOn(false);
          $scope.$parent.interacted_text = "Hey " + $scope.$parent.user_name + ",you have completed the break";
          $scope.$parent.button_text = "start session";
          checkingPomodoroStateAndWarningUser();
        } else {
          appDataFactory.setIsBreakOn(true);
          $scope.$parent.interacted_text = "Hey " + $scope.$parent.user_name + ",you have completed a session";
          $scope.$parent.button_text = "start break";
          checkingPomodoroStateAndWarningUser();
        }

        function checkingPomodoroStateAndWarningUser() {
          var a = $interval(function() {
            if ($scope.$parent.interacted_text) {
              $scope.$parent.MAIN.wrng_count = +1;
              appDataFactory.setWarningCountPercentage(
                $scope.$parent.MAIN.wrng_count*100/$scope.$parent.MAIN.pomo_count);
              $scope.$parent.interacted_text = "Hey " + $scope.$parent.user_name + ",I am counting on you play fair";
              $scope.spellOut({
                'text' : $scope.$parent.interacted_text+"and"+$scope.$parent.button_text,
                sCallBck : function() {
                },
                eCallBck : function() {
                }
              });
              return;
            }
            $interval.cancel(a);
          }, 30000);
        }


        $scope.spellOut({
          'text' : $scope.$parent.interacted_text,
          sCallBck : function() {
          },
          eCallBck : function() {
          }
        });
      };

      $scope.startTimer = function startTimer(time_length) {
        if (appDataFactory.getIsTimerOn() || !$scope.$parent.user_name) {
          return;
        }

        $scope.$parent.static_text = "";
        $scope.$parent.interacted_text = "";
        time_length--;

        $scope.mnts = parseInt(time_length, 10) > 9 ? time_length + '' : '0' + time_length;
        $scope.scns = 59;
        appDataFactory.setIsTimerOn(true);
        $scope.mntsTimer = $interval(function() {
          var t = parseInt($scope.mnts, 10);
          if (t !== 0) {
            $scope.scns = "59";
            t--;
            $scope.mnts = t > 9 ? t + '' : '0' + t;
          } else {
            $scope.stopTimer();
          }
        }, 59000);
        $scope.secnsTimer = $interval(function() {
          var t = parseInt($scope.scns, 10);
          t > 0 ? t-- : '';
          $scope.scns = t > 9 ? t + '' : '0' + t
        }, 1000);
      };
    }

  }())

