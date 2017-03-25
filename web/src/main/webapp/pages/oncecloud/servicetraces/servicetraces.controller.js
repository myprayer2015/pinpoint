(function () {
    'use strict';
    /**
     * (en)MainCtrl
     * @ko MainCtrl
     * @group Controller
     * @name MainCtrl
     * @class
     */
    pinpointApp.controller("OnceServicetracesCtrl", ["filterConfig", "$rootScope", "$scope", "$timeout", "$routeParams", "locationService", "UrlVoService", "NavbarVoService", "$window", "SidebarTitleVoService", "filteredMapUtilService", "$rootElement", "AnalyticsService", "PreferenceService","$http",
        function (cfg, $rootScope, $scope, $timeout, $routeParams, locationService, UrlVoService, NavbarVoService, $window, SidebarTitleVoService, filteredMapUtilService, $rootElement, analyticsService, preferenceService,$http) {
            analyticsService.send(analyticsService.CONST.MAIN_PAGE);

            $rootScope.currentPage = analyticsService.CONST.ONCE_SERVICETRACES_PAGE;

            $scope.isLoading = true;

            $scope.service = '';

            $scope.list = null;

            $scope.getList = function () {
                $http({
                    url: '/ServiceTraces/getTraceList.pinpoint?service=' + $scope.service,
                    method: "GET",
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

    pinpointApp.controller("OnceServicetracesListCtrl", ["filterConfig", "$rootScope", "$scope", "$timeout", "$routeParams", "locationService", "UrlVoService", "NavbarVoService", "$window", "SidebarTitleVoService", "filteredMapUtilService", "$rootElement", "AnalyticsService", "PreferenceService","$http",
        function (cfg, $rootScope, $scope, $timeout, $routeParams, locationService, UrlVoService, NavbarVoService, $window, SidebarTitleVoService, filteredMapUtilService, $rootElement, analyticsService, preferenceService,$http) {
            analyticsService.send(analyticsService.CONST.MAIN_PAGE);

            $rootScope.currentPage = analyticsService.CONST.ONCE_SERVICETRACES_PAGE;
            $scope.serviceId = $routeParams.serviceId;

            $scope.service = null;


            $scope.isLoading = true;
            $scope.getServiceDetail = function () {
                $http({
                    url: '/ServiceTraces/getTrace.pinpoint?serviceId=' + $scope.serviceId,
                    method: "GET",
                    withCredentials: true,
                    data: {}
                }).success(function ($data) {
                    console.log($data);
                    $scope.service = $data;
                    $scope.isLoading = false;
                }).error(function ($data) {
                    console.log($data);
                    alert('Ops...'+$data);
                });
            };

            $scope.getServiceDetail();

        }
    ]);
})();