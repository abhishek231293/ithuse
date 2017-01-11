'use strict';

function DocumentController($scope, $rootScope, requestHandler, $timeout, $http) {
    $rootScope.currentTab = "document";
    $scope.loader = false;
    $scope.searchFields = {};
    $scope.login = false;
    $scope.addTitleFilter = false;
    $scope.filterFor = 'documentList';

    $scope.setLoginText = function (value) {
        if($scope.login){
            $scope.loadValue = value;
        }else {
            $scope.login = true;
            $scope.loadValue = value;
        }

    }

    $scope.getFilters = function(){

        requestHandler.preparePostRequest({

            url: '/getFilter'

        }).then(function (response) {
            $scope.filterData = response;
        }).catch(function () {

        })
    };

    $scope.getSubCategoryList = function(data){
        $scope.searchFields.subcategory_name = '';
        var dataToreturn = true;
        $scope.subCategoryList = false;

        angular.forEach($scope.filterData, function(value, key) {
            if(dataToreturn){
                if(key == $scope.searchFields.category_name){
                    $scope.subCategoryList = value;
                    dataToreturn = false;
                }
            }
        });
    };
    
    $scope.getDocuments = function () {

        $scope.loader = true;

        requestHandler.preparePostRequest({
            url: '/getDocumentLists',
            data :{
                category :$scope.searchFields.category_name,
                subCategory:$scope.searchFields.subcategory_name
            }
        }).then(function (response) {
            $timeout(function(){$scope.loader = false;}, 2000);
            $scope.documentData = response;
        }).catch(function () {

        })
    }

    $scope.resetFilters = function(filterParentId) {

        $scope.searchFields.category_name = '';
        $scope.searchFields.subcategory_name = '';
        $scope.getDocuments();

    }

}

