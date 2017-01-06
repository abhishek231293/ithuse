'use strict';

function DocumentController($scope, $rootScope, requestHandler, $timeout, $http) {

    $scope.loader = false;
    $scope.searchFields = {};

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

            url: '/getDocumentLists'

        }).then(function (response) {

            $scope.loader = false;
            $scope.documentData = response;
        }).catch(function () {

        })
    }
    
}

angular.module('ithuse')
    .controller('DocumentController', ['$scope', '$rootScope', 'requestHandler', '$timeout', '$http', DocumentController]);
