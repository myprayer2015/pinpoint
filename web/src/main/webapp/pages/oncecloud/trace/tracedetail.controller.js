(function () {
    'use strict';
    /**
     * (en)MainCtrl
     * @ko MainCtrl
     * @group Controller
     * @name MainCtrl
     * @class
     */
    pinpointApp.controller("OnceTraceDetailCtrl", ["$http","filterConfig", "$location","$rootScope", "$scope", "$timeout", "$routeParams", "locationService", "UrlVoService", "NavbarVoService", "$window", "SidebarTitleVoService", "filteredMapUtilService", "$rootElement", "AnalyticsService", "PreferenceService",
        function ($http,cfg, $location,$rootScope, $scope, $timeout, $routeParams, locationService, UrlVoService, NavbarVoService, $window, SidebarTitleVoService, filteredMapUtilService, $rootElement, analyticsService, preferenceService) {

            analyticsService.send(analyticsService.CONST.MAIN_PAGE);

            $rootScope.currentPage = analyticsService.CONST.ONCE_ERROR_PAGE;


            var search = $location.search();
            $scope.traceId = search.traceId;//内部交互用，标识上个页面是什么，map:百度地图定位页面


            var parseData = function (index, callStacks) {
                console.log('parseData');
                console.log(index);
                console.log(callStacks);
                var result = [],
                    barRatio = 100 / (callStacks[0][index.end] - callStacks[0][index.begin]);
                angular.forEach(callStacks, function (val, key) {
                    var bAuthorized = typeof val[index['isAuthorized']] === "undefined" ? true : val[index['isAuthorized']];
                    result.push({
                        id: 'id_' + key,
                        isAuthorized: bAuthorized,
                        parent: val[index['parentId']] ? val[index['parentId']] - 1 : null,
                        indent: val[index['tab']],
                        method: val[index['title']],
                        argument: val[index['arguments']],
                        execTime: val[index['begin']] > 0 ? val[index['begin']] : null,
                        gapMs: val[index['gap']],
                        timeMs: val[index['elapsedTime']],
                        timePer: val[index['elapsedTime']] ? ((val[index['end']] - val[index['begin']]) * barRatio) + 0.9 : null,
                        class: val[index['simpleClassName']],
                        methodType: val[index['methodType']],
                        apiType: val[index['apiType']],
                        agent: val[index['agent']],
                        applicationName: val[index['applicationName']],
                        hasException: val[index['hasException']],
                        isMethod: val[index['isMethod']],
                        logLink: val[index['logPageUrl']],
                        logButtonName: val[index['logButtonName']],
                        isFocused: val[index['isFocused']],
                        execMilli: val[index['executionMilliseconds']],
                        execPer: val[index['elapsedTime']] && val[index['executionMilliseconds']] ? ( parseInt(val[index['executionMilliseconds']].replace(/,/gi, "")) / parseInt(val[index['elapsedTime']].replace(/,/gi, "")) ) * 100 : 0
                    });
                });

                console.log(result);
                return result;
            };

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));

            $scope.methodList = [{
                name: '节点1',
                x: 200,
                y: 300
            }, {
                name: '节点2',
                x: 800,
                y: 300
            }, {
                name: '节点3',
                x: 550,
                y: 100
            }, {
                name: '节点4',
                x: 550,
                y: 500
            }];
            $scope.relationList=[{
                source: 0,
                target: 1,
                symbolSize: [20, 20],
                label: {
                    normal: {
                        show: true
                    }
                },
                lineStyle: {
                    normal: {
                        width: 5,
                        curveness: 0.2
                    }
                }
            }, {
                source: '节点2',
                target: '节点1',
                label: {
                    normal: {
                        show: true
                    }
                },
                lineStyle: {
                    normal: { curveness: 0.2 }
                }
            }, {
                source: '节点1',
                target: '节点3'
            }, {
                source: '节点2',
                target: '节点3'
            }, {
                source: '节点2',
                target: '节点4'
            }, {
                source: '节点1',
                target: '节点4'
            }];
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: 'Les Miserables',
                    subtext: 'Default layout',
                    top: 'bottom',
                    left: 'right'
                },
                tooltip: {},
                legend: [],
                animationDuration: 1500,
                animationEasingUpdate: 'quinticInOut',
                label: {
                    normal: {
                        show: true
                    }
                },
                edgeSymbol: ['circle', 'arrow'],
                series : [
                    {
                        name: '执行轨迹',
                        type: 'graph',
                        layout: 'none',
                        data: $scope.methodList,
                        links: $scope.relationList,
                        // categories: categories,
                        roam: true,
                        label: {
                            normal: {
                                position: 'right',
                                formatter: '{b}'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: 'source',
                                curveness: 0.3
                            }
                        }
                    }
                ]
            };


            myChart.setOption(option);
            myChart.showLoading();


            $scope.getTraceDetail = function () {
                $http({
                    //http://133.133.135.2:38080/transactionInfo.pinpoint?traceId=110004^1489564890146^36616
                    url: '/transactionInfo.pinpoint?traceId=' + $scope.traceId,
                    method: "GET",
                    withCredentials: true,
                    data: {}
                }).success(function ($data) {
                    console.log($data);
                    $scope.isLoading = false;

                    var callStackTmp = parseData($data.callStackIndex, $data.callStack);

                    $scope.methodList.push({
                        name: '节点5',
                        x: 560,
                        y: 800
                    });

                    $scope.relationList.push({
                        source: '节点2',
                        target: '节点5',
                    });

                    // for (var i = 0; i < callStackTmp.length; i++) {
                    //     $scope.methodList.push({
                    //         name: callStackTmp.
                    //     });
                    // }

                    myChart.hideLoading();
                    myChart.setOption({
                        series: [{
                            data: $scope.methodList,
                            links: $scope.relationList,
                        }]
                    });

                }).error(function ($data) {
                    console.log($data);
                    alert('Ops...' + $data);
                });
            };

            $scope.getTraceDetail();


        }
    ]);
})();