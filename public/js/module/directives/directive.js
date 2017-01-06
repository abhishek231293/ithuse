'use strict';
/* App Module */
(function(module){
    module
        .directive('myDatepicker', function ($parse) {
            return function (scope, element, attrs, controller) {
                var ngModel = $parse(attrs.ngModel);
                //console.log("here");
                $(function(){
                    element.datepicker({
                        showOn:"both",
                        changeYear:true,
                        changeMonth:true,
                        dateFormat:'dd/mm/yy',
                        //maxDate: new Date(),
                        minDate: new Date(),
                        yearRange: '2015:2017',
                        onSelect:function (dateText, inst) {
                            scope.$apply(function(scope){
                                // Change binded variable
                                ngModel.assign(scope, dateText);
                            });
                        }
                    });
                });
            }
         })

        .directive('myTimepicker', function ($parse) {
            return function (scope, element, attrs, controller) {
                var ngModel = $parse(attrs.ngModel);
                //console.log("here");
                $(function(){
                    element.timepicker({
                        timeFormat: 'h:mm p',
                        interval: 15,
                        minTime: '6',
                        maxTime: '11:59pm',
                        //defaultTime: '11',
                        startTime: '6:00',
                        dynamic: false,
                        dropdown: true,
                        scrollbar: true,
                        onSelect:function (dateText, inst) {
                            scope.$apply(function(scope){
                                ngModel.assign(scope, dateText);
                            });
                        }
                    });
                });
            }
         })

        .directive('getFilter', [function() {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                controller : DocumentController,
                templateUrl: 'js/module/directives/templates/get-filter.html'
            };
        }])

        .directive('documentList', [function() {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                controller : DocumentController,
                templateUrl: 'js/module/directives/templates/get-document-list.html'
            };
        }])

}(angular.module('ithuse')));