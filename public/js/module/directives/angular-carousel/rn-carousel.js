(function() {
    "use strict";

    angular.module('angular-carousel')

    .service('DeviceCapabilities', function() {

        // TODO: merge in a single function

        // detect supported CSS property
        function detectTransformProperty() {
            var transformProperty = 'transform',
                safariPropertyHack = 'webkitTransform';
            if (typeof document.body.style[transformProperty] !== 'undefined') {

                ['webkit', 'moz', 'o', 'ms'].every(function (prefix) {
                    var e = '-' + prefix + '-transform';
                    if (typeof document.body.style[e] !== 'undefined') {
                        transformProperty = e;
                        return false;
                    }
                    return true;
                });
            } else if (typeof document.body.style[safariPropertyHack] !== 'undefined') {
                transformProperty = '-webkit-transform';
            } else {
                transformProperty = undefined;
            }
            return transformProperty;
        }

        //Detect support of translate3d
        function detect3dSupport() {
            var el = document.createElement('p'),
                has3d,
                transforms = {
                    'webkitTransform': '-webkit-transform',
                    'msTransform': '-ms-transform',
                    'transform': 'transform'
                };
            // Add it to the body to get the computed style
            document.body.insertBefore(el, null);
            for (var t in transforms) {
                if (el.style[t] !== undefined) {
                    el.style[t] = 'translate3d(1px,1px,1px)';
                    has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                }
            }
            document.body.removeChild(el);
            return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
        }

        return {
            has3d: detect3dSupport(),
            transformProperty: detectTransformProperty()
        };

    })

    .service('computeCarouselSlideStyle', function(DeviceCapabilities) {
        // compute transition transform properties for a given slide and global offset
        return function(slideIndex, offset, transitionType) {
            var style = {
                    display: 'inline-block'
                },
                opacity,
                absoluteLeft = (slideIndex * 100) + offset,
                slideTransformValue = DeviceCapabilities.has3d ? 'translate3d(' + absoluteLeft + '%, 0, 0)' : 'translate3d(' + absoluteLeft + '%, 0)',
                distance = ((100 - Math.abs(absoluteLeft)) / 100);

            if (!DeviceCapabilities.transformProperty) {
                // fallback to default slide if transformProperty is not available
                style['margin-left'] = absoluteLeft + '%';
            } else {
                if (transitionType == 'fadeAndSlide') {
                    style[DeviceCapabilities.transformProperty] = slideTransformValue;
                    opacity = 0;
                    if (Math.abs(absoluteLeft) < 100) {
                        opacity = 0.3 + distance * 0.7;
                    }
                    style.opacity = opacity;
                } else if (transitionType == 'hexagon') {
                    var transformFrom = 100,
                        degrees = 0,
                        maxDegrees = 60 * (distance - 1);

                    transformFrom = offset < (slideIndex * -100) ? 100 : 0;
                    degrees = offset < (slideIndex * -100) ? maxDegrees : -maxDegrees;
                    style[DeviceCapabilities.transformProperty] = slideTransformValue + ' ' + 'rotateY(' + degrees + 'deg)';
                    style[DeviceCapabilities.transformProperty + '-origin'] = transformFrom + '% 50%';
                } else if (transitionType == 'zoom') {
                    style[DeviceCapabilities.transformProperty] = slideTransformValue;
                    var scale = 1;
                    if (Math.abs(absoluteLeft) < 100) {
                        scale = 1 + ((1 - distance) * 2);
                    }
                    style[DeviceCapabilities.transformProperty] += ' scale(' + scale + ')';
                    style[DeviceCapabilities.transformProperty + '-origin'] = '50% 50%';
                    opacity = 0;
                    if (Math.abs(absoluteLeft) < 100) {
                        opacity = 0.3 + distance * 0.7;
                    }
                    style.opacity = opacity;
                } else {
                    style[DeviceCapabilities.transformProperty] = slideTransformValue;
                }
            }
            return style;
        };
    })

    .service('createStyleString', function() {
        return function(object) {
            var styles = [];
            angular.forEach(object, function(value, key) {
                styles.push(key + ':' + value);
            });
            return styles.join(';');
        };
    })

    .directive('rnCarousel', ['$swipe', '$window', '$document', '$parse', '$compile', '$timeout', '$interval', 'computeCarouselSlideStyle', 'createStyleString', 'Tweenable',
        function($swipe, $window, $document, $parse, $compile, $timeout, $interval, computeCarouselSlideStyle, createStyleString, Tweenable) {
            // internal ids to allow multiple instances
            var carouselId = 0,
                // in absolute pixels, at which distance the slide stick to the edge on release
                rubberTreshold = 3;

            var requestAnimationFrame = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame;

            function getItemIndex(collection, target, defaultIndex) {
                var result = defaultIndex;
                collection.every(function(item, index) {
                    if (angular.equals(item, target)) {
                        result = index;
                        return false;
                    }
                    return true;
                });
                return result;
            }

            return {
                restrict: 'A',
                scope: true,
                compile: function(tElement, tAttributes) {
                    // use the compile phase to customize the DOM
                    var firstChild = tElement[0].querySelector('li'),
                        firstChildAttributes = (firstChild) ? firstChild.attributes : [],
                        isRepeatBased = false,
                        isBuffered = false,
                        repeatItem,
                        repeatCollection;

                    // try to find an ngRepeat expression
                    // at this point, the attributes are not yet normalized so we need to try various syntax
                    ['ng-repeat', 'data-ng-repeat', 'ng:repeat', 'x-ng-repeat'].every(function(attr) {
                        var repeatAttribute = firstChildAttributes[attr];
                        if (angular.isDefined(repeatAttribute)) {
                            // ngRepeat regexp extracted from angular 1.2.7 src
                            var exprMatch = repeatAttribute.value.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),
                                trackProperty = exprMatch[3];

                            repeatItem = exprMatch[1];
                            repeatCollection = exprMatch[2];

                            if (repeatItem) {
                                if (angular.isDefined(tAttributes['rnCarouselBuffered'])) {
                                    // update the current ngRepeat expression and add a slice operator if buffered
                                    isBuffered = true;
                                    repeatAttribute.value = repeatItem + ' in ' + repeatCollection + '|carouselSlice:carouselBufferIndex:carouselBufferSize';
                                    if (trackProperty) {
                                        repeatAttribute.value += ' track by ' + trackProperty;
                                    }
                                }
                                isRepeatBased = true;
                                return false;
                            }
                        }
                        return true;
                    });

                    return function(scope, iElement, iAttributes, containerCtrl) {

                        carouselId++;

                        var defaultOptions = {
                            transitionType: 'slide',
                            //transitionType: 'hexagon',
                            transitionEasing: iAttributes.rnCarouselEasing || 'easeTo',
                            //transitionEasing: iAttributes.rnCarouselEasing || 'easeTo',
                            transitionDuration: parseInt(iAttributes.rnCarouselDuration, 10) || 300,
                            isSequential: true,
                            autoSlideDuration: 3,
                            bufferSize: 5,
                            /* in container % how much we need to drag to trigger the slide change */
                            moveTreshold: 0.1,
                            defaultIndex: 0
                        };

                        // TODO
                        var options = angular.extend({}, defaultOptions);

                        var pressed,
                            startX,
                            isIndexBound = false,
                            offset = 0,
                            destination,
                            swipeMoved = false,
                            //animOnIndexChange = true,
                            currentSlides = [],
                            elWidth = null,
                            elX = null,
                            animateTransitions = true,
                            intialState = true,
                            animating = false,
                            mouseUpBound = false,
                            locked = false;

                        //rn-swipe-disabled =true will only disable swipe events
                        if(iAttributes.rnSwipeDisabled !== "true") {
                            $swipe.bind(iElement, {
                                start: swipeStart,
                                move: swipeMove,
                                end: swipeEnd,
                                cancel: function(event) {
                                    swipeEnd({}, event);
                                }
                            });
                        }

                        function getSlidesDOM() {
                            return iElement[0].querySelectorAll('ul[rn-carousel] > li');
                        }

                        function documentMouseUpEvent(event) {
                            // in case we click outside the carousel, trigger a fake swipeEnd
                            swipeMoved = true;
                            swipeEnd({
                                x: event.clientX,
                                y: event.clientY
                            }, event);
                        }

                        function updateSlidesPosition(offset) {
                            // manually apply transformation to carousel childrens
                            // todo : optim : apply only to visible items
                            var x = scope.carouselBufferIndex * 100 + offset;
                            angular.forEach(getSlidesDOM(), function(child, index) {
                                child.style.cssText = createStyleString(computeCarouselSlideStyle(index, x, options.transitionType));
                            });
                        }

                        scope.nextSlide = function(slideOptions) {
                            var index = scope.carouselIndex + 1;
                            if (index > currentSlides.length - 1) {
                                index = 0;
                            }
                            //if (!locked) {
                                goToSlide(index, slideOptions);
                            //}
                        };

                        scope.prevSlide = function(slideOptions) {
                            var index = scope.carouselIndex - 1;
                            if (index < 0) {
                                index = currentSlides.length - 1;
                            }
                            goToSlide(index, slideOptions);
                        };

                        function goToSlide(index, slideOptions) {

                            // move a to the given slide index
                            if (index === undefined) {
                                index = scope.carouselIndex;
                            }

                            slideOptions = slideOptions || {};
                            if (slideOptions.animate === false || options.transitionType === 'none') {
                                locked = false;
                                offset = index * -100;
                                scope.carouselIndex = index;
                                updateBufferIndex();
                                return;
                            }

                            locked = true;
                            var tweenable = new Tweenable();
                            tweenable.tween({
                                from: {
                                    'x': offset
                                },
                                to: {
                                    'x': index * -100
                                },
                                duration: options.transitionDuration,
                                easing: options.transitionEasing,
                                step: function(state) {
                                    if (isFinite(state.x)) {
                                      updateSlidesPosition(state.x);
                                    }
                                },
                                finish: function() {
                                    scope.$apply(function() {
                                        scope.carouselIndex = index;
                                        offset = index * -100;
                                        updateBufferIndex();
                                        $timeout(function () {
                                          locked = false;
                                        }, 0, false);
                                    });
                                }
                            });
                        }

                        function getContainerWidth() {
                            var rect = iElement[0].getBoundingClientRect();
                            return rect.width ? rect.width : rect.right - rect.left;
                        }

                        function updateContainerWidth() {
                            elWidth = getContainerWidth();
                        }

                        function bindMouseUpEvent() {
                            if (!mouseUpBound) {
                              mouseUpBound = true;
                              $document.bind('mouseup', documentMouseUpEvent);
                            }
                        }

                        function unbindMouseUpEvent() {
                            if (mouseUpBound) {
                              mouseUpBound = false;
                              $document.unbind('mouseup', documentMouseUpEvent);
                            }
                        }

                        function swipeStart(coords, event) {
                            // console.log('swipeStart', coords, event);
                            if (locked || currentSlides.length <= 1) {
                                return;
                            }
                            updateContainerWidth();
                            elX = iElement[0].querySelector('li').getBoundingClientRect().left;
                            pressed = true;
                            startX = coords.x;
                            return false;
                        }

                        function swipeMove(coords, event) {
                            //console.log('swipeMove', coords, event);
                            var x, delta;
                            bindMouseUpEvent();
                            if (pressed) {
                                x = coords.x;
                                delta = startX - x;
                                if (delta > 2 || delta < -2) {
                                    swipeMoved = true;
                                    var moveOffset = offset + (-delta * 100 / elWidth);
                                    updateSlidesPosition(moveOffset);
                                }
                            }
                            return false;
                        }

                        var init = true;
                        scope.carouselIndex = 0;

                        if (!isRepeatBased) {
                            // fake array when no ng-repeat
                            currentSlides = [];
                            angular.forEach(getSlidesDOM(), function(node, index) {
                                currentSlides.push({id: index});
                            });
                        }



                        if (iAttributes.rnCarouselAutoSlide!==undefined) {
                            var duration = 20;
                            scope.autoSlide = function() {
                                if (scope.autoSlider) {
                                    $interval.cancel(scope.autoSlider);
                                    scope.autoSlider = null;
                                }
                                scope.autoSlider = $interval(function() {
                                    //if (!locked && !pressed) {
                                        scope.nextSlide();
                                    //}
                                }, duration * 1000);
                            };
                        }

                        if (iAttributes.rnCarouselDefaultIndex) {
                            var defaultIndexModel = $parse(iAttributes.rnCarouselDefaultIndex);
                            options.defaultIndex = defaultIndexModel(scope.$parent) || 0;
                        }



                        function swipeEnd(coords, event, forceAnimation) {

                        }

                        scope.$on('$destroy', function() {

                        });

                        scope.carouselBufferIndex = 0;
                        scope.carouselBufferSize = options.bufferSize;

                        function updateBufferIndex() {
                        }

                        function onOrientationChange() {
                            updateContainerWidth();
                            goToSlide();
                        }

                        // handle orientation change
                        var winEl = angular.element($window);
                        winEl.bind('orientationchange', onOrientationChange);
                        winEl.bind('resize', onOrientationChange);

                        scope.$on('$destroy', function() {

                        });
                    };
                }
            };
        }
    ]);
})();
