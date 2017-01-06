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

        .directive('viewEvent', [function() {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                controller : DashboardController,
                templateUrl: 'js/module/directives/templates/view-event.html'
            };
        }])

        .directive('viewEventDetail', [function() {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                controller : DashboardController,
                templateUrl: 'js/module/directives/templates/view-event-detail.html'
            };
        }])

        .directive('viewEventByCandidate', [function() {
            return {
                restrict: 'E',
                scope: false,
                replace: false,
                controller : DashboardController,
                templateUrl: 'js/module/directives/templates/view-event-by-candidate.html'
            };
        }])

        .directive('detailEventByCandidate', [function() {
            return {
                restrict: 'E',
                scope: false,
                replace: false,
                controller : DashboardController,
                templateUrl: 'js/module/directives/templates/detail-event-by-candidate.html'
            };
        }])

        .directive('pagination', [function() {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                controller : DashboardController,
                templateUrl: 'js/module/directives/templates/pagination.html'
            };
        }])

        .directive('attendeePage', [function() {
            return {
                restrict: 'E',
                templateUrl: '/js/module/directives/templates/attendee-page.html'
            };
        }])

        .directive('rsvpComment', [function() {
                return {
                    restrict: 'E',
                    templateUrl: '/js/module/directives/templates/rsvp-comment.html'
                };
        }])

        .directive('eventMapLocation', [function() {
            return {
                restrict: 'E',
                templateUrl: 'js/module/directives/templates/event-map-location.html'
            };
        }])

        .directive('eventComment', [function() {
            return {
                restrict: 'E',
                templateUrl: '/js/module/directives/templates/event-comment.html'
            };
        }])

        .directive('userProfile', [function() {
            return {
                restrict: 'E',
                templateUrl: 'js/module/directives/templates/user-profile.html'
            };
        }])

        .directive('editUser', [function() {
            return {
                restrict: 'E',
                templateUrl: 'js/module/directives/templates/edit-user.html'
            };
        }])

        .directive('addUser', [function() {
            return {
                restrict: 'E',
                templateUrl: 'js/module/directives/templates/add-user.html'
            };
        }])

        .directive('buyPlan', [function() {
            return {
                restrict: 'E',
                templateUrl: 'js/module/directives/templates/buy-plan.html'
            };
        }])

        .directive('addImage', [function($rootScope) {
            return {
                restrict: 'E',
                templateUrl: 'js/module/directives/templates/add-image.html',
                scope: {
                    max: '='
                },
                link: function(scope, element, attrs){
                    //console.log(attrs)
                    scope.range = [];
                    for(var i=0;i<scope.max;i++) {
                        scope.range.push(i);
                    }
                    //console.log(scope.range)
                    var imageFormData = new FormData();
                    scope.validateImageFile = function(element){

                        scope.$root.isFileExistCheck = true;

                        var item = $(element).attr("item");

                        //console.log("here");
                        if(!scope.$root.imageCheck){
                            scope.$root.imageCheck = 1;
                        }

                        //console.log(scope.$root.imageCheck);
                        imageFormData.append('image'+item, $(element)[0].files[0]);

                        scope.$root.formData = imageFormData;

                        console.log(scope.$root.formData);

                        var fileName = ($(element).val().replace(/^.*[\\\/]/, '')).split('.');

                        var ext = fileName[1];

                        if(ext){
                            $("#event_image__name_"+item).html(fileName[0]+'.'+fileName[1]);
                        }

                        var isValidLogo = $.inArray( ext, ['jpg', 'jpeg', 'gif', 'png', 'PNG', 'GIF', 'JPG', 'JPEG']);

                        //console.log($isValidLogo);

                        if(isValidLogo == '-1'){
                            sweetAlert("Error..!", 'Please select valid file format', 'warning');
                            scope.$root.imageCheck = 0;
                            
                        }
                    }
                }
            };
        }])





}(angular.module('ithuse')));