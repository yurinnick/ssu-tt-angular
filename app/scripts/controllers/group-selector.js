var groupSelector = angular.module('group-selector', ['ngCookies']);

groupSelector.controller('groupController', ['$http', '$scope', '$log', '$cookieStore',
    function ($http, $scope, $log, $cookieStore) {
        "use strict";
        $scope.groups = null;
        $scope.group = $cookieStore.get('group_id') || null;
        $scope.getGroups = function (department_id) {
            $scope.schedule = null;
//            $scope.group = $cookieStore.get('group_id') || null;
            if (department_id) {
                if (department_id !== undefined) {
                    $cookieStore.put('deparment_id', department_id);
                }
                $log.debug('Fetching groups data for ' + department_id);
                $http.get('http://api.ssutt.org:8080/1/department/' +
                          department_id + '/groups?filled=1').success(function (data) {
                    $scope.groups = data;
                    if ($scope.group && $scope.groups) {
                        if ($scope.groups.indexOf($scope.group) === -1) {
                            $scope.group = null;
                        } else {
                            $scope.getSchedule(department_id, $scope.group);
                        }
                    }
                });
            }
        };
    }]);

groupSelector.directive('groupSelector', function () {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'views/group-selector.html',
        controller: 'groupController',
        controllerAs: 'groupController'
    };
});
