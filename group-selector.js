var groupSelector = angular.module('group-selector', []);

groupSelector.controller('groupController', ['$http', '$scope', '$log', function ($http, $scope, $log) {
    $scope.groups = [];
    $scope.group = null;

    $scope.$watch('department', function (newVal) {
        $log.debug('Fetching groups data for ' + $scope.department);
        $http.get('http://api.ssutt.org:8080/department/' +
                  $scope.department + '/groups/all').success(function (data) {
            $scope.groups = data;
        });
    });

    var setGroup = function (id) {
        $scope.group = id;
        $log.debug('set group to:' + id);
    };
}]);

groupSelector.directive('groupSelector', function () {
    return {
        restrict: 'E',
        templateUrl: 'group-selector.html',
        controller: 'groupController',
        controllerAs: 'groupController'
    };
});
