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

    pinpointApp.controller("OnceHostsItemsCtrl", ["filterConfig", "$rootScope", "$scope", "$timeout", "$routeParams", "locationService", "UrlVoService", "NavbarVoService", "$window", "SidebarTitleVoService", "filteredMapUtilService", "$rootElement", "AnalyticsService", "PreferenceService", '$http', '$location',
        function (cfg, $rootScope, $scope, $timeout, $routeParams, locationService, UrlVoService, NavbarVoService, $window, SidebarTitleVoService, filteredMapUtilService, $rootElement, analyticsService, preferenceService, $http, $location) {
            analyticsService.send(analyticsService.CONST.MAIN_PAGE);
            $rootScope.currentPage = analyticsService.CONST.ONCE_HOSTS_PAGE;

            $scope.isLoading = true;
            $scope.hostName = $location.search().hostName;
            $scope.hostId = $location.search().hostId;
            $scope.list = [];

            $scope.getList = function () {
                var data = {
                    'host_id': $scope.hostId,
                    'offset': 0
                };
                data = $.param(data);
                $http({
                    url: '/Item/getList.pinpoint',
                    method: "POST",
                    withCredentials: true,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function ($data) {
                    console.log($data);
                    $scope.list = $data;
                    $scope.isLoading = false;
                }).error(function ($data) {
                    console.log($data);
                    alert('Ops...'+$data);
                });
            };

            //测试调用Bosun接口
            $scope.test = function () {
                var expr = 'q("sum:linux.cpu", "1h", "")';
                $http({
                    /*url: 'http://133.133.135.2:8001/proxy/api/expr',*/
                    url: '/proxy/api/expr',
                    method: "POST",
                    withCredentials: false,
                    data: expr,
                    processData: false,
                    headers: {'Content-Type': 'application/json'}
                }).success(function ($data) {
                    console.log($data);
                }).error(function ($data) {
                    console.log($data);
                    alert('Ops...'+$data);
                });
            };

            $scope.getList();

        }
    ]);

    pinpointApp.controller("OnceHostsItemsChartCtrl", ["filterConfig", "$rootScope", "$scope", "$timeout", "$routeParams", "locationService", "UrlVoService", "NavbarVoService", "$window", "SidebarTitleVoService", "filteredMapUtilService", "$rootElement", "AnalyticsService", "PreferenceService", '$http', '$location',
        function (cfg, $rootScope, $scope, $timeout, $routeParams, locationService, UrlVoService, NavbarVoService, $window, SidebarTitleVoService, filteredMapUtilService, $rootElement, analyticsService, preferenceService, $http, $location) {
            analyticsService.send(analyticsService.CONST.MAIN_PAGE);
            $rootScope.currentPage = analyticsService.CONST.ONCE_HOSTS_PAGE;

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));

            $scope.startTime = $location.search().startTime;
            $scope.metric = $location.search().metric;
            $scope.downsample = $location.search().downsample;

            /*$scope.getList = function () {
                var data = {
                    'host_id': $scope.hostId,
                    'offset': 0
                };
                data = $.param(data);
                $http({
                    url: '/Item/getList.pinpoint',
                    method: "POST",
                    withCredentials: true,
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function ($data) {
                    console.log($data);
                    $scope.list = $data;
                    $scope.isLoading = false;
                }).error(function ($data) {
                    console.log($data);
                    alert('Ops...'+$data);
                });
            };
*/

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: 'Untitle',
                    subtext: '折线图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: true,
                    feature: {
                        magicType: {show: true, type: ['stack', 'tiled']},
                        saveAsImage: {show: true}
                    }
                },
                xAxis: {
                    type: 'time',
                    boundaryGap: false,
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: 'tcp_allocated_num',
                    type: 'line',
                    smooth: true,
                    data: []
                }]
            };

            myChart.setOption(option);
            myChart.showLoading();

            $scope.showChart = function () {
                /*var expr = 'q("sum:linux.cpu", "1h", "")';*/
                $http({
                    /*url: 'http://133.133.135.2:8070/api/expr?date=&time=',*/
                    url: 'http://133.133.135.2:4242/api/query?start='+ $scope.startTime + '&m=' + $scope.downsample + ':' + $scope.metric,
                    method: "GET",
                    withCredentials: false,
                    /*data: JSON.stringify(expr),*/
                }).success(function ($data) {
                    console.log($data);
                    var dps = $data[0].dps;
                    var dps_array = $.map(dps, function(value, index) {
                        // JavaScript中时间戳单位是毫秒
                        return [[index * 1000, value]];
                    });
                    console.log(dps_array);

                    myChart.hideLoading();
                    myChart.setOption({
                        title: {
                            text: $scope.metric,
                            subtext: '折线图'
                        },
                        series: [{
                            name: $scope.metric,
                            data: dps_array
                        }]
                    });
                    /*$scope.setChart(dps_array);*/
                }).error(function ($data) {
                    console.log($data);
                    alert('Ops...'+$data);
                });
            };

            $scope.getMetricData = function () {
                myChart.showLoading();
                $scope.startTime = $scope.startTime_in;
                $scope.metric = $scope.metric_in;
                $scope.downsample = $scope.downsample_in;
                $scope.showChart();
            };

            setInterval(function () {
                $scope.showChart();
            }, 3000);

        }
    ]);

})();