var departmentSelector = angular.module('department-selector', ['ngCookies']);

departmentSelector.controller('departmentController', ['$http', '$scope', '$log', '$cookieStore', '$location',
    function ($http, $scope, $log, $cookieStore, $location) {
        "use strict";
        $scope.params = $location.search();
        $scope.department = $cookieStore.get('deparment_id') || $scope.params.department || null;
        $scope.departments = null;
        $http.get('http://api.ssutt.org:8080/1/departments').success(function (data) {
            $scope.departments = data;
        });
    }]);

departmentSelector.directive('departmentSelector', function () {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'views/department-selector.html',
        controller: 'departmentController',
        controllerAs: 'departmentController'
    };
});
