var schedule = angular.module('schedule', ['ui.bootstrap', 'ngCookies']);

schedule.controller('scheduleController', ['$http', '$scope', '$log', '$cookieStore', '$location',
    function ($http, $scope, $log, $cookieStore, $location) {
        "use strict";
        $scope.schedule = null;
        $scope.schedule_time = [
            '8.20 - 09.50',
            '10.00 - 11.35',
            '12.05 - 13.40',
            '13.50 - 15.25',
            '15.35 - 17.10',
            '17.20 - 18.40',
            '18.45 - 20.05',
            '20.10 - 21.30'
        ];
        $scope.parityState = '0';
        $scope.getSchedule = function (department_id, group_id) {
            if (group_id !== undefined) {
                $cookieStore.put('group_id', group_id);
            }
            if (group_id && department_id) {
		$location.search({department:department_id,group:group_id});
                var schedule_request = 'http://api.ssutt.org:8080/2/department/' +
                    department_id + '/group/' + group_id;

                $log.debug('Fetching timetable data for ' + department_id +
                           ' department ' + group_id + ' group');

                $http.get(schedule_request).success(function (data) {
                    if (data.length !== 0) {
                        $scope.schedule = data;
                    } else {
                        $scope.schedule = undefined;
                    }
                });
            }
        };


    }]);

schedule.filter('sequenceFilter', [function () {
    return function (records, sequence) {
        result = [];
        angular.forEach(records, function (value, key) {
            if (value.sequence === sequence) {
                result[value.day] = value;
            } else if (result[value.day] === undefined) {
                result[value.day] = {};
            }
        });
        return result;
    };
}]);

schedule.filter('parityFilter', [function () {
    return function (records, parity) {
        result = [];
        angular.forEach(records, function (value, key) {
            if (value.parity == parity || value.parity === 2) {
                result.push(value);
            }
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
