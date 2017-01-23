'use strict';
/* App Module */
//var myFilterss = angular.module('filters', []);

angular.module('ithuseApp')
    .filter('reverse', function(Data) {
        return function(text) {
            return text.split("").reverse().join("") + Data.message;
        };
    })
    .filter('cfilter', function() {
        return function(input, dataset) {
            return dataset;

        }
    })
    .filter('toarray', function() {
        return function(items) {
            var filtered = [];
            angular.forEach(items, function(item) {
                filtered.push(item);
            });

            return filtered;
        };
    })
    .filter('objFilter', function() {
        return function(items, filter) {
            if (!filter){
                return items;
            }
            var result = {};
            angular.forEach( filter, function(filterVal, filterKey) {
                angular.forEach(items, function(item, key) {
                    var fieldVal = item[filterKey];
                    if (fieldVal && fieldVal.toLowerCase().indexOf(filterVal.toLowerCase()) > -1){
                        result[key] = item;
                    }
                });
            });
            return result;
        };
    })
    .filter('filterDate', ["$compile", function($compile){
        return function(item, scope) {

            return (item && (item != "--") && (typeof item != "undefined")) ? item : "N/A";
        };
    }])

    .filter('icon', function($sce){
        return function(item, data, color){

            if(!color){
                color = '';
            }

            switch(item){
                case 'USD' : return $sce.trustAsHtml("<i class='fa fa-usd "+ color +"'></i> ") ;break;
                default : return item ;break;
            }
        };
    })

    .filter("getEmployerName",function(){

        //return function(items, firstArgument,secondArgument){
        return function(items, firstArgument){

            //console.log(items);console.log(firstArgument);

            if(!firstArgument){
                return '';
            }

            var isCurrentCompanyArray = firstArgument.split(" , ");
            var index = 0;

            angular.forEach(isCurrentCompanyArray, function(value, key) {
                if(parseInt(value) == 1){
                    index = key;
                }

            });

            var dataToReturn = items.split(" , ");

            //console.log(dataToReturn);
            //console.log(index);
            return dataToReturn[index];

        }
    })

    .filter('getYearByMonth', function(){
        return function(month){

            var dataToReturn = '';

            if(!month){
                return dataToReturn;
            }

            var monthArray = month.split(" , ");

            //console.log(monthArray);

            var temp = 0;

            if(monthArray.length == 1){

                var year  = parseInt(monthArray) / 12;
                var month = parseInt(monthArray) % 12;

                if(parseInt(year)){
                    dataToReturn += parseInt(year) + ' Year ';
                }

                if(parseInt(month)){
                    dataToReturn += parseInt(month) + ' Months ';
                }

                return dataToReturn;
            }

            angular.forEach(monthArray, function(value, key) {
                temp += parseInt(value);

            });

            var year  = parseInt(temp) / 12;
            var month = parseInt(temp) % 12;

            if(parseInt(year)){
                dataToReturn += parseInt(year) + ' Year ';
            }

            if(parseInt(month)){
                dataToReturn += parseInt(month) + ' Months ';
            }


            //console.log(dataToReturn);

            return dataToReturn;

        };
    })

    .filter('getDateTimeFormat', function(){
        return function(date){

            //console.log(date);

            if(!date){
                return '';
            }

            var weekday = ['Sun','Mon','Tue','Wed','Thu','Fri', 'Sat'];
            var monthName = ['Jan','Feb','Mar','Apr','May','Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'];
            //date =    date.replace(/-/g, '/');
            var dateOut = new Date(date);
            var timeType = (dateOut.getHours() >= 12) ? 'PM' : 'AM';

            var hrs = dateOut.getHours();
            if (hrs > 12) {
                hrs -= 12;
            } else if (hrs === 0) {
                hrs = 12;
            } if (hrs < 10){
                hrs = '0'+ hrs;
            }


            var mins = dateOut.getMinutes();
            if (mins < 10) {
                mins = '0'+ mins;
            }
            var dd = dateOut.getDate();
            if (dd < 10) {
                dd = '0'+ dd;
            }
            var mm = dateOut.getMonth();
            mm = mm+1;
            if (mm < 10) {
                mm = '0'+ mm;
            }

            var formatedDate =  dd + "-" +
                mm + "-" +
                dateOut.getFullYear() + "  " +
                hrs + ":" +
                mins + " " + timeType;


            return formatedDate;
        };
    })

    .filter('getDateFormat', function(){
        return function(date){
            if(!date){
                return '';
            }

            if(date.split('/').length > 1){
                return date ;
            }

            var time = date.split(' ');
            time = time[1]?time[1]:'';

            var newTime = time.split(":");
            var day;
            if(newTime[0] <= 11){
                newTime[0] = newTime[0];
                day = 'AM';
            }else if(newTime[0] == 12){
                newTime[0] = 12;
                day = 'PM';
            }else{
                newTime[0] = newTime[0] - 12;
                day = 'PM';
            }

            time = newTime[0] ? (newTime[0]+":"+newTime[1]+" " + day) : '';

            var dateOut = new Date(date);

            var dd = dateOut.getDate();
            if (dd < 10) {
                dd = '0'+ dd;
            }
            var monthList = {0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May',5:'June',6:'July',7:'Aug',8:'Sept',9:'Oct',10:'Nov',11:'Dec'};
            
            var mm = dateOut.getMonth();
            mm = monthList[mm];

            var formatedDate =  dd + " " +
                mm + " " +
                dateOut.getFullYear() + " " + time ;


            return formatedDate;
        };
    })

    .filter('getTimeSection', function(){
        return function(timeValue){
            if(timeValue != undefined) {
                var time = timeValue.split(":");
                var day;
                if (time[0] <= 11) {
                    time[0] = time[0];
                    day = 'AM';
                } else if (time[0] == 12) {
                    time[0] = 12;
                    day = 'PM';
                } else {
                    time[0] = time[0] - 12;
                    day = 'PM';
                }

                return (time[0] + ":" + time[1] + " " + day);
            }else{
                return timeValue;
            }
        };
    })

    .filter('changeOrder', function(){
        return function(input) {
            if (!angular.isObject(input)) return input;
            return _.invert(input);
        }
    })

    .filter('vedio', function($sce){
        return function(item, data){

            if(!item){
                return;
            }
            //console.log(item);
            //console.log(data);

            if(item){
                /*
                return $sce.trustAsHtml("<vjs-video-container vjs-ratio='4:3'> " +
                    "<video  preload='none' class='video-js vjs-default-skin' controls vjs-video poster='img/sample.jpg' >" +
                    "<source src="+ item + " type='video/mp4'></video></vjs-video-container>") ;
                    */
                /*
                return $sce.trustAsHtml("<video  class='video-js vjs-default-skin' poster='img/sample.jpg' preload='none' controls>" +
                    "<source src="+ item + " type='video/mp4'></video>") ;
                    */
                return $sce.trustAsHtml("<video  class='video-js vjs-default-skin' preload='none' controls>" +
                    "<source src="+ item + " type='video/mp4'></video>") ;
            }
        };
    });
