'use strict';
/* App Module */
(function(module){
    module

        .directive('preventRightClick',[
            function(){
                return {
                    restrict : 'A',
                    link : function($scope, $ele){
                        $ele.bind('contextmenu', function(e){
                            e.preventDefault();
                        });
                    }
                };
            }
        ])

        .directive('pagination', [function() {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                templateUrl: 'js/module/directives/templates/pagination.html'
            };
        }])

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

                $(function(){
                    element.timepicker({
                        timeFormat: 'H:mm',
                        interval: 5,
                        minTime: '6',
                        maxTime: '23:59:59',
                        //defaultTime: '11',
                        startTime: '6:00:00',
                        dynamic: false,
                        dropdown: true,
                        scrollbar: true,
                        change:function (dateText, inst) {
                            var data = $(this).val();
                            scope.$apply(function(scope){
                                ngModel.assign(scope, data);
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
                templateUrl: 'js/module/directives/templates/get-filter.html'
            };
        }])

        .directive('documentContent', [function() {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                templateUrl: 'js/module/directives/templates/document-content.html',
                compile: function(){
                    return function($scope){
                        $scope.showMsg = true;
                    }
                }
            };
        }])

        .directive('loader', [function() {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                templateUrl: 'js/module/directives/templates/loader.html'
            };
        }])

        .directive('documentList', [function() {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                //templateUrl: 'js/module/directives/templates/get-document-accodian.html',
                templateUrl: 'js/module/directives/templates/get-document-list.html',
                compile:function () {
                    return function ($scope) {
                        $scope.getDocuments();
                    }

                }
            };
        }])

        .directive('loginButton', [function() {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                templateUrl: 'js/module/directives/templates/get-login-button.html'
            };
        }])

        .directive('addEvent', [function() {
            return {
                restrict: 'E',
                scope: false,
                replace: true,

                templateUrl: 'js/module/directives/templates/add-event.html'
            };
        }])
        .directive('listEvent', [function() {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                templateUrl: 'js/module/directives/templates/list-event.html',
                compile: function(){
                    return function($scope){
                        $scope.getEvent();
                    }
                }
            };
        }])
        .directive('editEvent', [function() {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                templateUrl: 'js/module/directives/templates/edit-event.html'
            };
        }])

        .directive('manageDocument', [function() {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                templateUrl: 'js/module/directives/templates/manage-document.html',
            };
        }])

        .directive('eventReadMoreDetail',[function() {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                templateUrl: 'js/module/directives/templates/event-read-more-popup.html'
            };
        }])

    .directive('addPdf', [function($rootScope) {
            return {
                restrict: 'E',
                templateUrl: 'js/module/directives/templates/add-pdf.html',
                scope: {
                    max: '='
                },
                link: function(scope, element, attrs){

                    scope.range = [];
                    scope.$root.pdfFile = false;
                    scope.$root.imageCheck = 0;
                    for(var i=0;i<scope.max;i++) {
                        scope.range.push(i);
                    }
                    var imageFormData = new FormData();

                    scope.validateImageFile = function(element){

                        scope.$root.isFileExistCheck = true;

                        var item = $(element).attr("item");

                        if(!scope.$root.imageCheck){
                            scope.$root.imageCheck = -1;
                        }

                        imageFormData.append('pdf'+item, $(element)[0].files[0]);

                        scope.$root.formData = imageFormData;

                        var fileName = ($(element).val().replace(/^.*[\\\/]/, '')).split('.');

                        var ext = fileName[1];

                        if(ext){
                            $("#pdf__name_"+item).html(fileName[0]+'.'+fileName[1]);
                        }

                        var isValidLogo = $.inArray( ext, ['pdf']);

                        //console.log($isValidLogo);

                        if(isValidLogo == '-1'){
                            sweetAlert("Error..!", 'Please select a pdf file', 'warning');
                            scope.$root.imageCheck = 0;
                        }else{
                            scope.$root.imageCheck = 1;
                        }
                    }
                }
            };
        }])


}(angular.module('ithuseApp')));