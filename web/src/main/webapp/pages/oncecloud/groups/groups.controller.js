(function () {
    'use strict';
    /**
     * (en)MainCtrl
     * @ko MainCtrl
     * @group Controller
     * @name MainCtrl
     * @class
     */
    pinpointApp.controller("OnceGroupsCtrl", ["filterConfig", "$rootScope", "$scope", "$timeout", "$routeParams", "locationService", "UrlVoService", "NavbarVoService", "$window", "SidebarTitleVoService", "filteredMapUtilService", "$rootElement", "AnalyticsService", "PreferenceService",'$http',
        function (cfg, $rootScope, $scope, $timeout, $routeParams, locationService, UrlVoService, NavbarVoService, $window, SidebarTitleVoService, filteredMapUtilService, $rootElement, analyticsService, preferenceService, $http) {
            analyticsService.send(analyticsService.CONST.MAIN_PAGE);

            $rootScope.currentPage = analyticsService.CONST.ONCE_GROUPS_PAGE;

            $scope.isLoading = true;

            $scope.name = '';

            $scope.list = null;

            $scope.getList = function () {
                $http({
                    url: '/Cluster/getList.pinpoint?name=' + $scope.name + '&offset=1',
                    method: "POST",
                    withCredentials: true,
                    data: {}
                }).success(function ($data) {
                    console.log($data);
                    $scope.list = $data;
                    $scope.isLoading = false;
                }).error(function ($data) {
                    console.log($data);
                    alert('Ops...'+$data);
                });
            };

            $scope.getList();

        }
    ]);

    pinpointApp.controller("OnceGroupsAddCtrl", ["filterConfig", "$rootScope", "$scope", "$timeout", "$routeParams", "locationService", "UrlVoService", "NavbarVoService", "$window", "SidebarTitleVoService", "filteredMapUtilService", "$rootElement", "AnalyticsService", "PreferenceService", '$location','$http',
        function (cfg, $rootScope, $scope, $timeout, $routeParams, locationService, UrlVoService, NavbarVoService, $window, SidebarTitleVoService, filteredMapUtilService, $rootElement, analyticsService, preferenceService, $location,$http) {
            analyticsService.send(analyticsService.CONST.MAIN_PAGE);

            $rootScope.currentPage = analyticsService.CONST.ONCE_GROUPS_PAGE;


            $scope.name = '';
            $scope.description = '';


            $scope.add = function () {
                $http({
                    url: '/Cluster/add.pinpoint?name=' + $scope.name + '&description=' + $scope.description,
                    method: "POST",
                    withCredentials: true,
                    data: {}
                }).success(function ($data) {
                    console.log($data);
                    if ($data.success) {
                        $location.path('/oncecloud/groups/');
                    }
                    else {
                        alert('Ops...' + $data);
                    }
                }).error(function ($data) {
                    console.log($data);
                    alert('Ops...' + $data);
                });
            };
        }
    ]);


})();