(function (angular) {

    // Count-Up directive
    // --------------------------------------------
    //
    // * **Class:** CountUp
    // * **Author:** Jamie Perkins
    //
    // Creates a counting animation for numbers
    // REQUIRED attributes: 
    // - endVal
    //
    // DEPENDENCY: countUp.js

    'use strict';

    var module = angular.module('countUpModule', []);

    /**
     * count-up attribute directive
     * 
     * @param {number} startVal - (optional) The value you want to begin at, default 0
     * @param {number} endVal - The value you want to arrive at
     * @param {number} duration - (optional) Duration in seconds, default 2.
     * @param {number} decimals - (optional) Number of decimal places in number, default 0
     * @param {boolean} reanimateOnClick - (optional) Config if reanimate on click event, default true.
     * @param {string} filter - (optional) Filter expression to apply to animated values
     */
    module.directive('countUp', [ '$filter', function($filter) {

        return {
            restrict: 'A',
            scope: {
                startVal: "=?",
                endVal: "=",
                duration: "=?",
                decimals: "=?",
                reanimateOnClick: "=?",
                filter: '@'
            },
            link: function ($scope, $el, $attrs) {

                var filterFunction = null;

                if($scope.filter != null) {
                    filterFunction = createFilterFunction();
                }

                var countUp = createCountUp($scope.startVal, $scope.endVal, $scope.decimals, $scope.duration);

                function createFilterFunction() {
                    var filterParams = $scope.filter.split(':');
                    var filterName = filterParams.shift();

                    return function(value) {
                        var filterCallParams = [value];
                        Array.prototype.push.apply(filterCallParams, filterParams);
                        var value = $filter(filterName).apply(null, filterCallParams)
                        return value;
                    }
                }

                function createCountUp(sta, end, dec, dur) {
                    sta = sta || 0;
                    if (isNaN(sta)) sta = Number(sta.match(/[\d\-\.]+/g).join('')); // strip non-numerical characters
                    end = end || 0;
                    if (isNaN(end)) end = Number(end.match(/[\d\-\.]+/g).join('')); // strip non-numerical characters
                    dur = Number(dur) || 2,
                    dec = Number(dec) || 0;

                    var options = {
                        postFormatter: filterFunction
                    };

                    // construct countUp 
                    var countUp = new CountUp($el[0], sta, end, dec, dur, options);
                    if (end > 999) {
                        // make easing smoother for large numbers
                        countUp = new CountUp($el[0], sta, end - 100, dec, dur / 2, options);
                    }

                    return countUp;
                }

                function animate() {
                    countUp.reset();
                    if ($scope.endVal > 999) {
                        countUp.start(function() {
                            countUp.update($scope.endVal);
                        });
                    }
                    else {
                        countUp.start();
                    }
                }

                // fire on scroll-spy event, or right away
                if ($attrs.scrollSpyEvent) {
                    // listen for scroll spy event
                    $scope.$on($attrs.scrollSpyEvent, function (event, data) {
                        if (data === $attrs.id) {
                            animate();
                        }
                    });
                }
                else {
                    animate();
                }

                // re-animate on click
                var reanimateOnClick = angular.isDefined($scope.reanimateOnClick) ? $scope.reanimateOnClick : true;
                if (reanimateOnClick) {
                    $el.on('click', function() {
                        animate();
                    });
                }

                $scope.$watch('endVal', function (newValue, oldValue) {
                    if (newValue == null || newValue === oldValue) {
                        return;
                    }

                    countUp = createCountUp($scope.startVal, $scope.endVal, $scope.decimals, $scope.duration);

                    animate();
                })
            }
        }
    }]);
})(angular);