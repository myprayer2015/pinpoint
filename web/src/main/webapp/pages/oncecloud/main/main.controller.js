(function() {
	'use strict';
	/**
	 * (en)MainCtrl 
	 * @ko MainCtrl
	 * @group Controller
	 * @name MainCtrl
	 * @class
	 */
	pinpointApp.controller( "OnceMainCtrl", [ "filterConfig","$rootScope", "$scope", "$timeout", "$routeParams", "locationService", "UrlVoService", "NavbarVoService", "$window", "SidebarTitleVoService", "filteredMapUtilService", "$rootElement", "AnalyticsService", "PreferenceService",
	    function (cfg,$rootScope, $scope, $timeout, $routeParams, locationService, UrlVoService, NavbarVoService, $window, SidebarTitleVoService, filteredMapUtilService, $rootElement, analyticsService, preferenceService) {
			analyticsService.send(analyticsService.CONST.MAIN_PAGE);
			$rootScope.currentPage = analyticsService.CONST.ONCE_MAIN_PAGE;
	    }
	]);
})();