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

    $scope.addEvent = function(){

        console.log($scope.event);return;
        requestHandler.preparePostRequest({
            url: '/addEvent',
            data: $scope.event
        }).then(function (response) {
            $scope.loader = false;
            $state.go('event.list');
        })
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

    $scope.getEvent = function(){
        $scope.loader = true;
        requestHandler.preparePostRequest({
           url: '/getEvent',
           data: {}
        }).then(function (response) {
            $timeout(function(){$scope.loader = false;}, 2000);
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


        $scope.saveEvent(route);

    }

    $scope.saveEvent = function(route){

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

            sweetAlert('Done..', 'Congo..', 'success');

            // $scope.result = response.result;
            //
            // $scope.myEventId = $scope.result.id;
            // $scope.myEventName = $scope.result.event_name;
            // console.log($scope.myEventId);
            //$scope.message = response.message;


            // if(!$scope.isUpdate){
            //     $scope.resetFields();
            //     $scope.resetUserFields();
            // }

        }).catch(function () {

        })
    };

}

angular.module('ithuseApp')
    .controller('DocumentController', ['$scope', '$rootScope', 'requestHandler', '$timeout', '$http', DocumentController])
    .controller('EventController', ['$scope', '$rootScope', '$state', '$timeout', 'requestHandler',   EventController])
    .controller('ManageController', ['$scope', '$rootScope', '$state', '$timeout', 'requestHandler',   ManageController]);

