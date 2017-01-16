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

    $scope.deleteDocument = function(documentId){
        swal({
            title: 'Are you sure?',
            text: "You don't want to delete this event!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: true
        }).then(function(dismiss) {
            if(dismiss == true){
                requestHandler.preparePostRequest({
                    url: '/deleteDocument',
                    data: {
                        documentId:   documentId
                    }
                }).then(function (response) {
                    if(response){
                        swal(
                            'Good job!',
                            'Document Deleted Successfully!',
                            'success'
                        )
                        $scope.loader = false;
                        $scope.getDocuments();
                    }

                })
            }else{

            }
        });
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

            $scope.loader = false;
            $scope.documentData = response;
            console.log($scope.documentData);

        }).catch(function () {

        })
    }

    $scope.resetFilters = function(filterParentId) {

        $scope.searchFields.category_name = '';
        $scope.searchFields.subcategory_name = '';
        $scope.subCategoryList = {};
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
            $scope.loader = false;
            $scope.eventRowset = response;
        })
    }

    $scope.addEvent = function(){

        $scope.validateEvent($scope.event,'add');
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
                    swal({
                        title: 'Congratulation!',
                        text: 'Event Added Successfully!',
                        timer: 2000
                    }).then(
                        function () {
                            $scope.loader = false;
                            $state.go('event.list');
                        },
                        function (dismiss) {
                            $scope.loader = false;
                            $state.go('event.list');
                        }
                    )

                }

            })
        }

    }

    $scope.cancelEvent = function(message){
        swal({
            title: 'Are you sure?',
            text: message,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: true
        }).then(function(dismiss) {
           if(dismiss == true){
               $scope.loader = false;
               $state.go('event.list');
           }else{

           }


        });
    }

    $scope.editEvent = function(event_detail){

        $scope.validateEvent(event_detail,'edit');
        if($scope.errorEdit){
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
                url: '/editEvent',
                data: event_detail
            }).then(function (response) {
                if(response){
                    swal({
                        title: 'Congratulation!',
                        text: 'Event Successfully Edited!',
                        timer: 2000
                    }).then(
                        function () {
                            $scope.loader = false;
                            $state.go('event.list');
                        },
                        function (dismiss) {
                                $scope.loader = false;
                                $state.go('event.list');

                        }
                    )
                }

            })
        }

    }

    $scope.deleteEvent = function(eventId){
        swal({
            title: 'Are you sure?',
            text: "You don't want to delete this event!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: true
        }).then(function(dismiss) {
            if(dismiss == true){
                requestHandler.preparePostRequest({
                    url: '/deleteEvent',
                    data: {
                        event_id:   eventId
                    }
                }).then(function (response) {
                    if(response){
                        swal(
                            'Good job!',
                            'Event Deleted Successfully!',
                            'success'
                        )
                        $scope.loader = false;
                        $scope.getEvent();
                    }

                })
            }else{

            }
        });
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


    $scope.validateEvent = function(eventValue,eventFor){

        $scope.error = false;
        $scope.errorEdit = false;

        var date = new Date();

        var currentDate = date.getDate() + "/" + date.getMonth()+1+ "/"+date.getFullYear();
        var currentHour = date.getHours();
        var currentMinute = date.getMinutes();

        if ("date" in eventValue){

            if(eventValue['date'] != '' && eventValue['date'] != null){
                if ("myTime" in eventValue) {
                    if(eventValue['myTime'] != '' && eventValue['myTime'] != null){

                        if(currentDate == eventValue['date']){

                            var eventTime  = eventValue['myTime'].split(':');

                            console.log(eventTime);
                            console.log(currentHour + " " + currentMinute);

                            if(currentHour <= eventTime[0]){

                                if(currentHour == eventTime[0]){
                                    if(currentMinute >= eventTime[1]){
                                        $scope.errorMsgDateTime = "You can't create event for past Date & Time.";
                                        $scope.error = true;
                                    }else{
                                        $scope.errorMsgDateTime = '';
                                    }
                                }else{
                                    $scope.errorMsgDateTime = '';
                                }

                            }else{
                                $scope.errorMsgDateTime = "You can't create event for past Date & Time.";
                                $scope.error = true;
                            }
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

        }else{
            $scope.errorMsgDateTime = 'Please select event Date & Time.';
            $scope.error = true;
        }

        if ("event_date" in eventValue){

            if(eventValue['event_date'] != '' && eventValue['event_date'] != null){
                if ("event_time" in eventValue) {
                    if(eventValue['event_time'] != '' && eventValue['event_time'] != null){
                        $scope.errorMsgEventDateTime = '';
                    }else{
                        $scope.errorMsgEventDateTime = 'Please select event Date & Time.';
                        $scope.errorEdit = true;
                    }
                }else{
                    $scope.errorMsgEventDateTime = 'Please select event Date & Time.';
                    $scope.errorEdit = true;
                }
            }else{
                $scope.errorMsgEventDateTime = 'Please select event Date & Time.';
                $scope.errorEdit = true;
            }

        }else{
            $scope.errorMsgEventDateTime = 'Please select event Date & Time.';
            $scope.errorEdit = true;
        }

        if ("place" in eventValue){
            if(eventValue['place'] != '' && eventValue['place'] != null){
                $scope.errorMsgPlace = '';
            }else{
                $scope.errorMsgPlace = 'Please select event venue.';
                $scope.error = true;
            }
        }else{
            $scope.errorMsgPlace = 'Please enter event venue.';
            $scope.error = true;
        }

        if ("event_venue" in eventValue){
            if(eventValue['event_venue'] != '' && eventValue['event_venue'] != null){
                $scope.errorMsgEventPlace = '';
            }else{
                $scope.errorMsgEventPlace = 'Please select event venue.';
                $scope.errorEdit = true;
            }
        }else{
            $scope.errorMsgEventPlace = 'Please enter event venue.';
            $scope.errorEdit = true;
        }

        if ("title" in eventValue){
            if(eventValue['title'] != '' && eventValue['title'] != null){
                $scope.errorMsgTitle = '';
                $scope.errorMsgEventTitle = '';

            }else{
                $scope.errorMsgTitle = 'Please enter event title.';
                $scope.errorMsgEventTitle = 'Please enter event title.';
                $scope.error = true;
                $scope.errorEdit = true;
            }
        }else{
            $scope.errorMsgTitle = 'Please enter event title.';
            $scope.errorMsgEventTitle = 'Please enter event title.';
            $scope.error = true;
            $scope.errorEdit = true;
        }

        if ("description" in eventValue){
            if(eventValue['description'] != '' && eventValue['description'] != null){
                if(eventValue['description'].length < 30){
                    $scope.errorMsgDescription = 'Please enter detailed description (Must be more than 30 letters).';
                    $scope.errorMsgEventDescription = 'Please enter detailed description (Must be more than 30 letters).';
                    $scope.error = true;
                    $scope.errorEdit = true;
                }else{
                    $scope.errorMsgDescription = '';
                    $scope.errorMsgEventDescription = '';
                }
            }else{
                $scope.errorMsgDescription = 'Please enter event description.';
                $scope.errorMsgEventDescription = 'Please enter event description.';
                $scope.error = true;
                $scope.errorEdit = true;
            }
        }else{
            $scope.errorMsgDescription = 'Please enter event description.';
            $scope.errorMsgEventDescription = 'Please enter event description.';
            $scope.error = true;
            $scope.errorEdit = true;
        }
        if(eventFor == 'add'){
            return $scope.error;
        }else{
            return $scope.errorEdit;
        }

    }

    $scope.resetFilter = function(){
        $scope.searchFields = {
            event_title : '',
            event_time : '',
            event_status : ''
        };
        $scope.getEvent();
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
    $scope.error  =false;
    $scope.filter = {};

    $scope.addDocumentDetail = function() {

        $scope.validateForm($scope.searchFields);

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
            $scope.message = '';
            var route = ($scope.isUpdate) ? 'updateDocument' : 'addDocument';
            requestHandler.preparePostRequest({
                url: '/fileExistance',
                data:  $scope.searchFields
            }).then(function (response) {
                if(response.length == undefined){
                    swal({
                        title: 'Document already uploaded!',
                        text: "You want to overwrite the previous document for selected category and sub category",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        confirmButtonClass: 'btn btn-success',
                        cancelButtonClass: 'btn btn-danger',
                        buttonsStyling: true
                    }).then(function(dismiss) {
                        if(dismiss == true){
                            $scope.saveDocument(route);
                        }else{

                        }
                    });
                }else{
                    $scope.saveDocument(route);
                }
            })
        }

    }

    $scope.saveDocument = function(route){

        if($rootScope.imageCheck == 0){
            sweetAlert('Error..', 'Please upload a pdf file', 'error');
            return;
        }

        if($rootScope.imageCheck == undefined){
            sweetAlert('Error..', 'Please select a file', 'error');
            return;
        }

        $scope.spinLoader = true;
        var userData = {};
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

            if(response == 'Success') {
                sweetAlert('Congratulation.', 'Document added successfully', 'success');
                $scope.searchFields = {};
                $scope.searchFields.document_title = '';
                $state.go('document');
            } else{
                sweetAlert('Opppppssss', 'Document already Exist', 'error');
                $scope.searchFields = {};
                $scope.searchFields.document_title = '';
                $state.go('document');
            }

        }).catch(function () {

        })
    };

    $scope.validateForm = function(formData){

        $scope.error = false;
        if ("category_name" in formData){
            if(formData['category_name'] != '' && formData['category_name'] != null){
                $scope.errorCategoryName = '';
            }else{
                $scope.errorCategoryName = 'Please select category name';
                $scope.error = true;
            }
        }else{
            $scope.errorCategoryName = 'Please select category name';
            $scope.error = true;
        }

        if ("subcategory_name" in formData){
            if(formData['subcategory_name'] != '' && formData['subcategory_name'] != null){
                $scope.errorSubCategoryName = '';
            }else{
                $scope.errorSubCategoryName = 'Please select sub category name';
                $scope.error = true;
            }
        }else{
            $scope.errorSubCategoryName = 'Please select sub category name';
            $scope.error = true;
        }

         if ("document_title" in formData){
            if(formData['document_title'] != '' && formData['document_title'] != null){
                $scope.errorDocumentTitle = '';
            }else{
                $scope.errorDocumentTitle = 'Please enter document title';
                $scope.error = true;
            }

        }else{
            $scope.errorDocumentTitle = 'Please enter document title';
            $scope.error = true;
        }

        return $scope.error;
    }

}

angular.module('ithuseApp')
    .controller('DocumentController', ['$scope', '$rootScope', 'requestHandler', '$timeout', '$http', DocumentController])
    .controller('EventController', ['$scope', '$rootScope', '$state', '$timeout', 'requestHandler',   EventController])
    .controller('ManageController', ['$scope', '$rootScope', '$state', '$timeout', 'requestHandler',   ManageController]);

