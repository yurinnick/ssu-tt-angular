var schedule = angular.module('schedule', ['ui.bootstrap']);

schedule.controller('scheduleController', ['$http', '$scope', '$log',
    function ($http, $scope, $log, ngTableParams) {
        "use strict";
        $scope.schedule = null;
        $scope.parityState = '0';
        
        $scope.getSchedule = function(department_id, group_id) {
            var schedule_request = 'http://api.ssutt.org:8080/2/department/' +
                department_id + '/group/' + group_id;

            $log.debug('Fetching timetable data for ' + department_id +
                       ' department ' + group_id + ' group');

            $http.get(schedule_request).success(function (data) {
                $scope.schedule = data;
            });            
        };
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
        templateUrl: 'views/schedule.html',
        controller: 'scheduleController',
        controllerAs: 'scheduleController'
    };
});
