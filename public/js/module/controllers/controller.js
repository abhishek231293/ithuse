'use strict';

function DocumentController($scope, $rootScope, requestHandler, $timeout, $http) {
    $rootScope.currentTab = "document";
    $scope.loader = false;
    $scope.searchFields = {};
    $scope.login = false;
    $scope.addTitleFilter = false;
    $scope.filterFor = 'documentList';
    $scope.total = 0;
    $scope.setLoginText = function (value) {
        if($scope.login){
            $scope.loadValue = value;
        }else {
            $scope.login = true;
            $scope.loadValue = value;
        }
    }

    $scope.confirmLogout = function () {
        swal({
            title: 'Are you sure?',
            text: "You want to logout!",
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
                requestHandler.prepareGetRequest({
                    url: '/logout'
                }).then(function (response) {
                    location.reload();
                })
            }else{

            }
        });
    }

    $scope.deleteDocument = function(documentId){
        swal({
            title: 'Are you sure?',
            text: "You want to delete this document!",
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
        $scope.route = 'getDocumentLists';

        requestHandler.preparePostRequest({
            url: '/getDocumentLists',
            data :{
                category :$scope.searchFields.category_name,
                subCategory:$scope.searchFields.subcategory_name
            }
        }).then(function (response) {

            $scope.loader = false;
            $scope.documentData = response.paginate.data;
            $scope.paginate = response.paginate;
            $scope.total = response.paginate.total;

            $scope.currentPage = response.paginate.current_page;
            $scope.getPages($scope.paginate.last_page);

        }).catch(function () {

        })
    }

    $scope.getPages = function(n){

        var data = new Array();

        for (var i = 1; i <= n; i++) {
            data[i-1] = i;
        }
        $scope.pages = data;

    }

    $scope.resetFilters = function(filterParentId) {
        $scope.searchFields.category_name = '';
        $scope.searchFields.subcategory_name = '';
        $scope.subCategoryList = {};
        $scope.getDocuments();

    }

    $scope.previousPage = function(){
        if($scope.currentPage == 1){
            return;
        }

        $scope.currentPage = $scope.currentPage -1;
        $scope.getPageRequest();

    }

    $scope.changePage = function(){

        // $scope.currentPage = $scope.currentPage;
        $scope.currentPage = parseInt($("#currentPage").val())+1;

        console.log($scope.currentPage);
        $scope.getPageRequest();

    }

    $scope.nextPage = function() {

        if ($scope.paginate.last_page-1 < $scope.currentPage) {
            return;
        }

        $scope.currentPage ++;
        //console.log($scope.currentPage);return;
        $scope.getPageRequest();
    }

    $scope.getPageRequest = function(){

        $scope.loader = true;

        requestHandler.preparePostRequest({

            url: '/'+$scope.route,
            data : {
                page :$scope.currentPage
            }
        }).then(function (response) {
            $scope.loader = false;
            $scope.documentData = response.paginate.data;
            $scope.paginate = response.paginate;
            //$scope.getPages($scope.paginate.last_page);

        }).catch(function () {

        })
    }

}

function EventController($scope, $rootScope, $state, $timeout, requestHandler) {

    $rootScope.currentTab = "event";
    $scope.event = {};
    $scope.filter = {};
    $scope.loader = false;
    $scope.error = false;
    $scope.errorMsgDate = '';
    $scope.errorMsgTime = '';
    $scope.errorMsgTitle = '';
    $scope.errorMsgDescription = '';
    $scope.errorMsgPlace = '';
    $scope.searchFields = {};
    $rootScope.eventReadMoreTitle = '';
    $rootScope.eventReadMoreDescription = '';

    $scope.getEvent = function(){

        $scope.route = 'getEvent';
        $scope.loader = true;
        requestHandler.preparePostRequest({
            url: '/getEvent',
            data :{
                title :$scope.searchFields.event_title,
                time:$scope.searchFields.event_time,
                end_time:$scope.searchFields.event_end_time,
                status:$scope.searchFields.event_status
            }
        }).then(function (response) {
            var pending = 0;
            var complete = 0;

            angular.forEach(response.allData, function(value, key){

                if(value.status == "pending") {
                    pending++;
                } else {
                    complete++;
                }

            });
            $scope.loader = false;
            $scope.eventRowset = response.paginate.data;
            $scope.paginate = response.paginate;
            $scope.total = response.paginate.total;

            $scope.currentPage = response.paginate.current_page;
            $scope.getPages($scope.paginate.last_page);

            $scope.pending = pending;
            $scope.complete = complete;
        })
    }

    $scope.getPages = function(n){
        var data = new Array();
        for (var i = 1; i <= n; i++) {
            data[i-1] = i;
        }
        $scope.pages = data;
    }


    $scope.previousPage = function(){

        if($scope.currentPage == 1){
            return;
        }
        $scope.currentPage = $scope.currentPage -1;
        $scope.getPageRequest();
    }

    $scope.changePage = function(){
        $scope.currentPage = $scope.currentPage;
        $scope.getPageRequest();
    }

    $scope.nextPage = function() {

        if ($scope.paginate.last_page-1 < $scope.currentPage) {
            return;
        }

        $scope.currentPage ++;
        //console.log($scope.currentPage);return;
        $scope.getPageRequest();
    }

    $scope.getPageRequest = function(){

        $scope.loader = true;
        requestHandler.preparePostRequest({

            url: '/'+$scope.route,
            data : {
                page :$scope.currentPage
            }
        }).then(function (response) {

            $scope.loader = false;
            $scope.eventRowset = response.paginate.data;
            $scope.paginate = response.paginate;
            $scope.getPages($scope.paginate.last_page);

        }).catch(function () {

        })
    }

    $scope.addEvent = function(){

        $scope.validateEvent($scope.event,'add');

        if($scope.error){
            swal({
                title: 'Oops Something went wrong!',
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
                title: 'Oops Something went wrong!',
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
            text: "You want to delete this event!",
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

                $scope.eventEditDetail = response['allData'];
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
                if(eventValue['place'].length < 10){
                    $scope.errorMsgPlace = 'Please provide detailed venue(Must be more than 10 alphabets.)';
                    $scope.error = true;
                }else{
                    $scope.errorMsgPlace = '';
                }

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
                if(eventValue['title'].length < 10){
                    $scope.errorMsgTitle = 'Title must be more than 10 alphabets.';
                    $scope.errorMsgEventTitle = 'Title must be more than 10 alphabets.';
                    $scope.error = true;
                    $scope.errorEdit = true;
                }else{
                    $scope.errorMsgTitle = '';
                    $scope.errorMsgEventTitle = '';
                }

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
                    $scope.errorMsgDescription = 'Please enter detailed description (Must be more than 30 alphabets).';
                    $scope.errorMsgEventDescription = 'Please enter detailed description (Must be more than 30 alphabets).';
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
            event_status : '',
            event_end_time : ''
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

    $scope.openModal = function(details){
        $rootScope.eventReadMoreTitle = details['title'];
        $rootScope.eventReadMoreDescription = details['description'];
        $rootScope.eventReadMoreVenue = details['event_venue'];
        $rootScope.eventReadMoreDate = details['event_date'];
        $rootScope.eventReadMoreTime = details['event_time'];
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
    $scope.upload = false;
    $scope.uploadClass = "fa fa-upload";
    $scope.searchFields.document_title = '';
    
    $scope.setUploadName = function(value){

        if($scope.upload){
            $scope.uploadClass = "fa fa-spinner";
            $scope.uploadValue = value;
            $scope.upload = false;
        }else {
            $scope.uploadClass = "fa fa-upload";
            $scope.upload = true;
            $scope.uploadValue = value;
        }
    }

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

            /*
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
            */

            $scope.saveDocument(route);
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

        $scope.setUploadName('Uploading...');

        requestHandler.prepareAttachmentRequest({

            url: route,
            data: $scope.formData

        }).then(function (response) {

            if(response == 'Success') {

                swal({
                    title: 'Document added successfully',
                    text: "You want to add new document?",
                    type: 'success',
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
                        location.reload();
                    }else{
                        $scope.searchFields = {};
                        $scope.searchFields.document_title = '';
                        $state.go('document');
                    }
                });


            } else{
                sweetAlert('Oops', 'Something went wrong try again', 'error');
                $scope.searchFields = {};
                $scope.searchFields.document_title = '';
            }

            $scope.setUploadName('Upload');

        }).catch(function () {

        })
    };

    $scope.validateForm = function(formData){

        $scope.error = false;
        if ("category_name" in formData){
            if(formData['category_name'] != '' && formData['category_name'] != null){
                $scope.errorCategoryName = '';
            }else{
                $scope.errorCategoryName = 'Please select department';
                $scope.error = true;
            }
        }else{
            $scope.errorCategoryName = 'Please select department';
            $scope.error = true;
        }

        if ("subcategory_name" in formData){
            if(formData['subcategory_name'] != '' && formData['subcategory_name'] != null){
                $scope.errorSubCategoryName = '';
            }else{
                $scope.errorSubCategoryName = 'Please select category';
                $scope.error = true;
            }
        }else{
            $scope.errorSubCategoryName = 'Please select category';
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

