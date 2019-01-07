//========== Global variable declaration & initialization start ==============
var homeApp = angular.module("customerApp", ["ngRoute","ui.bootstrap","ngFlash"]);
var server_url = window.location.origin;
//========== Global variable declaration & initialization End ==============

//========== Navigation to different pages start ======================
/*homeApp.config(function($routeProvider){
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
});*/
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

homeApp.controller('customerCtrl', function($scope, $http, $rootScope, $modal, Flash, $window){
	//Window resize event
	var appWindow = angular.element($window);
	appWindow.bind('resize', function(){
		$scope.testStyle = {
			"height" : ($window.innerHeight - 180)
		}
	});
	
	$rootScope.$on("refreshCustomer", function(){
		$scope.refresh();
	});

	getTotalPageNo($scope,$http);
	getUsers($scope, $http, 0 , 20);
	$scope.testStyle = {
			"height" : ($window.innerHeight - 180)
	}
	
	$scope.refresh = function() {
		getTotalPageNo($scope,$http);
		var noOfRows = this.selectedPageNo;
		var pageNo = this.selected;
		getUsers($scope, $http, (pageNo-1), noOfRows);
	};
	
	$scope.askToDelete = function(data){
		if($rootScope.selectedList.length > 0)
			askToDelete(data, $modal, $http, $rootScope);
		else
			toastr.error("No records selected.", 'Error');
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
	$scope.totalItem = 0;
	
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
	
	//==== Delete Button listener start====
	$scope.selectStatus = false;
	$scope.selectAllUser = false;
	$rootScope.selectedList = [];
	
	$scope.check = function(data){
		checker(data,$scope,$rootScope);
	}
	//==== Delete Button listener end====
	
	$scope.selectOrDeselectUsers = function(data){
		selectOrDeselectUsersFn(data, $scope, $rootScope);
	}
	
	$scope.viewCustomer = function(data){
		viewCustomers(data, $scope, $modal, $rootScope);
	}
	
	$scope.showNextPages = function(){
		if(!$(".next-btn").hasClass("disabled")){
			//console.log($scope.totNoOfPages);
			var start = $scope.pages[0] + 1;
			var end = $scope.pages[$scope.pages.length - 1];
			
			if(end < $scope.totNoOfPages){
				var data = start + 4;
				var showArr = [];
				if(data <= $scope.totNoOfPages){
					var i=0;
					for(start; start <= data; start++){
						showArr[i] = start;
						i++;
					}
					$scope.pages = showArr;
					$scope.selected = showArr[0];
				}else{
					var i=0;
					for(start; start <= $scope.totNoOfPages; start++){
						showArr[i] = start;
						i++;
					}
					$scope.pages = showArr;
				}
				$(".prev-btn").removeClass("disabled");
			}else{
				$(".next-btn").addClass("disabled");
				$(".prev-btn").removeClass("disabled");
			}
		}
	}
	
	$scope.showPrevPages = function(){
		if(!$(".prev-btn").hasClass("disabled")){
			//console.log($scope.totNoOfPages);
			var end = $scope.pages[$scope.pages.length - 1] - 1;
			var start = end - 4;
			
			if(start > 0){
				var i=0;
				var showArr = [];
				for(start; start <= end; start++){
					showArr[i] = start;
					i++;
				}
				$scope.pages = showArr;
				$scope.selected = showArr[showArr.length - 1];
				$(".next-btn").removeClass("disabled");
			}else{
				var i=0;
				var showArr = [];
				for(start=1; start <= end; start++){
					showArr[i] = start;
					i++;
				}
				$scope.pages = showArr;
				$scope.selected = showArr[showArr.length - 1];
				$(".next-btn").removeClass("disabled");
				$(".prev-btn").addClass("disabled");
			}
		}
	}
});

function getTotalPageNo($scope,$http){
	$http.get(server_url+"/customer/get-no-of-customer")
	.then(function(response) {
		$scope.totalItem = response.data; //for showing purpose
		var totalPageno = Math.floor(response.data / $scope.selectedPageNo);
		var fraction = response.data % $scope.selectedPageNo;
		if(fraction != 0)
			totalPageno += 1;
		var arr = [];
		$scope.totNoOfPages = totalPageno;
		//$scope.totNoOfPages = 7; // for development purpose can remove later.
		$(".prev-btn").addClass("disabled");
		var showArr = [];
		if(totalPageno > 4){
			for(var i=0; i<4; i++){
				showArr[i] = i+1;
			}
			$(".next-btn").removeClass("disabled");
		}else{
			for(var i=0; i<totalPageno; i++){
				showArr[i] = i+1;
			}
			$(".next-btn").addClass("disabled");
		}
		$scope.pages = showArr;
		//console.log(totalPageno);
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

homeApp.controller('viewCustomerCtrl', function($scope, $rootScope, $http){
	$scope.flag = false;
	$scope.closeViewCustomerPopup = function(){
		$rootScope.$emit("closeViewCustomerPopup", {});
	};
	
	$scope.updateCustomer = function(){
		var customerJson = new Object();
		customerJson["id"] = $rootScope.viewCustomer.x.id;
		customerJson["shopName"] = $scope.shopName;
		customerJson["customerName"] = $scope.customerName;
		customerJson["mobile"] = $scope.mobile;
		customerJson["email"] = $scope.email;
		customerJson["place"] = $scope.place;
		customerJson["post"] = $scope.post;
		customerJson["district"] = $scope.district.toUpperCase();
		customerJson["state"] = $scope.state.toUpperCase();
		customerJson["gstin"] = $scope.gstin.toUpperCase();
		customerJson["archive"] = false;
		
		$http({
			url : server_url + '/customer/update-customer',
			method : 'PUT',
			data : customerJson,
			headers : {'Content-Type' : 'application/json'}
		}).then(function(resp){
			//Success
			if(resp.data.status == true){
				toastr.success('Customer updated <strong>Successfully</strong>');
				$rootScope.$emit("refreshCustomer", {});
				$rootScope.$emit("closeViewCustomerPopup", {});
			}else{
				toastr.options.preventDuplicates = true;
				toastr.error(resp.data.response, 'Error');
				console.log(resp.data.response);
			}
		},function(resp){
			//Failed
			toastr.options.preventDuplicates = true;
			toastr.error("Something went wrong", 'Error');
			console.log(resp);
		});
	};
});