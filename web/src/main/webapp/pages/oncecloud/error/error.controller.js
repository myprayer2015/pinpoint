(function () {
    'use strict';
    /**
     * (en)MainCtrl
     * @ko MainCtrl
     * @group Controller
     * @name MainCtrl
     * @class
     */
    pinpointApp.controller("OnceErrorCtrl", ["$interval","filterConfig", "$http", "$rootScope", "$scope", "$timeout", "$routeParams", "locationService", "UrlVoService", "NavbarVoService", "$window", "SidebarTitleVoService", "filteredMapUtilService", "$rootElement", "AnalyticsService", "PreferenceService",
        function ($interval,cfg, $http, $rootScope, $scope, $timeout, $routeParams, locationService, UrlVoService, NavbarVoService, $window, SidebarTitleVoService, filteredMapUtilService, $rootElement, analyticsService, preferenceService) {
            analyticsService.send(analyticsService.CONST.MAIN_PAGE);

            $rootScope.currentPage = analyticsService.CONST.ONCE_ERROR_PAGE;


            $scope.num_success = 0;

            $scope.num_error = 0;

            $scope.errorTraceList = [];

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '故障异常程度实时查询图'
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


            var now = new Date();
            var xxx = new Date(now.getTime() - 1000);

            var to = Date.parse(now);
            var from = Date.parse(xxx);

            console.log(to);
            console.log(from);


            var d = [];
            var getList = function () {
                from = to;
                to = to + 2000;
                try {
                    $http({
                        //http://133.133.135.2:38080/getTransactionList.pinpoint?to=1490104086000&from=1490103786000&limit=5000&filter=&application=gateway-service&xGroupUnit=35526&yGroupUnit=1
                        url: '/getTransactionList.pinpoint?filter=&application=gateway-service&xGroupUnit=35526&yGroupUnit=1&limit=5000&to=' + to + '&from=' + from,
                        method: "GET",
                        withCredentials: true,
                        data: {}
                    }).success(function ($data) {
                        console.log($data);
                        for (var i = 0; i < $data.length; i++) {
                            $scope.errorTraceList.push($data[i]);
                            d.push([$data[i][0], $data[i][1].toFixed(3)]);
                            if ($data[i][9] === 0) {
                                $scope.num_success++;
                            }
                            else {
                                $scope.num_error++;
                            }
                        }
                        myChart.hideLoading();
                        myChart.setOption({
                            series: [{
                                name: 'x',
                                data: d
                            }]
                        });
                        // $scope.list = $data;
                        // $scope.isLoading = false;
                    }).error(function ($data) {
                        console.log($data);
                        //  alert('Ops...' + $data);
                    });
                }
                catch (err) {
                    console.log(err);
                }

            };

            // store the interval promise in this variable
            var promise;

            // starts the interval
            $scope.start = function() {
                // stops any running interval to avoid two intervals running at the same time
                $scope.stop();
                // store the interval promise
                promise = $interval(getList, 2000);
            };

            // stops the interval
            $scope.stop = function() {
                $interval.cancel(promise);
            };

            // starting the interval by default
            $scope.start();

            $scope.$on('$destroy', function() {
                $scope.stop();
            });


            //
            // setInterval(function () {
            //     var x = Date.parse(new Date());
            //     d.push([x, Math.random().toFixed(3)]);
            //
            //     console.log(d);
            //     myChart.hideLoading();
            //     myChart.setOption({
            //         series: [{
            //             name: 'x',
            //             data: d
            //         }]
            //     });
            //
            //
            // }, 1000);



        }
    ]);
})();