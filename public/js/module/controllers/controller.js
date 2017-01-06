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

    $scope.getFilters = function(){

        requestHandler.preparePostRequest({

            url: '/getFilter'

        }).then(function (response) {

            $scope.filterData = response;

        }).catch(function () {

        })
    };

    $scope.getSubCategoryList = function(data){

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
            category :$scope.searchFields.category_name,
            subCategory:$scope.searchFields.subcategory_name

        }).then(function (response) {
            $timeout(function(){$scope.loader = false;}, 2000);
            //$scope.loader = false;
            $scope.documentData = response;
        }).catch(function () {

        })
    }

}

angular.module('ithuse')
    .controller('DocumentController', ['$scope', '$rootScope', 'requestHandler', '$timeout', '$http', DocumentController]);
