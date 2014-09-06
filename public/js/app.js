(function(angular) {

    'use strict';

    angular.module('systemMonitor', ['ngRoute'])
        .config(function($routeProvider) {
            $routeProvider
            .when('/', {
                    templateUrl: 'views/dashboard.html',
                    controller: DashboardCtrl
                })
            ;
        })
    ;

    var DashboardCtrl = function ($scope, $http) {
        $scope.fetchStats = function() {
            return $http.get('/stats.json').success(function(data, status, headers, config) {
                $scope.stats = data;
            });
        }

        $scope.refreshStats = function() {
            $scope.fetchStats();
        }

        $scope.fetchStats();
    };

})(angular);