function EventController($scope, $rootScope, $state, $timeout, requestHandler) {

    $rootScope.currentTab = "event";
    $scope.event = {};
    $scope.filter = {};
    $scope.eventRowset = {};
    $scope.loader = false;
    $scope.error = false;
    $scope.errorMsgDate = '';
    $scope.errorMsgTime = '';
    $scope.errorMsgTitle = '';
    $scope.errorMsgDescription = '';
    $scope.errorMsgPlace = '';
    $scope.searchFields = {};

    $scope.getEvent = function(){

        $scope.loader = true;
        requestHandler.preparePostRequest({
            url: '/getEvent',
            data :{
                title :$scope.searchFields.event_title,
                time:$scope.searchFields.event_time,
                status:$scope.searchFields.event_status
            }
        }).then(function (response) {
            $timeout(function(){$scope.loader = false;}, 2000);
            $scope.eventRowset = response;
        })
    }

    $scope.addEvent = function(){

        $scope.validateEvent($scope.event);
        if($scope.error){
            swal({
                title: 'Opps Something went wrong!',
                text: 'All field are compulsory!',
                timer: 2000
            }).then(
                function () {},
                function (dismiss) {
                    if (dismiss === 'timer') {
                     return false;
                    }
                }
            )
        }else{
            requestHandler.preparePostRequest({
                url: '/addEvent',
                data: $scope.event
            }).then(function (response) {
                if(response){
                    $scope.loader = false;
                    $state.go('event.list');

                }

            })
        }

    }

    $scope.deleteEvent = function(eventId){
        requestHandler.preparePostRequest({
            url: '/deleteEvent',
            data: {
             event_id:   eventId
            }
        }).then(function (response) {
            if(response){
                $scope.loader = false;
                $scope.getEvent();

            }

        })
    }

    $scope.getEventDetailById = function(eventId){
        requestHandler.preparePostRequest({
            url: '/getEvent',
            data: {
                event_id:   $rootScope.eventId
            }
        }).then(function (response) {
            if(response){

                $scope.eventEditDetail = response;
                console.log($scope.eventEditDetail);
            }

        })
    }


    $scope.validateEvent = function(eventValue){

        $scope.error = false;

        if ("date" in eventValue){

            if(eventValue['date'] != ''){
                if ("myTime" in eventValue) {
                    if(eventValue['myTime'] != ''){
                        $scope.errorMsgDateTime = '';
                    }else{
                        $scope.errorMsgDateTime = 'Please select event Date & Time.';
                        $scope.error = true;
                    }
                }else{
                    $scope.errorMsgDateTime = 'Please select event Date & Time.';
                    $scope.error = true;
                }
            }else{
                $scope.errorMsgDateTime = 'Please select event Date & Time.';
                $scope.error = true;
            }

        }else{
            $scope.errorMsgDateTime = 'Please select event Date & Time.';
            $scope.error = true;
        }

        if ("place" in eventValue){
            if(eventValue['place'] != ''){
                $scope.errorMsgPlace = '';
            }else{
                $scope.errorMsgPlace = 'Please select event venue.';
                $scope.error = true;
            }
        }else{
            $scope.errorMsgPlace = 'Please enter event venue.';
            $scope.error = true;
        }

        if ("title" in eventValue){
            if(eventValue['title'] != ''){
                $scope.errorMsgTitle = '';
            }else{
                $scope.errorMsgTitle = 'Please enter event title.';
                $scope.error = true;
            }
        }else{
            $scope.errorMsgTitle = 'Please enter event title.';
            $scope.error = true;
        }

        if ("description" in eventValue){
            if(eventValue['description'] != ''){
                if(eventValue['description'].length < 30){
                    $scope.errorMsgDescription = 'Please enter detailed description (Must be more than 30 letters).';
                    $scope.error = true;
                }else{
                    $scope.errorMsgDescription = '';
                }
            }else{
                $scope.errorMsgDescription = 'Please enter event description.';
                $scope.error = true;
            }
        }else{
            $scope.errorMsgDescription = 'Please enter event description.';
            $scope.error = true;
        }
        return $scope.error;
    }

    $scope.reset = function(){
        $scope.filter = {};
    }

    $scope.filter = function(){
        requestHandler.preparePostRequest({
           url: '/getEvent',
            data: $scope.filter
        }).then(function (response) {
            $scope.loader = false;
            $scope.eventRowset = response;
        })
    }

}


function ManageController($scope, $rootScope, $state, $timeout, requestHandler){
    $rootScope.currentTab = "manage";
    $scope.filterFor = 'documentManage';

    $rootScope.formData = {};
    $rootScope.isFileExistCheck = false;
    $scope.spinLoader = false;

    $scope.addDocumentDetail = function() {

        $scope.message = '';

        var route = ($scope.isUpdate) ? 'updateDocument' : 'addDocument';

        $scope.saveDocument(route);

    }

    $scope.saveDocument = function(route){

        if($rootScope.imageCheck == 0){
            sweetAlert('Error..', 'Please upload only pdf file...', 'error');
            return;
        }

        $scope.spinLoader = true;
        var userData = {};
        //console.log($rootScope.isFileExistCheck);return;

        if(!$scope.isFileExistCheck){
            $scope.formData = new FormData();
        }

        angular.forEach($scope.searchFields, function(value, key) {
            $scope.formData.append(key,value);
        });

        requestHandler.prepareAttachmentRequest({
            url: route,
            data: $scope.formData

        }).then(function (response) {

            sweetAlert('Congratulation.', 'Document added successfully', 'success');
            $state.go('document');

        }).catch(function () {

        })
    };

}

angular.module('ithuseApp')
    .controller('DocumentController', ['$scope', '$rootScope', 'requestHandler', '$timeout', '$http', DocumentController])
    .controller('EventController', ['$scope', '$rootScope', '$state', '$timeout', 'requestHandler',   EventController])
    .controller('ManageController', ['$scope', '$rootScope', '$state', '$timeout', 'requestHandler',   ManageController]);

