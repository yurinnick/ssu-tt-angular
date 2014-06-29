var groupSelector = angular.module('group-selector', []);

groupSelector.controller('groupController', ['$http', '$scope', '$log',
    function ($http, $scope, $log) {
        "use strict";
        $scope.groups = null;
        
        $scope.getGroups = function(department_id) {
            $log.debug('Fetching groups data for ' + department_id);
            $http.get('http://api.ssutt.org:8080/1/department/' +
                      department_id + '/groups?filled=1').success(function (data) {
                $scope.groups = data;
            });
        }
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
