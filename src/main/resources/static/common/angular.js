//========== Global variable declaration & initialization start ==============
var homeApp = angular.module("homeApp", ["ngRoute","ui.bootstrap"]);
var server_url = window.location.origin;
//========== Global variable declaration & initialization End ==============

//========== Navigation to different pages start ======================
homeApp.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl : "home/index.html"
	})
	.when("/home", {
		templateUrl : "home/index.html"
	})
	.when("/customer", {
		templateUrl : "customer/index.html"
	});
});
//========== Navigation to different pages start ======================

homeApp.directive("nextFocus", function(){
	var directive = {
	        restrict: 'A',
	        link: function (scope, elem, attrs) {
	            elem.bind('keydown', function (e) {
	                var code = e.keyCode || e.which;
	                if (code === 13) {
	                    try {
	                        if (attrs.tabindex != undefined) {
	                            var currentTabIndex = attrs.tabindex;
	                            var nextTabIndex = parseInt(attrs.tabindex) + 1;
	                            $("[tabindex=" + nextTabIndex + "]").focus();
	                        }
	                    } catch (e) {
	                    	console.log(e);
	                    }
	                }
	            });
	        }
	    };
    return directive;
});

homeApp.controller('customerCtrl', function($scope, $http, $rootScope, $modal){
	$rootScope.$on("refreshCustomer", function(){
		$scope.refresh();
	});
	
	getUsers($scope, $http);
	
	$scope.refresh = function() {
		getUsers($scope, $http);
	};
	
	$scope.deleteCustomer = function(data){
		deleteCustomer(data, $http, $rootScope)
	};
	
	$scope.askToDelete = function(data){
		askToDelete(data, $modal, $http, $rootScope);
	}
	
	
});

homeApp.controller('addCustomerCtrl', function($scope, $http, $rootScope){
	$scope.flag = false;
	$scope.clear = function(){
		clearAddCustomerForm($scope);
	};
	$scope.addCustomer = function() {
		var status = validateCustomer($scope);
		if(status === true){
			addCustomerToDB($scope, $rootScope, $http);
		}
	};
});
