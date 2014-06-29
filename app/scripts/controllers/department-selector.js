var departmentSelector = angular.module('department-selector', []);

departmentSelector.controller('departmentController', ['$http', '$scope', '$log',
    function ($http, $scope, $log) {
        "use strict";
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
