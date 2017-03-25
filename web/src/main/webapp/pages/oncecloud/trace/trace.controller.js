(function () {
    'use strict';
    /**
     * (en)MainCtrl
     * @ko MainCtrl
     * @group Controller
     * @name MainCtrl
     * @class
     */
    pinpointApp.controller("OnceTraceCtrl", ["filterConfig", "$rootScope", "$scope", "$timeout", "$routeParams", "locationService", "UrlVoService", "NavbarVoService", "$window", "SidebarTitleVoService", "filteredMapUtilService", "$rootElement", "AnalyticsService", "PreferenceService",
        function (cfg, $rootScope, $scope, $timeout, $routeParams, locationService, UrlVoService, NavbarVoService, $window, SidebarTitleVoService, filteredMapUtilService, $rootElement, analyticsService, preferenceService) {
            analyticsService.send(analyticsService.CONST.MAIN_PAGE);

            $rootScope.currentPage = analyticsService.CONST.ONCE_ERROR_PAGE;

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '故障异常程度图'
                },
                tooltip: {
                    trigger: 'axis',
                    showDelay: 0,
                    axisPointer: {
                        show: true,
                        type: 'cross',
                        lineStyle: {
                            type: 'dashed',
                            width: 1
                        }
                    },
                    zlevel: 1
                },
                legend: {
                    data: ['sin', 'cos']
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataZoom: {show: true},
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                xAxis: [
                    {
                        type: 'time',
                        scale: true
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        scale: false,
                        min: 0,
                        max: 1
                    }
                ],
                series: [{
                    name: 'x',
                    type: 'scatter',
                    symbolSize: 5,
                    large: true,
                    data: []
                }]
            };


            myChart.setOption(option);
            myChart.showLoading();


            var d = [];
            setInterval(function () {

                //x = (Math.random() * 10).toFixed(3);
                //for(var i=0;i<100;i++){
                //
                //}
                var x = Date.parse(new Date());
                d.push([x, Math.random().toFixed(3)]);

                console.log(d);
                myChart.hideLoading();
                myChart.setOption({
                    series: [{
                        name: 'x',
                        data: d
                    }]
                });


            }, 1000);
        }
    ]);

    pinpointApp.controller("OnceTracesListCtrl", ["$http", "filterConfig", "$rootScope", "$scope", "$timeout", "$routeParams", "locationService", "UrlVoService", "NavbarVoService", "$window", "SidebarTitleVoService", "filteredMapUtilService", "$rootElement", "AnalyticsService", "PreferenceService",
        function ($http, cfg, $rootScope, $scope, $timeout, $routeParams, locationService, UrlVoService, NavbarVoService, $window, SidebarTitleVoService, filteredMapUtilService, $rootElement, analyticsService, preferenceService) {
            analyticsService.send(analyticsService.CONST.MAIN_PAGE);

            $rootScope.currentPage = analyticsService.CONST.ONCE_TRACELIST_PAGE;

            $scope.from_time = '2017-3-25 17:10:10';
            $scope.to_time = '2017-3-25 17:15:10';

            $scope.from = '';
            $scope.to = '';

            $scope.isLoading = true;

            $scope.traceList = [];

            $scope.query = function () {
                $scope.isLoading = true;
                $scope.traceList = [];

                // 获取某个时间格式的时间戳
                $scope.from = Date.parse(new Date($scope.from_time));
                $scope.to = Date.parse(new Date($scope.to_time));

                console.log($scope.from);
                console.log($scope.to);

                try {
                    $http({
                        //http://133.133.135.2:38080/getTransactionList.pinpoint?to=1490104086000&from=1490103786000&limit=5000&filter=&application=gateway-service&xGroupUnit=35526&yGroupUnit=1
                        url: '/getTransactionList.pinpoint?filter=&application=gateway-service&xGroupUnit=35526&yGroupUnit=1&limit=5000&to=' + $scope.to + '&from=' + $scope.from,
                        method: "GET",
                        withCredentials: true,
                        data: {}
                    }).success(function ($data) {
                        console.log($data);
                        $scope.traceList = $data;
                        $scope.isLoading = false;
                    }).error(function ($data) {
                        console.log($data);
                    });
                }
                catch (err) {
                    console.log(err);
                }
            };
        }
    ]);
})();