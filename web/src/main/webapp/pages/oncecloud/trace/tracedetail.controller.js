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
            $scope.isTemplate = search.isTemplate;
            console.log($scope.isTemplate);


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
                        execPer: val[index['elapsedTime']] && val[index['executionMilliseconds']] ? ( parseInt(val[index['executionMilliseconds']].replace(/,/gi, "")) / parseInt(val[index['elapsedTime']].replace(/,/gi, "")) ) * 100 : 0,
                        methodListIndex: 0
                    });
                });

                console.log(result);
                return result;
            };

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));

            /*$scope.methodList = [{
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
            }];*/

            $scope.methodList = [];
            $scope.relationList = [];
            var categories = [];

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: 'Les Miserables',
                    subtext: 'Default layout',
                    top: 'bottom',
                    left: 'right'
                },
                tooltip: {},
                color: ['#d40045', '#cce708', '#33a23d', '#007a87', '#4e9b86', '#3a2c2a', '#c09eb3'],
                legend: [{
                    // selectedMode: 'single',
                    data: categories.map(function (a) {
                        return a.name;
                    })
                }],
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
                        categories: categories,
                        roam: true,
                        label: {
                            normal: {
                                position: 'right',
                                formatter: '{b}'
                            }
                        },
                        /*lineStyle: {
                            normal: {
                                color: 'source',
                                curveness: 0.3
                            }
                        }*/
                        edgeSymbol: ['circle', 'arrow'],
                        edgeSymbolSize: [4, 10],
                        edgeLabel: {
                            normal: {
                                textStyle: {
                                    fontSize: 20
                                }
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

                    var factorX = 20;
                    var factorY = 20;
                    var offset = 100;
                    var count = 0;
                    var colorList = ['#d40045', '#cce708', '#33a23d', '#007a87', '#4e9b86', '#3a2c2a', '#c09eb3'];
                    var applicationMap = new Map();
                    var applicationCount = 0;
                    /*var colorIdx = 0;*/
                    var parentMap = new Map();

                    var yMap = new Map();
                    var legendData = [];

                    for (var i = 0; i < callStackTmp.length; i++) {
                        console.log("i = " + i);
                        console.log(callStackTmp[i].class + " " + callStackTmp[i].method);
                        if (callStackTmp[i].isMethod) {

                            var parent = 0;
                            if (!i) {
                                parent = -1;
                            }
                            else {
                                parent = callStackTmp[i].parent;
                            }

                            var methodName = callStackTmp[i].class + " " + callStackTmp[i].method;

                            var applicationName = callStackTmp[i].applicationName;

                            /*if (applicationMap.has(applicationName)) {
                                colorIdx = applicationMap.get(applicationName);
                            }
                            else {
                                applicationMap.set(applicationName, applicationCount);
                                colorIdx = applicationCount;
                                applicationCount++;
                                if (applicationCount >= colorList.length) {
                                    applicationCount = 0;
                                }
                                categories.push({name: applicationName});
                                legendData.push(applicationName);
                            }*/
                            
                            if (!applicationMap.has(applicationName)) {
                                applicationMap.set(applicationName, applicationCount);
                                applicationCount++;
                                categories.push({name: applicationName});
                                legendData.push(applicationName);
                            }

                            var newDate = new Date();
                            newDate.setTime(callStackTmp[i].execTime);
                            var startTime = newDate.toLocaleString();

                            var execTime = callStackTmp[i].timeMs;

                            var tempY = 0;
                            //相同parent的节点的Y坐标相同
                            if (parentMap.has(parent)) {
                                parentMap.set(parent, parentMap.get(parent) + 1);
                                tempY = yMap.get(parent);
                            }
                            else {
                                parentMap.set(parent, 1);
                                tempY = (parent + 1) * factorY + parentMap.size * offset;
                                yMap.set(parent, tempY);
                            }

                            if($scope.isTemplate == 'true') {
                                $scope.methodList.push({
                                    name: "methodName" + count + ": " + methodName,
                                    tooltip: "applicationName: " + applicationName,
                                    x: factorX + offset * parentMap.get(parent),
                                    y: tempY,
                                    category: legendData.indexOf(applicationName)
                                    /*itemStyle: {
                                        normal: {
                                            // 根据applicationName设置节点的颜色
                                            color: colorList[colorIdx],
                                        }
                                    }*/
                                });
                            }
                            else {
                                $scope.methodList.push({
                                    name: "methodName" + count + ": " + methodName,
                                    tooltip: "applicationName: " + applicationName + "<br>" + "startTime: " + startTime + "<br>" + "Exec(ms): " + execTime,
                                    x: factorX + offset * parentMap.get(parent),
                                    y: tempY,
                                    category: legendData.indexOf(applicationName)
                                    /*itemStyle: {
                                        normal: {
                                            // 根据applicationName设置节点的颜色
                                            color: colorList[colorIdx],
                                        }
                                    }*/
                                });
                            }

                            console.log(count);
                            console.log(callStackTmp[i].class + " " + callStackTmp[i].method);

                            callStackTmp[i].methodListIndex = count;

                            if (parent != -1) {
                                $scope.relationList.push({
                                    source: callStackTmp[parent].methodListIndex,
                                    target: count
                                });
                                /*console.log("i = " + i);*/
                            }

                            count++;
                        }
                    }

                    console.log('methodList');
                    console.log($scope.methodList);
                    console.log('relationList');
                    console.log($scope.relationList);
                    console.log('categories');
                    console.log(categories);
                    console.log(categories.map(function (a) {
                        return a.name;
                    }));

                    myChart.hideLoading();
                    myChart.setOption({
                        legend: [{
                            /*data: categories.map(function (a) {
                                return a.name;
                            })*/
                            data: legendData
                        }],
                        series: [{
                            data: $scope.methodList,
                            links: $scope.relationList,
                            categories: categories
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