(function () {
    'use strict';
    /**
     * (en)MainCtrl
     * @ko MainCtrl
     * @group Controller
     * @name MainCtrl
     * @class
     */
    pinpointApp.controller("OncePerformanceCtrl", ["$http", "filterConfig", "$rootScope", "$scope", "$timeout", "$routeParams", "locationService", "UrlVoService", "NavbarVoService", "$window", "SidebarTitleVoService", "filteredMapUtilService", "$rootElement", "AnalyticsService", "PreferenceService",
        function ($http, cfg, $rootScope, $scope, $timeout, $routeParams, locationService, UrlVoService, NavbarVoService, $window, SidebarTitleVoService, filteredMapUtilService, $rootElement, analyticsService, preferenceService) {
            analyticsService.send(analyticsService.CONST.MAIN_PAGE);

            $rootScope.currentPage = analyticsService.CONST.ONCE_PERFORMANCE_PAGE;

            var cv_option = {
                title: {
                    text: '变异程度'
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['注册成功', 'Account参数不合法', 'Account账号已存在', 'Auth参数不合法', 'Auth账号已存在'],
                        // axisTick: {
                        //     alignWithLabel: true
                        // }
                        axisLabel:{
                            interval:0,//横轴信息全部显示
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '变异程度(cv)',
                    }
                ],
                series: [
                    {
                        name: '变异程度',
                        type: 'bar',
                        barWidth: '60%',
                        data: [1.2, 0.2, 0.5, 0.3, 0.2]
                    }
                ]
            };


            var cvChart = echarts.init(document.getElementById('cv_chart'));
            cvChart.setOption(cv_option);
            cvChart.showLoading();


            var time_option = {
                title: {
                    text: '响应时间'
                },
                tooltip: {
                    trigger: 'axis',
                    // formatter: function (params) {
                    //     params = params[0];
                    //     var date = new Date(params.name);
                    //     return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                    // },
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    name: '时间',
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '响应时间(ms)',
                    boundaryGap: [0, '100%'],
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    name: '响应时间(ms)',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: []
                }]
            };

            // var time_option = {
            //     title: {
            //         text: 'Untitle',
            //         subtext: '折线图'
            //     },
            //     tooltip: {
            //         trigger: 'axis'
            //     },
            //     toolbox: {
            //         show: true,
            //         feature: {
            //             magicType: {show: true, type: ['stack', 'tiled']},
            //             saveAsImage: {show: true}
            //         }
            //     },
            //     xAxis: {
            //         type: 'time',
            //         boundaryGap: false,
            //     },
            //     yAxis: {
            //         type: 'value'
            //     },
            //     series: [{
            //         name: 'tcp_allocated_num',
            //         type: 'line',
            //         smooth: true,
            //         data: []
            //     }]
            // };

            var timeChart = echarts.init(document.getElementById('time_chart'));
            timeChart.setOption(time_option);
            timeChart.showLoading();


            $scope.serviceId = 0;
            $scope.from_time = '2017-3-28 23:00:10';
            $scope.to_time = '2017-3-29 23:00:10';

            $scope.from = '';
            $scope.to = '';


            $scope.times = [];
            $scope.cv_tags = [];
            $scope.cv_values = [];



            $scope.is_pca = false;


            $scope.query = function () {
                $scope.is_pca = false;

                $scope.isLoading = true;
                $scope.traceList = [];

                $scope.times = [];
                $scope.cv_tags = [];
                $scope.cv_values = [];

                // 获取某个时间格式的时间戳
                $scope.from = Date.parse(new Date($scope.from_time));
                $scope.to = Date.parse(new Date($scope.to_time));

                console.log($scope.from);
                console.log($scope.to);

                try {
                    $http({
                        //http://133.133.135.2:38080/getTransactionList.pinpoint?to=1490104086000&from=1490103786000&limit=5000&filter=&application=gateway-service&xGroupUnit=35526&yGroupUnit=1
                        url: '/getCVAndTime.pinpoint?filter=&application=gateway-service&xGroupUnit=35526&yGroupUnit=1&limit=5000&to=' + $scope.to + '&from=' + $scope.from + '&serviceId=' + $scope.serviceId,
                        method: "GET",
                        withCredentials: true,
                        data: {}
                    }).success(function ($data) {
                        console.log($data);
                        $scope.cv_values = $data.cv_list;
                        // for (var i = 0; i < $scope.cv_values.length; i++) {
                        //     $scope.cv_tags.push('轨迹编号' + i);
                        // }

                        cvChart.hideLoading();
                        cvChart.setOption({
                            // xAxis: [{
                            //     data: $scope.cv_tags
                            // }],
                            series: [{
                                barWidth: '60%',
                                data: $scope.cv_values
                            }]
                        });


                        var dotList = $data.dotList;
                        for (var j = 0; j < dotList.length; j++) {
                            $scope.times.push([dotList[j][0], dotList[j][7]]);
                        }
                        // console.log($scope.times);
                        $scope.times.sort(function (a, b) {
                            return a[0] - b[0];
                        });

                        timeChart.hideLoading();
                        timeChart.setOption({
                            series: [{
                                name: 'x',
                                data: $scope.times
                            }]
                        });

                    }).error(function ($data) {
                        console.log($data);
                    });
                }
                catch (err) {
                    console.log(err);
                }
            };

            $scope.pca = function () {
                $scope.is_pca = true;

                $scope.isLoading = true;
                $scope.traceList = [];

                $scope.times = [];
                $scope.cv_tags = [];
                $scope.cv_values = [];

                // 获取某个时间格式的时间戳
                $scope.from = Date.parse(new Date($scope.from_time));
                $scope.to = Date.parse(new Date($scope.to_time));

                console.log($scope.from);
                console.log($scope.to);

                try {
                    $http({
                        //http://133.133.135.2:38080/getTransactionList.pinpoint?to=1490104086000&from=1490103786000&limit=5000&filter=&application=gateway-service&xGroupUnit=35526&yGroupUnit=1
                        url: '/getCVAndTime.pinpoint?filter=&application=gateway-service&xGroupUnit=35526&yGroupUnit=1&limit=5000&to=' + $scope.to + '&from=' + $scope.from + '&serviceId=' + $scope.serviceId,
                        method: "GET",
                        withCredentials: true,
                        data: {}
                    }).success(function ($data) {
                        console.log($data);
                        $scope.cv_values = $data.cv_list;
                        // for (var i = 0; i < $scope.cv_values.length; i++) {
                        //     $scope.cv_tags.push('轨迹编号' + i);
                        // }

                        cvChart.hideLoading();
                        cvChart.setOption({
                            // xAxis: [{
                            //     data: $scope.cv_tags
                            // }],
                            series: [{
                                barWidth: '60%',
                                data: $scope.cv_values
                            }]
                        });


                        var dotList = $data.dotList;
                        for (var j = 0; j < dotList.length; j++) {
                            $scope.times.push([dotList[j][0], dotList[j][7]]);
                        }
                        // console.log($scope.times);
                        $scope.times.sort(function (a, b) {
                            return a[0] - b[0];
                        });

                        timeChart.hideLoading();
                        timeChart.setOption({
                            series: [{
                                name: 'x',
                                data: $scope.times
                            }]
                        });

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