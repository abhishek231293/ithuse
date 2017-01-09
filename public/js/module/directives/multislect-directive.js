'use strict';
/* App Module */
(function(module){
    module
       .factory('optionParser', ['$parse', function ($parse) {

            var TYPEAHEAD_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
            return {
                parse:function (input) {

                    var match = input.match(TYPEAHEAD_REGEXP);
                    //console.log(input);
                    //console.log(match);
                    if (!match) {
                        throw new Error(
                            'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' +
                            ' but got "' + input + '".');
                    }
                    return {
                        itemName:match[3],
                        source:$parse(match[4]),
                        viewMapper:$parse( match[1] || match[2]),
                        modelMapper:$parse(match[2] || match[1])
                    };
                }
            };
        }])

        .directive('amMultiselect', ['$parse', '$document', '$compile', '$interpolate', '$filter', 'optionParser',

            function ($parse, $document, $compile, $interpolate, $filter, optionParser) {
                return {
                    restrict: 'E',
                    require: 'ngModel',
                    link: function (originalScope, element, attrs, modelCtrl) {
                        // Redefine isEmpty - this allows this to work on at least Angular 1.2.x
                        var isEmpty = modelCtrl.$isEmpty;
                        modelCtrl.$isEmpty = function(value) {
                            return isEmpty(value) || (angular.isArray(value) && value.length == 0);
                        };

                        var exp = attrs.options,
                            parsedResult = optionParser.parse(exp),
                            isMultiple = attrs.multiple ? true : false,
                            required = false,
                            scope = originalScope.$new(),
                            changeHandler = attrs.change || angular.noop;

                        scope.items = [];
                        scope.header = 'Select';
                        scope.multiWidth= attrs.width;
                        scope.multiType = attrs.type;
                        scope.multiMax  = attrs.max;
                        scope.allowCheck = {};
                        scope.marginLeft= attrs.left;//console.log(scope.marginLeft);
                        scope.multiple = isMultiple;
                        scope.disabled = false;
                        scope.onBlur = attrs.ngBlur || angular.noop;

                        originalScope.$on('$destroy', function () {
                            scope.$destroy();
                        });

                        var popUpEl = angular.element('<am-multiselect-popup' +
                            (attrs.templateUrl ? (' template-url="' + attrs.templateUrl + '"'): '' ) +
                            '></am-multiselect-popup>');

                        // required validator
                        if (attrs.required || attrs.ngRequired) {
                            required = true;
                        }
                        attrs.$observe('required', function(newVal) {
                            required = newVal;
                        });

                        // watch disabled state
                        scope.$watch(function () {
                            return $parse(attrs.disabled)(originalScope);
                        }, function (newVal) {
                            scope.disabled = newVal;
                        });

                        // watch single/multiple state for dynamically change single to multiple
                        scope.$watch(function () {
                            return $parse(attrs.multiple)(originalScope);
                        }, function (newVal) {
                            isMultiple = newVal || false;
                        });

                        // watch option changes for options that are populated dynamically
                        scope.$watch(function () {
                            return parsedResult.source(originalScope);
                        }, function (newVal) {
                            if (angular.isDefined(newVal))
                                parseModel();
                        }, true);

                        // watch model change
                        scope.$watch(function () {
                            return modelCtrl.$modelValue;
                        }, function (newVal, oldVal) {
                            // when directive initialize, newVal usually undefined. Also, if model value already set in the controller
                            // for preselected list then we need to mark checked in our scope item. But we don't want to do this every time
                            // model changes. We need to do this only if it is done outside directive scope, from controller, for example.
                            if (angular.isDefined(newVal)) {
                                markChecked(newVal);

                                scope.newValue = newVal.length;
                                //console.log(scope.allowCheck);


                                scope.$eval(changeHandler);
                            }
                            getHeaderText();
                            modelCtrl.$setValidity('required', scope.valid());
                        }, true);

                        function parseModel() {
                            scope.items.length = 0;
                            var model = parsedResult.source(originalScope);
                            if(!angular.isDefined(model)) return;
                            for (var i = 0; i < model.length; i++) {
                                var local = {};
                                local[parsedResult.itemName] = model[i];
                                scope.items.push({
                                    label: parsedResult.viewMapper(local),
                                    model: parsedResult.modelMapper(local),
                                    checked: false
                                });
                            }

                            //console.log(parsedResult);
                        }


                        parseModel();

                        element.append($compile(popUpEl)(scope));

                        function getHeaderText() {
                            if (is_empty(modelCtrl.$modelValue)) return scope.header = (attrs.msHeader!==undefined ? attrs.msHeader : 'Select');

                            if (isMultiple) {
                                if (attrs.msSelected) {
                                    scope.header = $interpolate(attrs.msSelected)(scope);
                                } else {
                                    if (modelCtrl.$modelValue.length == 1) {
                                        for(var i = 0; i < scope.items.length; i++) {
                                            if(scope.items[i].model === modelCtrl.$modelValue[0]) {
                                                scope.header = scope.items[i].label;
                                            }
                                        }
                                    } else {
                                        scope.header = modelCtrl.$modelValue.length + ' ' + scope.multiType + ' selected';
                                    }
                                }
                            } else {
                                if(angular.isString(modelCtrl.$modelValue)){
                                    scope.header = modelCtrl.$modelValue;
                                } else {
                                    var local = {};
                                    local[parsedResult.itemName] = modelCtrl.$modelValue;
                                    scope.header = parsedResult.viewMapper(local) || scope.items[modelCtrl.$modelValue].label;
                                }
                            }
                        }

                        function is_empty(obj) {
                            if (angular.isNumber(obj)) return false;
                            if (obj && obj.length && obj.length > 0) return false;
                            for (var prop in obj) if (obj[prop]) return false;
                            return true;
                        };

                        scope.valid = function validModel() {
                            if(!required) return true;
                            var value = modelCtrl.$modelValue;
                            return (angular.isArray(value) && value.length > 0) || (!angular.isArray(value) && value != null);
                        };

                        function selectSingle(item) {
                            if (item.checked) {
                                scope.uncheckAll();
                            } else {
                                scope.uncheckAll();
                                item.checked = !item.checked;
                            }
                            setModelValue(false);
                        }

                        function selectMultiple(item) {
                            item.checked = !item.checked;

                            //console.log(item);
                            if(scope.newValue > scope.multiMax-1 && item.checked){
                                //scope.allowCheck[scope.newValueh-1] = !scope.allowCheck[scope.newValue-1];

                                item.checked = !item.checked;

                                //console.log('test here');
                                //console.log(item);

                                $("#"+scope.multiType+"-req").css('display', 'inline');
                                $("#"+scope.multiType+"-req").html("Max "+ scope.multiMax + " Allowed");
                                //$("#"+multiType+"-field").focus();
                                return;
                            }else{
                                //console.log(scope.newValue);
                                //scope.allowCheck[scope.newValue] = !scope.allowCheck[scope.newValue];
                                $("#"+scope.multiType+"-req").css('display', 'none');
                                $("#"+scope.multiType+"-req").html("This field is required");
                            }

                            setModelValue(true);
                        }

                        function setModelValue(isMultiple) {
                            var value = null;

                            if (isMultiple) {
                                value = [];
                                angular.forEach(scope.items, function (item) {
                                    if (item.checked) value.push(item.model);
                                })
                            } else {
                                angular.forEach(scope.items, function (item) {
                                    if (item.checked) {
                                        value = item.model;
                                        return false;
                                    }
                                })
                            }
                            modelCtrl.$setViewValue(value);
                        }

                        function markChecked(newVal) {
                            if (!angular.isArray(newVal)) {
                                angular.forEach(scope.items, function (item) {
                                    if (angular.equals(item.model, newVal)) {
                                        scope.uncheckAll();
                                        item.checked = true;
                                        setModelValue(false);
                                        return false;
                                    }
                                });
                            } else {
                                angular.forEach(scope.items, function (item) {
                                    item.checked = false;
                                    angular.forEach(newVal, function (i) {
                                        if (angular.equals(item.model, i)) {
                                            item.checked = true;
                                        }
                                    });
                                });
                            }
                        }

                        scope.checkAll = function () {
                            if (!isMultiple) return;
                            var items = (scope.searchText && scope.searchText.label.length > 0) ? $filter('filter')(scope.items, scope.searchText) : scope.items;
                            angular.forEach(items, function (item) {
                                item.checked = true;
                            });
                            setModelValue(true);
                        };

                        scope.uncheckAll = function () {
                            var items = (scope.searchText && scope.searchText.label.length > 0) ? $filter('filter')(scope.items, scope.searchText) : scope.items;
                            angular.forEach(items, function (item) {
                                item.checked = false;
                            });
                            setModelValue(true);
                        };

                        scope.select = function (item) {
                            if (isMultiple === false) {
                                selectSingle(item);
                                scope.toggleSelect();
                            } else {
                                selectMultiple(item);
                            }
                        }
                    }
                };
            }])

        .directive('amMultiselectPopup', ['$document', '$filter', function ($document, $filter) {
            return {
                restrict: 'E',
                scope: false,
                replace: true,
                templateUrl: 'js/module/directives/templates/multiselect.tmpl.html',
                link: function (scope, element, attrs) {

                    scope.selectedIndex = null;
                    scope.isVisible = false;
                    scope.filteredItems = null;

                    scope.toggleSelect = function () {
                        if (element.hasClass('open')) {
                            element.removeClass('open');
                            $document.unbind('click', clickHandler);
                            scope.$parent.$eval(scope.onBlur);
                        } else {
                            element.addClass('open');
                            $document.bind('click', clickHandler);
                            scope.focus();
                        }
                    };

                    function clickHandler(event) {
                        if (elementMatchesAnyInArray(event.target, element.find(event.target.tagName))) {
                            scope.$parent.$eval(scope.onBlur);
                        } else {
                            element.removeClass('open');
                            $document.unbind('click', clickHandler);
                            scope.$apply();
                        }
                    }

                    scope.focus = function focus(){
                        var searchBox = element.find('input')[0];
                        if (searchBox) {
                            searchBox.focus();
                        }
                    }

                    scope.keydown = function (event) {
                        var list = $filter('filter')(scope.items, scope.searchText);
                        var keyCode = (event.keyCode || event.which);

                        if(keyCode === 13){ // On enter
                            if(list[scope.selectedIndex]){
                                scope.select(list[scope.selectedIndex]); // (un)select item
                            }
                        }else if(keyCode === 38){ // On arrow up
                            scope.selectedIndex = scope.selectedIndex===null ? list.length-1 : scope.selectedIndex-1;
                        }else if(keyCode === 40){ // On arrow down
                            scope.selectedIndex = scope.selectedIndex===null ? 0 : scope.selectedIndex+1;
                        }else{ // On any other key
                            scope.selectedIndex = null;
                        }

                        if(scope.selectedIndex < 0){ // Select last in list
                            scope.selectedIndex = list.length-1;
                        }else if(scope.selectedIndex > list.length-1){ // Set selection to first item in list
                            scope.selectedIndex = 0;
                        }
                    };

                    var elementMatchesAnyInArray = function (element, elementArray) {
                        for (var i = 0; i < elementArray.length; i++)
                            if (element == elementArray[i])
                                return true;
                        return false;
                    }
                }
            }
        }]);


}(angular.module('ithuseApp')));