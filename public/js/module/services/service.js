'use strict';
(function(module){
    function requestHandler($http, $q){
        return{
            prepareRequest              : prepareRequest,
            preparePostRequest          : preparePostRequest,
            prepareAttachmentRequest     : prepareAttachmentRequest,
            prepareGetRequest           : prepareGetRequest,
            preparePutRequest           : preparePutRequest,
            prepareDeleteRequest        : prepareDeleteRequest
        }

        var postParam = {
            method  : 'POST',
            url     : '',
            data    : '',
            headers : {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest : false
        }

        var getParam = {
            method  : 'GET',
            url     : '',
        }


        function prepareRequest(method, param){
            var requestParam = (method.toUpperCase() == 'POST') ? $.extend({}, postParam, param) : $.extend({}, getParam, param);

            if(method.toUpperCase() == 'POST'){
                requestParam.data = (requestParam.data) ? $.param(requestParam.data) : "";
            }

            return $http(requestParam)
                .then(sendResponseData )
                .catch(sendResponseError);
        }

        function preparePostRequest($param) {
            $param.data = ($param.data) ? $.param($param.data) : "";
//            var token = authService.getAuthToken();
//            if(token) {
//               var tokenSet =  $.param({data : {'auth_token' : token, 'request_type' : 'ajax' }});
//                $param.data = ($param.data) ? $param.data+'&'+tokenSet : tokenSet;
//               
//            }

            return $http({
                method  : 'POST',
                url     : $param.url,
                data    : $param.data,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest : false
            })
                .then(sendResponseData )
                .catch(sendResponseError )
        }

        function prepareAttachmentRequest($param) {
            return $http({
                method : 'POST',
                url : $param.url,
                data : $param.data,
                processData: false,
                contentType: false,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            })
                .then(sendResponseData )
                .catch(sendResponseError )
        }


        function preparePutRequest($param) {
            $param.data = ($param.data) ? $.param($param.data) : "";

            return $http({
                method  : 'PUT',
                url     : $param.url,
                data    : $param.data,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest : false
            })
                .then(sendResponseData )
                .catch(sendResponseError )
        }

        function prepareDeleteRequest($param) {
            $param.data = ($param.data) ? $.param($param.data) : "";

            return $http({
                method  : 'DELETE',
                url     : $param.url,
                data    : $param.data,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest : false
            })
                .then(sendResponseData )
                .catch(sendResponseError )
        }



        function prepareGetRequest($param){
            return $http({
                method  : 'GET',
                url     : $param.url,
            })
                .then(sendResponseData )
                .catch(sendResponseError )
        }


        function sendResponseData(response) {return response.data;}
        function sendResponseError(response) {return $q.reject('Error retrieving book(s). (HTTP status: ' + response.status + ')');}

    };


    function stateParamService(){
        return {
            params : {}
        };
    }

    module
        .factory('requestHandler', ['$http', '$q', requestHandler])

        .factory('stateParamService', [stateParamService])

    //  -------------   data service ---------------- 

}(angular.module('ithuseApp')));


