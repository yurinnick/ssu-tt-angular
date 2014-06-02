var departmentSelector = angular.module('department-selector', []);

departmentSelector.controller('departmentController', ['$http', '$scope', '$log', function ($http, $scope, $log) {
    $scope.departments = [
        {name: "Биологический факультет", tag: "bf"},
        {name: "Философский факультет", tag: "fp"},
        {name: "Экономический факультет", tag: "ef"},
        {name: "Юридический факультет", tag: "uf"}
    ];
    $scope.department = null;
//    $http.get('http://api.ssutt.org:8080/departments').success(function (data) {
//        data.forEach(function (item, i, arr) {
//            var key = Object.keys(item)[0];
//            dpController.departments_info.push(item[key]);
//        });
//    });
    this.setDepartment = function (id) {
        $scope.current_department = id
        $log.debug('set department to: ' + id);
    };
}]);

departmentSelector.directive('departmentSelector', function () {
    return {
        restrict: 'E',
        templateUrl: 'department-selector.html',
        controller: 'departmentController',
        controllerAs: 'departmentController'
    };
});
