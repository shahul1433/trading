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
	$http.get("http://localhost:8080/get-all-customer")
    .then(function(response) {
        $scope.customers = response.data;
    });
});