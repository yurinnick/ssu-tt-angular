var departmentSelector = angular.module('department-selector', []);

departmentSelector.controller('departmentController', ['$http', '$scope', '$log',
    function ($http, $scope, $log) {
        "use strict";
        $scope.departments = null;
        $scope.department = null;

        $http.get('http://api.ssutt.org:8080/1/departments').success(function (data) {
            $scope.departments = data;
        });
        this.setDepartment = function (id) {
            $scope.current_department = id;
            $log.debug('set department to: ' + id);
        };
    }]);

departmentSelector.directive('departmentSelector', function () {
    "use strict";
    return {
        restrict: 'E',
        templateUrl: 'department-selector.html',
        controller: 'departmentController',
        controllerAs: 'departmentController'
    };
});
