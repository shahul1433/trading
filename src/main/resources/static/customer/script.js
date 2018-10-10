$(document).ready(function(){
	//add/call jquery functions here 
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

function clearAddCustomerForm($scope){
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
}

function addCustomerToDB($scope, $rootScope, $http){
	var json = new Object();
	json["shopName"] = $scope.shopName;
	json["customerName"] = $scope.customerName;
	json["mobile"] = $scope.mobile;
	json["email"] = $scope.email;
	json["place"] = $scope.place;
	json["post"] = $scope.post;
	json["district"] = $scope.district.toUpperCase();
	json["state"] = $scope.state.toUpperCase();
	json["gstin"] = $scope.gstin.toUpperCase();
	json["archive"] = false;
	$http({
		url : server_url+'/add-customer',
		method : "POST",
		data : json,
		headers : {'Content-Type': 'application/json'}
	}).then(function(response){
		//Success
		if(response.data.status == true){
			$rootScope.$emit("refreshCustomer", {});
			$scope.clear();
		}else{
			console.log(response.data.response);
		}
	},
	function(response){
		//failed
		console.log("Something went wrong");
	});
}

function getUsers($scope, $http){
	$http.get("http://localhost:8080/get-all-customer")
    .then(function(response) {
        $scope.customers = response.data;
    });
}

function deleteCustomer(data, $http, $rootScope){
	$http({
		url : server_url+'/delete-customer/'+data.x.id, //http://localhost:8080/delete-customer
		method : "DELETE"
	}).then(function(response){
		//Success
		$rootScope.$emit("refreshCustomer", {});
	},
	function(response){
		//failed
		console.log("Something went wrong while deleting customer");
	});
}

function askToDelete(data, $modal, $http, $rootScope){
	var message = "Are you sure to Delete ?";
	
	var modalHtml = '<div class="modal-header" id="popup-header">'
						+'<h4 class="modal-title" style="font-weight: bold;"><span class="glyphicon glyphicon-check"></span> Delete Confirmation</h4>'
					+'</div>'
					+'<div class="modal-body text-center">'
						+'<table class="cust-delete-table">'
							+'<tr>'
								+'<td align="left" style="color:black;">Shop Name</td>'
								+'<td>'+data.x.shopName+'</td>'
							+'</tr>'
							+'<tr>'
								+'<td align="left" style="color:black;">Customer Name</td>'
								+'<td>'+data.x.customerName+'</td>'
							+'</tr>'
						+'</table>'
						+'<hr><b>' + message + '<b>'
					+'</div>'
     				+'<div class="modal-footer">'
     					+'<button class="btn btn-primary" ng-click="ok()">OK</button>'
     					+'<button class="btn btn-warning" ng-click="cancel()">Cancel</button>'
     				+'</div>';
    
    var modalInstance = $modal.open({
    	template : modalHtml,
    	controller : ModalInstanceCtrl
    });
    
    modalInstance.result.then(function(){
    	//write delete function here
    	deleteCustomer(data, $http, $rootScope);
    });
}

var ModalInstanceCtrl = function($scope, $modalInstance){
	$scope.ok = function(){
		$modalInstance.close();
	}
	
	$scope.cancel = function(){
		$modalInstance.dismiss('cancel');
	}
}