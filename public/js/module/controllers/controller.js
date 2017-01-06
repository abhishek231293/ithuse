'use strict';

function DocumentController($scope, $rootScope, requestHandler, $timeout, $http) {

    $scope.loader = false;
    
    $scope.getFilters = function(){

        requestHandler.preparePostRequest({

            url: '/getFilter'

        }).then(function (response) {

            $scope.filter = response;

            $scope.filterData = response;

            console.log($scope.filterData);

        }).catch(function () {

        })
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
