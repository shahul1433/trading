//========== Global variable declaration & initialization start ==============
var homeApp = angular.module("homeApp", ["ngRoute","ui.bootstrap","ngFlash"]);
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
	})
	.when("/about", {
		templateUrl : "about/index.html"
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

homeApp.controller('clockCtrl', function($scope, $interval){
	var day = function(){
		var d = new Date();
		var weekday=new Array(7);
		weekday[0]="Sunday";
		weekday[1]="Monday";
		weekday[2]="Tuesday";
		weekday[3]="Wednesday";
		weekday[4]="Thursday";
		weekday[5]="Friday";
		weekday[6]="Saturday";
		$scope.day = weekday[d.getDay()];
	}
	var tick = function(){
		$scope.clock = Date.now();
		day();
	}
	tick();
	$interval(tick, 1000);
	
});

homeApp.controller('customerCtrl', function($scope, $http, $rootScope, $modal, Flash, $window){
	//Window resize event
	var appWindow = angular.element($window);
	appWindow.bind('resize', function(){
		$scope.testStyle = {
			"height" : ($window.innerHeight - 280)
		}
	});
	
	$rootScope.$on("refreshCustomer", function(){
		$scope.refresh();
	});

	getTotalPageNo($scope,$http);
	getUsers($scope, $http, 0 , 20);
	$scope.testStyle = {
			"height" : ($window.innerHeight - 280)
	}
	
	$scope.refresh = function() {
		getUsers($scope, $http, 0, 20);
	};
	
	$scope.deleteCustomer = function(data){
		deleteCustomer(data, $http, $rootScope)
	};
	
	$scope.askToDelete = function(data){
		askToDelete(data, $modal, $http, $rootScope);
	}
	
	$scope.clear = function(){
		clearAddCustomerForm($scope);
	};
	
	$scope.addCustomer = function(){
		addCustomer($scope, $rootScope, $http, $modal);
	};
	
	// To show flash messages
	$scope.success = function(){
		var message = "Hello";
		var id = Flash.create('success', message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
	};
	
	// Handling pagination in customer tab.
	$scope.noOfPages = [5,20,40,60,80,100];
	$scope.selectedPageNo = 20;
	$scope.selected = 1;
	
	//$scope.pages = [1,2,3,4,5];
	$scope.paginatedResult = function(data){
		var pageNo = data.y-1;
		var noOfRows = $scope.selectedPageNo;
		getUsers($scope, $http, pageNo, noOfRows);
	};
	
	$scope.refreshPage = function(data){
		getTotalPageNo($scope,$http);
		$scope.selected = 1;
		var noOfRows = data.selectedPageNo;
		var pageNo = data.selected;
		getUsers($scope, $http, (pageNo-1), noOfRows);
	};
	
});

function getTotalPageNo($scope,$http){
	$http.get(server_url+"/get-no-of-customer")
	.then(function(response) {
		var totalPageno = Math.floor(response.data/$scope.selectedPageNo);
		var fraction = response.data%20;
		if(fraction != 0)
			totalPageno += 1;
		var arr = [];
		for(var i=1; i<=totalPageno; i++){
			arr[i-1] = i;
		}
		$scope.pages = arr;
	});
}


homeApp.controller('addCustomerCtrl', function($scope, $http, $rootScope){
	$scope.flag = false;
	$scope.clear = function(){
		clearAddCustomerForm($scope);
	};
	
	$rootScope.$on("addCustomer", function(){
		var status = validateCustomer($scope);
		if(status == true){
			addCustomerToDB($scope, $rootScope, $http);
			$rootScope.$emit("closeAddCustomerPopup", {});
		}
	});
});
