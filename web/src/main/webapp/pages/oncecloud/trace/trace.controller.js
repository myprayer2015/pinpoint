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
                    type:'scatter',
                    symbolSize: 5,
                    large: true,
                    data: []}]
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
})();