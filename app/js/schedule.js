var schedule = angular.module('schedule', ['ui.bootstrap']);

schedule.controller('scheduleController', ['$http', '$scope', '$log',
    function ($http, $scope, $log, ngTableParams) {
        "use strict";
        $scope.schedule = null;
        $scope.parityState = '0';
        $scope.$watch('group', function (newVal) {
            var schedule_request = 'http://api.ssutt.org:8080/2/department/' +
                $scope.department + '/group/' + $scope.group;

            $log.debug('Fetching timetable data for ' + $scope.department +
                       ' department ' + $scope.group + ' group');

            $http.get(schedule_request).success(function (data) {
                $scope.schedule = data;
            });
        });

        $scope.$watch('department', function (newVal) {
            $scope.schedule = null;
        });

        var DEBUG = false;
    }]);

schedule.filter('sequenceFilter', [function () {
    return function (records, sequence) {
        result = [];
        angular.forEach(records, function (value, key) {
            if (value.sequence === sequence) {
                this.result[value.day] = value;
            } else if (result[value.day] === undefined) {
                this.result[value.day] = {};
            };
        });
        return result;
    };
}]);

schedule.filter('parityFilter', [function () {
    return function (records, parity) {
        result = [];
        angular.forEach(records, function (value, key) {
            if (value.parity == parity || value.parity == "2") {
                this.result.push(value);
            };
        });
        return result;
    };
}]);


schedule.directive('schedule', function () {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'partials/schedule.html',
        controller: 'scheduleController',
        controllerAs: 'scheduleController'
    };
});
