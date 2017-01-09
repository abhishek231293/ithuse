'use strict';

function DocumentController($scope, $rootScope, requestHandler, $timeout, $http) {

    $scope.loader = false;
    $scope.searchFields = {};
    $scope.login = false;

    $scope.setLoginText = function (value) {
        if($scope.login){
            $scope.loadValue = value;
        }else {
            $scope.login = true;
            $scope.loadValue = value;
        }

    }

    $scope.activeMe = function(id){
        $( ".nav-label" ).parent().parent().removeClass( "active" );
        $('#'+id).addClass("active");
    };

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

}

angular.module('ithuse')
    .controller('DocumentController', ['$scope', '$rootScope', 'requestHandler', '$timeout', '$http', DocumentController]);
