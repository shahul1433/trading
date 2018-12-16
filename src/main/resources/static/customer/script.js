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
	var customerJson = new Object();
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
		url : server_url+'/customer/add-customer',
		method : "POST",
		data : customerJson,
		headers : {'Content-Type' : 'application/json'}
	}).then(function(response){
		//Success
		if(response.data.status == true){
			toastr.success('Customer added <strong>Successfully</strong>');
			$rootScope.$emit("refreshCustomer", {});
		}else{
			toastr.options.preventDuplicates = true;
			toastr.error(response.data.response, 'Error');
			console.log(response.data.response);
		}
	},
	function(response){
		//failed
		toastr.options.preventDuplicates = true;
		toastr.error("Something went wrong", 'Error');
		console.log(response);
	});
	$scope.clear();
}

function getUsers($scope, $http, page, rows){
	$http.get(server_url+"/customer/get-all-customer/"+page+"/"+rows)
    .then(function(response) {
        $scope.customers = response.data;
    });
}

function deleteCustomer(data, $http, $rootScope){
	$http({
		/*url : server_url+'/customer/delete-customer/'+data.x.id, //http://localhost:8080/customer/delete-customer  */
		url : server_url+'/customer/delete-customer/', //http://localhost:8080/customer/delete-customer
		method : "DELETE",
		data : $rootScope.selectedList,
		headers : {'Content-Type': 'application/json'}
	}).then(function(response){
		//Success
		toastr.success('Customer deleted <strong>Successfully</strong>');
		$rootScope.$emit("refreshCustomer", {});
	},
	function(response){
		//failed
		toastr.error('Something went wrong while deleting customer.', 'Error');
		console.log(response);
	});
}

function askToDelete(data, $modal, $http, $rootScope){
	
	var message = "Are you sure to Delete ?";
	
	var modalHtml = '<div class="modal-header" id="popup-header">'
						+'<h4 class="modal-title" style="font-weight: bold;"><span class="glyphicon glyphicon-check"></span> Delete Confirmation</h4>'
					+'</div>'
					+'<div class="modal-body text-center">'
						/*+'<table class="cust-delete-table">'
							+'<tr>'
								+'<td align="left" style="color:black;">Shop Name</td>'
								//+'<td>'+data.x.shopName+'</td>'
							+'</tr>'
							+'<tr>'
								+'<td align="left" style="color:black;">Customer Name</td>'
								//+'<td>'+data.x.customerName+'</td>'
							+'</tr>'
						+'</table>'*/
						+'<b>' + message + '<b>'
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

function viewCustomers(data, $scope, $modal, $rootScope){
	$rootScope.viewCustomer = data;
	var modalInstance = $modal.open({
		templateUrl : "customer/template/view_customer_popup.html",
		controller : viewCustomerPopupCtrl
	});
}

var viewCustomerPopupCtrl = function($scope, $rootScope, $modalInstance){
	
	$scope.shopName = $rootScope.viewCustomer.x.shopName;
	$scope.customerName = $rootScope.viewCustomer.x.customerName;
	$scope.mobile = $rootScope.viewCustomer.x.mobile;
	$scope.email = $rootScope.viewCustomer.x.email;
	$scope.place = $rootScope.viewCustomer.x.place;
	$scope.post = $rootScope.viewCustomer.x.post;
	$scope.district = $rootScope.viewCustomer.x.district;
	$scope.state = $rootScope.viewCustomer.x.state;
	$scope.gstin = $rootScope.viewCustomer.x.gstin;
	
	$rootScope.$on("closeViewCustomerPopup", function(){
		$modalInstance.dismiss('cancel');
	});
	
}

function addCustomer($scope, $rootScope, $http, $modal){
	var modalInstance = $modal.open({
		templateUrl : "customer/template/add_customer_popup.html",
		controller : addCustomerPopupCtrl
	});
}

var addCustomerPopupCtrl = function($scope, $modalInstance, $rootScope){
	$scope.addCustomer = function() {
		$rootScope.$emit("addCustomer",{});
	};
	
	$scope.clear = function(){
		clearAddCustomerForm($scope);
		$modalInstance.dismiss('cancel');
	};
	
	$scope.closeAddCustomerPopup = function(){
		$modalInstance.dismiss('cancel');
	}
	
	$rootScope.$on("closeAddCustomerPopup", function(){
		$modalInstance.dismiss('cancel');
	});
}

function checker(data,$scope,$rootScope){
	if(data.h == true){
		var index = $rootScope.selectedList.indexOf(data.x.id);
		if(index == -1){
			$rootScope.selectedList.push(data.x.id);
		}
	}else{
		var index = $rootScope.selectedList.indexOf(data.x.id);
		if(index > -1){
			$rootScope.selectedList.splice(index,1);
		}
	}
	//Set select All check box here
	var totalCustomers = $scope.customers.length;
	var selectedCustomers = $rootScope.selectedList.length;
	
	if(selectedCustomers == totalCustomers)
		$scope.selectAllUser = true;
	else
		$scope.selectAllUser = false;
	
	if(selectedCustomers > 0)
		$scope.selectStatus = true;
	else
		$scope.selectStatus = false;
}

function selectOrDeselectUsersFn(data, $scope, $rootScope){
	$scope.selectStatus = $scope.selectAllUser;
	
	angular.forEach($('.check-user'), function(user){
		if(data.selectAllUser == true)
			user.checked=true;
		else
			user.checked=false;
	});
	
	if(data.selectAllUser == true){
		angular.forEach($scope.customers, function(customer){
			var index = $rootScope.selectedList.indexOf(customer.id);
			if(index == -1){
				$rootScope.selectedList.push(customer.id);
			}
		});
	}else{
		angular.forEach($scope.customers, function(customer){
			var index = $rootScope.selectedList.indexOf(customer.id);
			if(index > -1){
				$rootScope.selectedList.splice(index,1);
			}
		});
	}
	//Set select All check box here
	var totalCustomers = $scope.customers.length;
	var selectedCustomers = $rootScope.selectedList.length;
	if(selectedCustomers == totalCustomers)
		$scope.selectAllUser = true;
	else
		$scope.selectAllUser = false;
}