var homeApp = angular.module("homeApp", ["ngRoute"]);

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

homeApp.controller('customerCtrl', function($scope, $http){
	getUsers($scope, $http);
	$scope.refresh = function() {
		getUsers($scope, $http);
	};
});

function getUsers($scope, $http){
	$http.get("http://localhost:8080/get-all-customer")
    .then(function(response) {
        $scope.customers = response.data;
    });
}

homeApp.controller('addCustomerCtrl', function($scope){
	$scope.clear = function(){
		$scope.shopName = '';
		$scope.addCustomerForm.shopName.$setPristine();
		$scope.customerName = '';
		$scope.addCustomerForm.customerName.$setPristine();
		$scope.mobile = '';
		$scope.addCustomerForm.mobile.$setPristine();
		$scope.email = '';
		$scope.addCustomerForm.email.$setPristine();
		$scope.place = '';
		$scope.addCustomerForm.place.$setPristine();
		$scope.post = '';
		$scope.addCustomerForm.post.$setPristine();
		$scope.district = '';
		$scope.addCustomerForm.district.$setPristine();
		$scope.state = '';
		$scope.addCustomerForm.state.$setPristine();
		$scope.gstin = '';
		$scope.addCustomerForm.gstin.$setPristine();
		
	};
	
	$scope.addCustomer = function() {
		console.log('clicked');
	};
});