'use strict';

function DashboardController($scope, $rootScope, requestHandler, $timeout, $http) {
    $scope.search =  {};
    $scope.currentPage = 1;
    $scope.viewEvent = true;
    $scope.eventContainer  = (role == 'company') ? true : false;
    $scope.userContainer = (role == 'company') ? false : true;
    $scope.searchContainer = false;
    $scope.viewEventByCandidate = false;
    $scope.detailEventByCandidate = false;
    $scope.addEvent = false;
    $scope.detailEvent = false;
    $scope.route = 'viewEvent';
    $scope.changePassword = false;
    $scope.detailApplication = false;
    $scope.viewComment = true;
    $scope.previousPagination  = {};
    $scope.imageCheck  = {};
    $scope.allLoader  = {
        'spinLoader' : false
    };
    $scope.myPaymentAmount = 30;

    $scope.eventFields =  {
        event_name : '',
        event_date : '',
        event_time : '',
        venue : '',
        address : '',
        map_location : '',
        message : '',
        event_schedule : '',
        is_paid : ''
    };

    $scope.registerFields =  {
        first_name: '',
        last_name: '',
        contact_number: '',
        password: '',
        confirm_password: ''
    };

    $scope.contactFields =  {
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        contact_message: '',
        errorMessage: '',
        spinLoader: '',
        resultData: ''
    };

    $scope.requiredFields = {};
    $scope.contactRequiredFields = {};


    $scope.setFields = function(data){

        console.log(data);

        angular.forEach(data, function(value, key) {

            switch (key) {
                case 'event_name':
                    $scope.eventFields['event_name'] = value;
                    break;
                case 'event_date':
                    $scope.eventFields['event_date'] = value;
                    break;
                case 'event_time':
                    $scope.eventFields['event_time'] = value;
                    break;
                case 'venue':
                    $scope.eventFields['venue'] = value;
                    break;
                case 'address':
                    $scope.eventFields['address'] = value;
                    break;
                case 'map_location':
                    $scope.eventFields['map_location'] = value;
                    break;
                case 'rsvp_msg':
                    $scope.eventFields['message'] = value;
                    break;
                case 'event_schedule':
                    $scope.eventFields['event_schedule'] = value;
                    break;
                case 'is_paid':
                    $scope.eventFields['is_paid'] = value;
                    break;
                default:

            }



        });

        //console.log($scope.eventFields);

    };

    $scope.resetFields = function(){
        //console.log("teting here");
        angular.forEach($scope.eventFields, function(value, key) {

            $scope.eventFields[key] = '';
            $("#"+key+"-req").css('display', 'none');
        })
    };

    $scope.resetUserFields = function(){
        //console.log("teting here");
        angular.forEach($scope.registerFields, function(value, key) {

            $scope.registerFields[key] = '';
            $("#"+key+"-req").css('display', 'none');
        })
    };


    $scope.resetAllFields = function(field){

        angular.forEach($scope[field], function(value, key) {

            $scope[field][key] = '';
            $("#"+key+"-req").css('display', 'none');
        })
    };

    $scope.resetRequiredMessage = function(){
        //console.log("teting here");
        angular.forEach($scope.eventFields, function(value, key) {

            $("#"+key+"-req").css('display', 'none');
        })
    };


    $scope.setRequiredFields = function(type){
        var data = '';
        switch(type){
            case 'event' : {
                $scope.eventRequiredFields = {
                    event_name       : $scope.eventFields['event_name'],
                    event_date       : $scope.eventFields['event_date'],
                    //event_time       : $scope.eventFields['event_time'],
                    //address          : $scope.eventFields['address'],
                    message          : $scope.eventFields['message'],
                    //is_paid          : $scope.eventFields['is_paid']
                };
                data = $scope.eventRequiredFields;

            }break;

            case 'register' : {
                $scope.registerRequiredFields = {
                    first_name       : $scope.registerFields['first_name'],
                    last_name        : $scope.registerFields['last_name'],
                    contact_number   : $scope.registerFields['contact_number'],
                    password         : $scope.registerFields['password'],
                    confirm_password : $scope.registerFields['confirm_password']
                };
                data = $scope.registerRequiredFields;

            }break;

            case 'contactFields' : {
                $scope.contactRequiredFields = {
                    contact_name       : $scope.contactFields['contact_name'],
                    contact_email      : $scope.contactFields['contact_email'],
                    contact_phone      : $scope.contactFields['contact_phone'],
                    contact_message    : $scope.contactFields['contact_message']
                };
                data = $scope.contactRequiredFields;

            }break;
        }

        return data;

    };

    $scope.validateFields = function(type){

        var data = $scope.setRequiredFields(type);

        //console.log(data);
        //console.log($scope.eventFields.event_time);

        $scope.errorMessage = '';

        var dataToreturn = true;
        angular.forEach(data, function(value, key) {

            if(dataToreturn){
                if(!value){
                    //console.log(key);
                    $("#"+key+"-req").css('display', 'inline');
                    $("#"+key+"-field").focus();

                    //console.log($("#"+key+"-req"));

                    if(type == 'contactFields'){
                        $scope[type].errorMessage = 'This field is required.';

                        //console.log($scope[type].errorMessage)
                    }else{
                        $scope.errorMessage = 'This field is required.';
                    }

                    dataToreturn = false;

                }else if(key){

                    switch(key){
                        case 'contact_number' :{
                            if(isNaN(value)){
                                $("#"+key+"-field").focus();
                                $scope.errorMessage = 'Number not valid.';
                                dataToreturn = false;
                            }else{
                                $("#"+key+"-req").css('display', 'none');
                            }

                        }break;

                        case 'contact_phone' :{
                            if(isNaN(value)){
                                $("#"+key+"-field").focus();
                                $scope[type].errorMessage = 'Number not valid.';
                                $("#"+key+"-req").css('display', 'inline');
                                dataToreturn = false;
                            }else{
                                $("#"+key+"-req").css('display', 'none');
                            }

                        }break;

                        case 'contact_email' :{
                            var atpos = value.indexOf("@");
                            var dotpos = value.lastIndexOf(".");
                            if (atpos<1 || dotpos<atpos+2 || dotpos+2>=value.length) {
                                $("#"+key+"-field").focus();
                                $scope[type].errorMessage = 'Please provide a valid email address.';
                                $("#"+key+"-req").css('display', 'inline');
                                dataToreturn = false;
                            }else{
                                $scope[type].errorMessage = '';
                                $("#"+key+"-req").css('display', 'none');
                            }
                        }break;

                        case 'confirm_password' :{
                            if(data['confirm_password'] != data['password']){
                                $("#"+key+"-field").focus();
                                $scope.errorMessage = 'Password not matched.';
                                $("#"+key+"-req").css('display', 'inline');
                                dataToreturn = false;
                            }else{
                                $("#"+key+"-req").css('display', 'none');
                            }

                        }break;

                        case 'event_date' :{
                            var dateField = value.split("/");

                            if(dateField.length != 3){
                                $("#"+key+"-field").focus();
                                $scope.errorMessage = 'Please provide date in valid format..';
                                $("#"+key+"-req").css('display', 'inline');
                                dataToreturn = false;
                            }else{
                                $scope.errorMessage = '';
                                $("#"+key+"-req").css('display', 'none');
                            }

                        }break;

                        case 'event_time' :{
                            var dateField = value.split(":");

                            if(dateField.length != 2){
                                $("#"+key+"-field").focus();
                                $scope.errorMessage = 'Please provide time in valid format..';
                                $("#"+key+"-req").css('display', 'inline');
                                dataToreturn = false;
                            }else{
                                $scope.errorMessage = '';
                                $("#"+key+"-req").css('display', 'none');
                            }

                        }break;


                        default :
                            $("#"+key+"-req").css('display', 'none');
                    }

                }else{
                    //console.log(key);
                    $("#"+key+"-req").css('display', 'none');
                }
            }
        });

        return dataToreturn;

    };

    $scope.addEventDetail = function(pageType) {

        //console.log($scope.eventFields);return;

        $scope.eventFields['event_time'] = $("#event_time-field").val();

        $scope.message = '';

        var route = ($scope.isUpdate) ? 'updateEvent' : 'addEvent';


        if(pageType == 'home-page'){
            if(!$scope.validateFields('register')){
                return;
            }
        }


        if(!$scope.validateFields('event')){
            return;
        }
        $scope.saveEvent(route, pageType);


    };

    $rootScope.formData = {};
    $rootScope.isFileExistCheck = false;
    $scope.spinLoader = false;

    $scope.resetFile = function(type){
        $rootScope.isFileExistCheck = false;
        $('#event_image_0').val('');
        $('#event_image_1').val('');
        $("#event_image__name_0").html('');
        $("#event_image__name_1").html('');
        if(type == 'edit'){

            var imageName = $scope.updateData.image_1.split('uploads/');

            $("#event_image__name_0").html(imageName[1]);

            imageName = $scope.updateData.image_2.split('uploads/');


            $("#event_image__name_1").html(imageName);
        }

    };

    $scope.userRegister = function(data, route){

        var result;
        $.ajax({
            url: '/'+route,
            data: {
                data : data
            },
            type: 'POST',
            async: false,
            success: function(response) {
                result = JSON.parse(response);
            }
        });

        return result;
    };


    /*-------------------------------------Add contact starts here-----------------------------------*/

    $scope.addResponse = function(route, field){

        if(!$scope.validateFields(field)){
            return;
        }
        $scope[field].spinLoader = true;
        requestHandler.preparePostRequest({

            url: '/'+route,
            data: {
                data : $scope[field]
            }

        }).then(function (response) {

            $scope[field].spinLoader = false;
            sweetAlert(response.messageTitle, response.message, response.messageType);

            $scope.resetAllFields(field);

            $scope[field].resultData = response.result;

            console.log($scope.contactFields);

        }).catch(function () {

        })
    };

    /*-------------------------------------Add contact ends here -----------------------------------*/

    $scope.myEventId = '';
    $scope.myEventName = '';
    $scope.saveEvent = function(route, pageType){

        if($rootScope.imageCheck == 0){
            sweetAlert('Error..', 'Please select valid image file..', 'error');
            return;
        }

        $scope.spinLoader = true;
        var userData = {};
        //console.log($rootScope.isFileExistCheck);return;

        if(pageType == 'home-page'){

            $scope.contactNumber = '';
            $scope.userPassword = '';

            userData = $scope.userRegister($scope.registerFields, 'user-register');

            if(userData.response == 400){
                sweetAlert(userData.messageTitle, userData.message, userData.messageType);
                $scope.spinLoader = false;
                return;
            }

            $scope.contactNumber  = userData.result.contact_number;
            $scope.userPassword   = userData.result.password;

            //console.log(userData.result);return;
        }

        if(!$rootScope.isFileExistCheck){
            $rootScope.formData = new FormData();

        }

        angular.forEach($scope.eventFields, function(value, key) {
            //console.log(key + ': ' + value);
            $rootScope.formData.append(key,value);
        });


        if(route == 'updateEvent'){
            $rootScope.formData.append('eventId',$scope.eventId);
        }

        if(pageType == 'home-page'){

            $rootScope.formData.append('userId',userData.result.id);
        }

        //console.log($rootScope.formData);


        requestHandler.prepareAttachmentRequest({
            url: route,
            data: $rootScope.formData

        }).then(function (response) {

            $scope.spinLoader = false;
            sweetAlert(response.messageTitle, response.message, response.messageType);

            $scope.result = response.result;

            console.log($scope.result);
            $scope.myEventId = $scope.result.id;
            $scope.myEventName = $scope.result.event_name;
            console.log($scope.myEventId);
            //$scope.message = response.message;

            if(pageType != 'home-page'){
                $scope.viewEventDetail();
            }

            if(!$scope.isUpdate){
                $scope.buyPlan = true;

                if(pageType != 'home-page'){
                    $scope.moveToTop();
                }

            }

            if(!$scope.isUpdate){
                $scope.resetFields();
                $scope.resetUserFields();
            }

        }).catch(function () {

        })
    };


    $scope.isUpdate = false;

    $scope.editEvent = function(eventId){

        //console.log("here");
        $scope.isUpdate = true;
        $scope.viewEvent = !$scope.viewEvent;
        $scope.addEvent = !$scope.addEvent;

        $scope.resetRequiredMessage();

        var dataToreturn = true;
        var myDate = [];

        angular.forEach($scope.viewEventData, function(value, key) {

            if(dataToreturn){
                if(value.id == eventId){
                    $scope.updateData = value;

                    if($scope.updateData['event_date']){
                        myDate = $scope.updateData['event_date'].split('-');

                        if(myDate.length == 3){
                            console.log(myDate);
                            $scope.updateData['event_date'] = myDate[2] + '/' + myDate[1] + '/' + myDate[0];
                        }

                    }

                    dataToreturn = false;
                }
            }

        });

        $scope.setFields($scope.updateData);
        $scope.eventId = eventId;

        //console.log($scope.eventFields);return;

    };

    $scope.updateEvent = function(){

        $scope.loader = true;
        requestHandler.preparePostRequest({

            url: '',
            data: {
                eventId : $scope.eventId,
                field : $scope.eventFields
            }

        }).then(function (response) {

            $scope.loader = false;

            sweetAlert("Sucess..!", response.message, "success");
            $scope.result = response.result;

            //$scope.message = response.message;
            $scope.viewEventDetail();
            $scope.resetFields();


        }).catch(function () {

        })

    };

    $scope.deleteEvent = function(eventId){

        swal({
            text: "You will not be able to recover this Event!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        }).then(function(isConfirm) {
            if (isConfirm === true) {

                requestHandler.preparePostRequest({

                    //url: 'deleteEvent',
                    url: 'updateEventStatus',
                    data: {
                        eventId : eventId
                    }

                }).then(function (response) {

                    if(response.statusCode == '200'){
                            //$scope.viewEventDetail();
                           $scope.getPageRequest();
                    }

                }).catch(function () {

                });

                swal(
                    'Deleted!',
                    'Your Event has been deleted.',
                    'success'
                );
            } else if (isConfirm === false) {
                swal(
                    'Cancelled',
                    'Your Event is safe :)',
                    'error'
                );
            } else {

            }
        })

    };

    $scope.save = function(data, route){

        //console.log(data); console.log(route);

        $scope.loader = true;
        requestHandler.preparePostRequest({

            url: '/'+route,
            data: {
                data : data
            }

        }).then(function (response) {

            $scope.loader = false;
            sweetAlert(response.messageTitle, response.message, response.messageType);

            //$scope.result = response.result;
            $scope.message = response.message;

            if(route == 'question'){
                //$scope.resetFields();
                $scope.questionFields.question = '';
                $scope.category = response.result.category;
                $scope.viewQuestionDetail(data['questionCategory']);
            }


        }).catch(function () {

        })
    };

    $scope.update = function(data, route){

        //console.log(data);return;

        $scope.loader = true;
        requestHandler.preparePutRequest({

            url: '/'+route+'/'+data['id'],
            data: {
                data : data
            }

        }).then(function (response) {

            $scope.loader = false;
            sweetAlert(response.messageTitle, response.message, response.messageType);

            //$scope.result = response.result;
            $scope.message = response.message;

            //console.log(route);
            switch(route){

                case 'event' : {
                    $scope.getPageRequest();
                }break;
            }

            switch(data['request-type']){

                case 'update-profile' : {
                    if(response.result)
                        $scope.profileData = response.result[0];
                        $scope.updateProfileFields = angular.extend({}, response.result[0]);
                }break;
            }


        }).catch(function () {

        })

    };

    $scope.block = function(data, type) {

        $scope.dataToUpdate = {
            'id': data.id,
            'is_active': (data.is_active == 1) ? 0 : 1,
            'request_type': 'block'
        };

        //console.log($scope.dataToUpdate);return;

        swal({
            text: "You are going to " + type + " this " + $scope.route + "!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, " + type + " it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        }).then(function (isConfirm) {
            if (isConfirm === true) {

                $scope.update($scope.dataToUpdate, $scope.route);

            } else if (isConfirm === false) {
                swal(
                    'Cancelled',
                    'Your ' + $scope.route + ' is safe :)',
                    'error'
                );
            } else {

            }
        })

    };

    $scope.delete = function(id, route, parentKey){

        swal({
            text: "You will not be able to recover this " + route + "!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plz!",
            closeOnConfirm: false,
            closeOnCancel: false
        }).then(function(isConfirm) {
            if (isConfirm === true) {

                requestHandler.prepareDeleteRequest({

                    url: '/'+route+'/'+id,
                    data: { }

                }).then(function (response) {

                    if(response.statusCode == '200'){
                        //$scope.viewAdminDetail();
                        //console.log(route);
                        switch(route){

                            case 'comment' : {
                                $scope.getPageRequest();
                                //$scope.getTotalEventApplication();
                            }break;
                        }
                    }

                }).catch(function () {

                });

                swal(
                    'Deleted!',
                    'Your '+ route + ' has been deleted.',
                    'success'
                );
            } else if (isConfirm === false) {

                swal(
                    'Cancelled',
                    'Your '+ route + ' is safe :)',
                    'error'
                );
            } else {

            }
        })

    };


    $scope.getFilters = function(){
        requestHandler.preparePostRequest({

            url: '/getFilter'

        }).then(function (response) {

            $scope.filter = response;

            //console.log($scope.filter);
            //console.log($scope.filter.country);
            $scope.loader = false;

            $scope.viewData = response;


        }).catch(function () {

        })
    };

    $scope.viewEventDetail = function() {

        $scope.loader = true;

        requestHandler.preparePostRequest({

            url: 'viewEvent'

        }).then(function (response) {

            $scope.loader = false;

            $scope.viewEventData = response.paginate.data;
            $scope.paginate = response.paginate;

            //$scope.currentPage = response.paginate.current_page;
            $scope.getPages($scope.paginate.last_page);
            $scope.previousPagination.viewEvent = response;

        }).catch(function () {

        })
    };

    $scope.previousPage = function(){
        if($scope.currentPage == 1){
            return;
        }

        $scope.currentPage = $scope.currentPage -1;
        //console.log($scope.currentPage);return;
        $scope.getPageRequest();

    };


    $scope.nextPage = function() {

        if ($scope.paginate.last_page-1 < $scope.currentPage) {
            return;
        }

        $scope.currentPage ++;
        //console.log($scope.currentPage);return;
        $scope.getPageRequest();
    };




    $scope.changePage = function(){

        $scope.currentPage = $scope.currentPage;
        //console.log($scope.currentPage);return;
        $scope.getPageRequest();

    };


    $scope.getPageRequest = function(){

        $scope.loader = true;

        //console.log($scope.route);

        switch($scope.route){

            case 'event' :{
                var data = {
                    page  : $scope.currentPage,
                    eventId : $scope.eventId,
                    candidateType : $scope.candidateType
                };
            }
                break;

            case 'viewEvent' :{
                var data = {
                    page : $scope.currentPage
                };
            }
                break;

            default:{
                var data = {
                    page : $scope.currentPage
                };
            }

        }

        //console.log($scope.route);

        requestHandler.preparePostRequest({

            url: $scope.route,
            data: data

        }).then(function (response) {

            $scope.loader = false;

            //$scope.viewEventData = response.paginate.data;

            switch($scope.route){

                case 'event' :{
                    $scope.listData = response.paginate.data;
                    $scope.paginate = response.paginate;

                    $scope.currentPage = response.paginate.current_page;
                    $scope.getPages($scope.paginate.last_page)
                }
                break;

                case 'viewEvent' :{
                    $scope.viewEventData = response.result;
                    $scope.paginate = response.paginate;

                    $scope.currentPage = response.paginate.current_page;
                    $scope.getPages($scope.paginate.last_page);

                    $scope.previousPagination.viewEvent = response;
                    //console.log($scope.previousPagination);
                }
                break;

            }

        }).catch(function () {

        })
    };

    $scope.getPreviousPagination = function(requestFor){

        //console.log($scope.previousPagination);

        if(!$scope.previousPagination[requestFor].result || $scope.previousPagination[requestFor].result !== 'undefined'){
            $scope.previousPagination[requestFor].result = $scope.previousPagination[requestFor].paginate.data;
        }

        $scope.viewEventData = $scope.previousPagination[requestFor].result;
        $scope.paginate = $scope.previousPagination[requestFor].paginate;

        $scope.currentPage = $scope.previousPagination[requestFor].paginate.current_page;
        $scope.getPages($scope.paginate.last_page);

    };




    $scope.getEventDetail = function(eventId){
        $scope.detailEvent = !$scope.detailEvent;
        $scope.viewEvent = !$scope.viewEvent;
        $scope.viewComment=true;

        var dataToreturn = true;
        $scope.eventDetailData = '';

        $scope.loader = true;

        angular.forEach($scope.viewEventData, function(value, key) {

            if(dataToreturn){
                if(value.id == eventId){
                    $scope.eventDetailData = value;
                    dataToreturn = false;
                }
            }
        });

        //console.log($scope.eventDetailData);

        $scope.route = 'event';
        $scope.eventId = eventId;
        $scope.getEventInterest(eventId);


    };

    $scope.isPaidEvent = '';
    $scope.getEventInterest = function(eventId){

        requestHandler.preparePostRequest({

            url: '/'+$scope.route,
            data: {
                eventId         : eventId
            }

        }).then(function (response) {

            $scope.loader = false;

            //console.log(response);

            $scope.listData = response.paginate.data;
            $scope.paginate = response.paginate;

            if(response.isPaid){
                $scope.isPaidEvent = response.isPaid;
            }

            $scope.currentPage = response.paginate.current_page;
            $scope.getPages($scope.paginate.last_page);


        }).catch(function () {

        })
    };

    /*------------------------------------Adding User Section Starts Here----------------------*/


    $scope.userFields = {
        name               : '',
        email              : '',
        password           : '',
        confirm_password   : ''
    };

    $scope.addUser = function() {

        $scope.message = '';
        $scope.route = 'user';

        if($scope.isUpdate){
            if(!$scope.validateUserFields()){
                
            }
            //$scope.updateEvent();
        }else{
            if(!$scope.validateUserFields($scope.userFields)){
                return;
            }
            $scope.saveUser($scope.userFields, $scope.route);
        }

    };


    $scope.validateUserFields = function(data){

        var dataToreturn = true;
        var field = '';

        angular.forEach(data, function(value, key) {

            if(dataToreturn){

                $scope.message = '';

                if(!value){
                    //console.log(key);
                    field = key;
                    $scope.message = 'This field is required.';
                    dataToreturn = false;

                }else if(key){

                    switch(key){
                        case 'email' :{
                            var atpos = value.indexOf("@");
                            var dotpos = value.lastIndexOf(".");
                            if (atpos<1 || dotpos<atpos+2 || dotpos+2>=value.length) {
                                field = key;
                                $scope.message = 'Please provide a valid email address.';
                                dataToreturn = false;
                            }else{
                                $("#"+key+"_req").css('display', 'none');
                            }
                        }break;

                        case 'website' :{
                            var r = /^(ftp|http|https):\/\/[^ "]+$/;
                            if(!r.test(value)){
                                field = key;
                                $scope.message = 'Please provide a valid Web Url.';
                                dataToreturn = false;
                            }else{
                                $("#"+key+"_req").css('display', 'none');
                            }

                        }break;

                        case 'size' :{
                            if(isNaN(value)){
                                field = key;
                                $scope.message = 'Please provide a valid company size.';
                                dataToreturn = false;
                            }else{
                                $("#"+key+"_req").css('display', 'none');
                            }

                        }break;

                        case 'confirm_password' :{
                            if(data['confirm_password'] != data['password']){
                                field = key;
                                $scope.message = 'Confirm password not matched with the password.';
                                dataToreturn = false;
                            }else{
                                $("#"+key+"_req").css('display', 'none');
                            }

                        }break;
                        default :
                            $("#"+key+"_req").css('display', 'none');
                    }

                }else{
                    //console.log(key);
                    $("#"+key+"_req").css('display', 'none');
                }
            }
        });

        if(!dataToreturn){
            $("#"+field+"_req").css('display', 'inline');
            //console.log($scope.message);
            $("#"+field+"_req").html($scope.message);
            $("#"+field+"_field").focus();
        }

        return dataToreturn;

    };

    $scope.resetUser = function(data){

        if(!data){
            data = $scope.userFields;
        }

        //console.log(data);
        angular.forEach(data, function(value, key) {

            $scope.userFields[key] = '';
            $("#"+key+"_req").css('display', 'none');
        })
    };


    $scope.saveUser = function(data, route){

        //console.log(data); console.log(route);

        $scope.loader = true;
        requestHandler.preparePostRequest({

            url: '/'+route,
            data: {
                data : data
            }

        }).then(function (response) {

            $scope.loader = false;

            sweetAlert(response.messageTitle, response.message, response.messageType);

            //$scope.result = response.result;
            $scope.resetUser($scope.userFields);
            //$scope.message = response.message;


        }).catch(function () {

        })
    };

    /*------------------------------------Adding User Section Ends Here----------------------*/


    /*------------------------------------Adding Edit Section Starts Here----------------------*/


    $scope.paswordFields = {
        old_password           : '',
        new_password           : '',
        confirm_new_password   : ''
    };

    $scope.resetPasswordFields = function(){

        angular.forEach($scope.paswordFields, function (value, key) {

            $scope.paswordFields[key] = '';
            $("#" + key + "_req").css('display', 'none');
        })

    };


    $scope.updatePassword = function() {

        var data = $scope.paswordFields;

        $scope.message = '';
        $scope.route = 'user';

        if(!$scope.validatePasswordFields(data)){
            return;
        }
        $scope.setPassword();


    };

    $scope.setPassword = function(){

        $scope.loader = true;

        requestHandler.preparePostRequest({

            url: '/'+$scope.route +'/reset-password',
            data: {
                data : $scope.paswordFields
            }

        }).then(function (response) {

            $scope.loader = false;
            sweetAlert(response.messageTitle, response.message, response.messageType);

            $scope.resetPasswordFields();
            
        }).catch(function () {

        })
    };

    $scope.validatePasswordFields = function(data) {

        var dataToreturn = true;
        var field = '';

        angular.forEach(data, function (value, key) {

            if (dataToreturn) {

                $scope.message = '';

                if (!value) {
                    //console.log(key);
                    field = key;
                    $scope.message = 'This field is required.';
                    dataToreturn = false;

                } else if (key) {

                    switch (key) {
                        case 'confirm_new_password' :
                        {
                            if (data['confirm_new_password'] != data['new_password']) {
                                field = key;
                                $scope.message = 'Confirm password not matched with the password.';
                                dataToreturn = false;
                            } else {
                                $("#" + key + "_req").css('display', 'none');
                            }

                        }
                            break;
                        default :
                            $("#" + key + "_req").css('display', 'none');
                    }

                } else {
                    //console.log(key);
                    $("#" + key + "_req").css('display', 'none');
                }
            }
        });

        if (!dataToreturn) {
            $("#" + field + "_req").css('display', 'inline');
            //console.log($scope.message);
            $("#" + field + "_req").html($scope.message);
            $("#" + field + "_field").focus();
        }

        return dataToreturn;

    };


        /*------------------------------------Edit User Section Ends Here----------------------*/


    /*------------------------------------User Profile Section Starts Here----------------------*/

    $scope.profile = true;
    $scope.profileUpdate = false;
    $scope.addNewUser = false;

    $scope.getUserDetail = function(route, routeFunction){

        $scope.loader = true;

        requestHandler.prepareGetRequest({

            url: '/'+route+'/'+ routeFunction

        }).then(function (response) {

            $scope.loader = false;
            $scope.profileData = response[0];
            $scope.updateProfileFields = angular.extend({}, response[0]);

        }).catch(function () {

        })
    };

    $scope.updateUserProfile = function(data, route) {

        if(!$scope.validateUser(data)){
            return;
        }
        //console.log(data);
        data['request-type'] = 'update-profile';
        //console.log(data);return;

        $scope.update(data, route);


    };

    $scope.resetUserMessage = function(data){

        $scope.updateProfileFields = angular.extend({}, $scope.profileData);

        angular.forEach(data, function(value, key) {
            $("#"+key+"_req").css('display', 'none');
        })
    };

    $scope.validateUser = function(data){

        $scope.setRequiredFields();
        var dataToreturn = true;
        angular.forEach(data, function(value, key) {

            if(dataToreturn){
                if(!value && (key != 'remember_token')){
                    //console.log(key);
                    $("#"+key+"_req").css('display', 'inline');
                    $("#"+key+"_req").html('This field is required');
                    $("#"+key+"_field").focus();
                    dataToreturn = false;

                }else{
                    //console.log(key);

                    switch(key){
                        case 'contact_number' :{
                            if(isNaN(value)){

                                $("#"+key+"_req").css('display', 'inline');
                                $("#"+key+"_req").html('Please provide a valid number.');
                                $("#"+key+"_field").focus();

                                dataToreturn = false;
                            }else{
                                $("#"+key+"_req").css('display', 'none');
                            }

                        }break;

                        default :
                            $("#"+key+"_req").css('display', 'none');
                    }
                }
            }
        });

        return dataToreturn;

    };

    /*------------------------------------Company Profile Section End Here----------------------*/


    /*------------------------------------Send Event SMS Starts Here----------------------*/

    $scope.sendSms = function(data, route){

        //console.log(data); console.log(route);

        $('#spinLoader_'+data.id).show();
        requestHandler.preparePostRequest({

            url: '/'+route,
            data: {
                data : data
            }

        }).then(function (response) {

            $('#spinLoader_'+data.id).hide();
            sweetAlert(response.messageTitle, response.message, response.messageType);


        }).catch(function () {

        })
    };

    /*------------------------------------Send Event SMS Endss Here------------------------*/


    /*------------------------------------Renew Subscription Starts Here-----------------------*/

    $scope.plan      = true;
    $scope.renewPlan = false;
    $scope.buyPlan   = false;

    $scope.renewMyPlan = function(packageName, plan, amount){

        $scope.planMessage = 'You have selected '+packageName + ' and you need to pay $'+ amount;

        if(plan){
            var monthPlan = $('input[name='+plan+']:checked').val();

            $scope.planMessage = 'You have selected '+packageName + ' for ' +
                monthPlan + ' months and you need to pay $'+ (monthPlan*amount)/3;

            console.log(monthPlan);
        }

        $scope.packageName   = packageName;
        $scope.packageAmount = (plan) ? (monthPlan*amount)/3 : amount;

        console.log($scope.packageName);
        console.log($scope.packageAmount);

        $scope.buyPlan = true;
        $scope.registredFormonths = (monthPlan) ? monthPlan : 0;
        //$scope.registration=true;

        $scope.moveToTop();

    };

    /*------------------------------------Renew Subscription Ends Here-----------------------*/

    /*------------------------------------Get Customer Details Starts Here-----------------------*/

    $scope.getCustomerDetail = function(customerId){
        $scope.loader = true;

        requestHandler.preparePostRequest({

            url: '/event/event-application-detail',
            data: {
                customerId         : customerId
            }

        }).then(function (response) {

            $scope.loader = false;

            //console.log(response);

            $scope.customerDetailData = response;


        }).catch(function () {

        })
    };


    /*------------------------------------Get Customer Details Ends Here-------------------------*/

    /*------------------------------------Share Events Starts Here---------------------------------*/

    $scope.shareEvent = function(eventId, eventTitle){


        swal({
            title: 'Please enter email address',
            input: 'email',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: function(email) {
                return new Promise(function(resolve, reject) {
                    if(email){
                        requestHandler.preparePostRequest({

                            url: 'event/share-event',
                            data: {
                                eventId   : eventId,
                                title   : eventTitle,
                                emailId : email
                            }

                        }).then(function (response) {

                            sweetAlert(response.messageTitle, response.message, response.messageType);
                        }).catch(function () {

                        })
                    }
                });
            },
            allowOutsideClick: false
        })

    };

    /*------------------------------------Share Events Ends Here-----------------------------------*/


    $scope.getPages = function(n){

        var data = [];

        for (var i = 1; i <= n; i++) {
            data[i] = i;
        }
        $scope.pages = data;

    };

    $scope.getNumberOfTimes=function(n){
        var data = new Array(parseInt(n));
        return data;
    };

    $scope.getNumber = function(n){//console.log(n);
        return parseInt(n);
    };

    $scope.moveToTop = function(){
        $("html, body").animate({ scrollTop: 0 }, 200);
    };


    $scope.activeMe = function(id){
        $( ".nav-label" ).parent().parent().removeClass( "active" );
        $('#'+id).addClass("active");
    };

    $scope.unCheckAllSelect = function(){
        //$(".unCheckAll").click();

        $timeout(function() {
            $(".unCheckAll").click();
        }, 0);
        //console.log("test");
    };

    /*----------------------------------------------To get event by Id--------------------------*/

    $scope.getDataById = function(route, id, type){

        //console.log(id);return;

        $scope.loader = true;
        requestHandler.preparePostRequest({

            url  : route,
            data :{
                id : id
            }

        }).then(function (response) {

            $scope.loader = false;

            $scope.userEventData = response[0];
            $scope.attendeeCommentData = response;
            //console.log($scope.userEventData);

            if(response[0] && type == 'click'){
                $scope.addCountById('add-click-count',
                    {'eventId'      : $scope.userEventData.id ,
                      'limit'       : $scope.userEventData.free_limit,
                      'name'        : $scope.userEventData.event_name,
                      'isPaid'      : $scope.userEventData.is_paid,
                      'countType'   : type
                    }
                );
            }

        }).catch(function () {

        })
    };


    /*----------------------------------------------Set Click Count by Event Id--------------------------*/

    $scope.addCountById = function(route, data){

        requestHandler.preparePostRequest({

            url  : route,
            data :{
                data : data
            }

        }).then(function (response) {

            $scope.eventClickData = response.result;

            //console.log($scope.eventClickData);

        }).catch(function () {

        })
    };

    /*----------------------------------------------Add comment--------------------------*/

    $scope.attendee = {
        'comment' : '',
        'interested' : false
    };
    $scope.addComment = function(userId, eventId){

        if(!$scope.attendee.interested){
            sweetAlert('Error..', 'Please mark check for, I will be attending. ..', 'error');
            return;
        }

        if(!$scope.attendee.comment){
            sweetAlert('Success..', 'Your response saved successfully..', 'success');
            return;
        }

        //console.log($scope.attendee);return;

        $scope.allLoader.spinLoader = true;
        requestHandler.preparePostRequest({

            url  : 'add-comment',
            data :{
                userId  : userId,
                eventId : eventId,
                comment : $scope.attendee.comment
            }

        }).then(function (response) {
            $scope.allLoader.spinLoader = false;
            $scope.attendeeCommentData = response['result'];
            $scope.attendee.comment = '';
            $scope.attendee.interested = false;

            //console.log($scope.attendeeCommentData);

            sweetAlert(response.messageTitle, response.message, response.messageType);

        }).catch(function () {

        })
    };

    /*----------------------------------------------Add comment--------------------------*/
    $scope.attendeeInterest = function(data){
        if(!$scope.attendee.interested){
            return;
        }

        $scope.addCountById('add-click-count',
                                {'eventId'    : data.id ,
                                  'limit'     : data.free_limit,
                                  'name'      : data.event_name,
                                  'isPaid'    : data.is_paid,
                                  'countType' : 'attendee',
                                  'cellNumber': data.contact_number,
                                  'eventName' : data.event_name,
                                  'userName'  : data.first_name + ' '+ data.last_name
                                }
                            );
    };


    /*----------------------------------------------To Set event location Map--------------------------*/
    $scope.isMapfirst = true;
    $scope.myLocation = {};
    $scope.myActualLocation = '';
    $scope.setEventMap = function(myLatLag) {

        var marker, map, geocoder, location, myOptions;

        myOptions = {
            center: myLatLag,
            zoom: 16,
            //disableDefaultUI: true,
            zoomControl: true

        };

        map      = new google.maps.Map(document.getElementById("event_map"), myOptions);

        /*
        if ($scope.isMapfirst){
            $scope.isMapfirst = false;
            map      = new google.maps.Map(document.getElementById("event_map"), myOptions);
        }
        */

        //console.log(myLatLag.lat + ', ' + myLatLag.lng);
        if(myLatLag.lat){
            $("#mapLocation-field").val(myLatLag.lat + ', ' + myLatLag.lng);
        }


        google.maps.event.addListener(map, 'click', function (event) {
            location = event.latLng;
            if (marker) {
                marker.setPosition(location); //on change sa position
            } else {
                marker = new google.maps.Marker({ //on créé le marqueur
                    position: location,
                    map: map
                });
            }

            //console.log(location.lat()+ ', ' + location.lng());

            $scope.eventFields.map_location = location.lat() + ', ' + location.lng();
            $("#mapLocation-field").val($scope.eventFields.map_location);
            $scope.getAddress(location);

        });

        $scope.getAddress(myLatLag);

        marker = new google.maps.Marker({
            position: myLatLag,
            map: map,
            //title: 'Hello World!'
        });

    };

    $scope.getAddress = function(location){

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({'latLng': location},
            function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        document.getElementById("address_on_map").value = results[0].formatted_address;
                        $scope.myActualLocation = results[0].formatted_address;
                        //$("#map-heading").html($scope.myActualLocation);
                        //console.log($scope.myActualLocation);
                    }
                    else {
                        document.getElementById("address_on_map").value = "No results";
                    }
                }
                else {
                    document.getElementById("address_on_map").value = status;
                }
            });
    };

    $scope.locationFromAddress = function(){

        var geocoder = new google.maps.Geocoder();

        var address = document.getElementById( 'address-field' ).value + ', south africa';

        geocoder.geocode( { 'address' : address }, function( results, status ) {
            if( status == google.maps.GeocoderStatus.OK ) {

                $scope.setEventMap({lat: results[0].geometry.location.lat() , lng : results[0].geometry.location.lng()});

            } else {
                var location =  {
                    lat : -30.29701788337205,
                    lng : 22.32421875
                };

                if($scope.eventFields.map_location){
                    var temp = $scope.eventFields.map_location.split(', ');

                    location =  {
                        lat : parseFloat(temp[0]),
                        lng : parseFloat(temp[1])
                    }

                }

                $scope.setEventMap(location);
            }
        } );
    };

    /*----------------------------------Make Payment-------------------------------*/

    $scope.makePayment = function(eventId){
        $scope.loader = true;
        requestHandler.preparePostRequest({

            url: '/pay/success-payment',
            data: {
                eventId : eventId
            }

        }).then(function (response) {

            $scope.loader = false;

            sweetAlert("Sucess..!", response.message, "success");
            $scope.result = response.result;

            //$scope.message = response.message;
            $scope.viewEventDetail();
            $scope.resetFields();


        }).catch(function () {

        })
    };

    $scope.attendeeMap = function(){
                $timeout(function(){
                    var mapData = $scope.userEventData.map_location.split(', ');

                    var myLatLng = {
                        lat: parseFloat(mapData[0]),
                        lng: parseFloat(mapData[1])
                    };

                    var map = new google.maps.Map(document.getElementById('attendeeMap'), {
                        zoom: 10,
                        center: myLatLng
                    });

                    var marker = new google.maps.Marker({
                        position: myLatLng,
                        map: map
                    });
                },1000);


    }
}

angular.module('ithuse')
    .controller('DashboardController', ['$scope', '$rootScope', 'requestHandler', '$timeout', '$http', DashboardController]);
