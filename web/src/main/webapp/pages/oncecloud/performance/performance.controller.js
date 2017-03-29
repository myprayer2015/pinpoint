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

            var timeChart = echarts.init(document.getElementById('time_chart'));
            timeChart.setOption(time_option);
            timeChart.showLoading();


            $scope.serviceId = 0;
            $scope.from_time = '2017-3-29 10:00:10';
            $scope.to_time = '2017-3-29 23:00:10';

            $scope.from = '';
            $scope.to = '';


            $scope.times = [];
            $scope.cv_tags = [];
            $scope.cv_values = [];



            $scope.is_pca = false;


            $scope.query = function () {

                timeChart.showLoading();
                cvChart.showLoading();

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
                        alert($data);
                        console.log($data);
                    });
                }
                catch (err) {
                    console.log(err);
                }
            };




            //pca~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            var pca_option = {
                title: {
                    text: '主成分累计占比'
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
                        data: ['pc1', 'pc2', 'pc3', 'pc4', 'pc5'],
                        axisLabel:{
                            interval:0,//横轴信息全部显示
                            rotate:-50,
                            margin:5,
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '主成分占比',
                    }
                ],
                series: [
                    {
                        name: '主成分占比',
                        type: 'bar',
                        barWidth: '60%',
                        data: [0.8, 0.2, 0.5, 0.3, 0.2]
                    }
                ]
            };


            var pcaChart = echarts.init(document.getElementById('pca_chart'));
            pcaChart.setOption(pca_option);
            pcaChart.showLoading();

            $scope.pca = function () {
                pcaChart.showLoading();

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
                        url: '/getpca.pinpoint?filter=&application=gateway-service&xGroupUnit=35526&yGroupUnit=1&limit=5000&to=' + $scope.to + '&from=' + $scope.from + '&serviceId=' + $scope.serviceId,
                        method: "GET",
                        withCredentials: true,
                        data: {}
                    }).success(function ($data) {
                        console.log($data);

                        //方法名
                        $scope.methodList = $data.methodList;
                        $scope.serviceList = $data.serviceList;

                        try {

                            $scope.pca_x_data = [];
                            $scope.pca_y_data = [];

                            $scope.eigenvalue_list = $data.eigenvalue_list;

                            for (var i = 1; i <= $scope.eigenvalue_list.length; i++) {
                                $scope.pca_x_data.push('PC' + i);
                            }

                            var sum = 0;
                            for (var n = 0; n < $scope.eigenvalue_list.length; n++) {
                                sum += $scope.eigenvalue_list[n];
                            }
                            for (var k = 0; k < $scope.eigenvalue_list.length; k++) {
                                $scope.pca_y_data.push($scope.eigenvalue_list[k] / sum);
                            }


                            pcaChart.hideLoading();
                            pcaChart.setOption({
                                xAxis: [{
                                    data: $scope.pca_x_data
                                }],
                                series: [{
                                    barWidth: '60%',
                                    data: $scope.pca_y_data
                                }]
                            });

                        }
                        catch (err) {
                            console.log('pca error');
                            console.log(err);
                        }

                        try {
                            $scope.eigenvectors_matrix = $data.eigenvectors_matrix;

                            $scope.pca_list = [];
                            for (var p = 0; p < $scope.methodList.length; p++) {
                                $scope.pca_list.push({
                                        'method': $scope.methodList[p],
                                        'service': $scope.serviceList[p],
                                        'PC1': $scope.eigenvectors_matrix[p][0],
                                        'PC2': $scope.eigenvectors_matrix[p][1],
                                        'PC3': $scope.eigenvectors_matrix[p][2],
                                        'PC4': $scope.eigenvectors_matrix[p][3],
                                    }
                                );
                            }
                        }
                        catch (err) {
                            console.log('eigenvectors_matrix error');
                            console.log(err);
                        }

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