(function () {
    'use strict';
    /**
     * (en)MainCtrl
     * @ko MainCtrl
     * @group Controller
     * @name MainCtrl
     * @class
     */
    pinpointApp.controller("OnceHostsCtrl", ["filterConfig", "$rootScope", "$scope", "$timeout", "$routeParams", "locationService", "UrlVoService", "NavbarVoService", "$window", "SidebarTitleVoService", "filteredMapUtilService", "$rootElement", "AnalyticsService", "PreferenceService",'$http',
        function (cfg, $rootScope, $scope, $timeout, $routeParams, locationService, UrlVoService, NavbarVoService, $window, SidebarTitleVoService, filteredMapUtilService, $rootElement, analyticsService, preferenceService, $http) {
            analyticsService.send(analyticsService.CONST.MAIN_PAGE);
            $rootScope.currentPage = analyticsService.CONST.ONCE_HOSTS_PAGE;

            $scope.isClusterLoading = true;
            $scope.isHostLoading = true;

            $scope.clusters = [];
            $scope.cluster = null;

            $scope.getClusterList = function () {
                $http({
                    url: '/Cluster/getList.pinpoint',
                    method: "POST",
                    withCredentials: true,
                    data: {}
                }).success(function ($data) {
                    // 这里应该先处理$data = null的情况
                    console.log($data);
                    // 在下拉列表中添加一个'所有'的选项
                    var temp = JSON.parse(JSON.stringify($data[0]));
                    temp.id = -1;
                    temp.name = '所有';
                    temp.description = 'All';
                    $data.unshift(temp);
                    console.log($data);

                    $scope.clusters = $data;
                    $scope.cluster = $scope.clusters[0];
                    $scope.isClusterLoading = false;
                    $scope.getHostList();
                }).error(function ($data) {
                    console.log($data);
                    alert('Ops...'+$data);
                });
            };

            $scope.getHostList = function () {
                var data = {
                    'name': $scope.name,
                    'cluster_id': $scope.cluster.id,
                    'offset': 0
                };
                data = $.param(data);
                $http({
                    url: '/Host/getList.pinpoint',
                    method: "POST",
                    withCredentials: true,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function ($data) {
                    console.log($data);
                    $scope.list = $data;
                    $scope.isHostLoading = false;
                }).error(function ($data) {
                    console.log($data);
                    alert('Ops...'+$data);
                });
            };

            $scope.getClusterList();
        }
    ]);

    pinpointApp.controller("OnceHostsAddCtrl", ["filterConfig", "$rootScope", "$scope", "$timeout", "$routeParams", "locationService", "UrlVoService", "NavbarVoService", "$window", "SidebarTitleVoService", "filteredMapUtilService", "$rootElement", "AnalyticsService", "PreferenceService", '$http', '$location',
        function (cfg, $rootScope, $scope, $timeout, $routeParams, locationService, UrlVoService, NavbarVoService, $window, SidebarTitleVoService, filteredMapUtilService, $rootElement, analyticsService, preferenceService, $http, $location) {
            analyticsService.send(analyticsService.CONST.MAIN_PAGE);
            $rootScope.currentPage = analyticsService.CONST.ONCE_HOSTS_PAGE;

            $scope.isLoading = true;

            $scope.clusters = [];

            $scope.getList = function () {
                $http({
                    url: '/Cluster/getList.pinpoint',
                    method: "POST",
                    withCredentials: true,
                    data: {}
                }).success(function ($data) {
                    console.log($data);
                    $scope.clusters = $data;
                    $scope.cluster = $scope.clusters[0];
                    $scope.isLoading = false;
                }).error(function ($data) {
                    console.log($data);
                    alert('Ops...'+$data);
                });
            };

            $scope.name = '';
            $scope.status = 0;
            $scope.interface = '';
            $scope.port = 0;
            $scope.description = '';

            $scope.add = function () {
                var data = {
                    'name': $scope.name,
                    'cluster_id': $scope.cluster.id,
                    'interface': $scope.interface + ':' + $scope.port,
                    'status': $scope.status,
                    'description': $scope.description
                };
                data = $.param(data);
                $http({
                    /*url: '/Host/add.pinpoint?name=' + $scope.name + '&cluster_id=' + $scope.cluster.id + '&interface=' + $scope.interface + '&status=' + $scope.status + '&description=' + $scope.description,*/
                    url: '/Host/add.pinpoint',
                    method: "POST",
                    withCredentials: true,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function ($data) {
                    console.log($data);
                    if ($data.success) {
                        $location.path('/oncecloud/hosts/');
                    }
                    else {
                        alert('Ops...' + $data);
                    }
                }).error(function ($data) {
                    console.log($data);
                    alert('Ops...' + $data);
                });
            };

            $scope.getList();
        }
    ]);

})();