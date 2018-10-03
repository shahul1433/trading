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
	$scope.flag = false;
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
	/*$scope.validate = function() {
		if($scope.shopName == undefined || $scope.shopName == '')
			$scope.addCustomerForm.shopName.$setDirty();
		if($scope.customerName == undefined || $scope.customerName == '')
			$scope.addCustomerForm.customerName.$setDirty();
		if($scope.mobile == undefined || $scope.mobile == '')
			$scope.addCustomerForm.mobile.$setDirty();
		if($scope.place == undefined || $scope.place == '')
			$scope.addCustomerForm.place.$setDirty();
		if($scope.post == undefined || $scope.post == '')
			$scope.addCustomerForm.post.$setDirty();
		if($scope.district == undefined || $scope.district == '')
			$scope.addCustomerForm.district.$setDirty();
		if($scope.state == undefined || $scope.state == '')
			$scope.addCustomerForm.state.$setDirty();
		if($scope.gstin == undefined || $scope.gstin == '')
			$scope.addCustomerForm.gstin.$setDirty();
		
	};*/
	$scope.addCustomer = function() {
		var status = validateCustomer($scope);
		console.log(status);
	};
});

function validateCustomer($scope) {
	var flag = true;
	if($scope.shopName == undefined || $scope.shopName == ''){
		$scope.addCustomerForm.shopName.$setDirty();
		flag = false;
	}if($scope.customerName == undefined || $scope.customerName == ''){
		$scope.addCustomerForm.customerName.$setDirty();
		flag = false;
	}if($scope.mobile == undefined || $scope.mobile == ''){
		$scope.addCustomerForm.mobile.$setDirty();
		flag = false;
	}if($scope.place == undefined || $scope.place == ''){
		$scope.addCustomerForm.place.$setDirty();
		flag = false;
	}if($scope.post == undefined || $scope.post == ''){
		$scope.addCustomerForm.post.$setDirty();
		flag = false;
	}if($scope.district == undefined || $scope.district == ''){
		$scope.addCustomerForm.district.$setDirty();
		flag = false;
	}if($scope.state == undefined || $scope.state == ''){
		$scope.addCustomerForm.state.$setDirty();
		flag = false;
	}if($scope.gstin == undefined || $scope.gstin == ''){
		$scope.addCustomerForm.gstin.$setDirty();
		flag = false;
	}
	return flag;
}