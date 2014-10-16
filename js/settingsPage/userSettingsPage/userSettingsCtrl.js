var app = angular.module("healthApp");

app.controller("userSettingsCtrl", function($scope, $firebase){

	
	$scope.setNewEmail = function(newEmail){
		$scope.currentUser.email = newEmail;
		$scope.newEmail = "";
	};
	$scope.setNewStatus = function(newStatus){
		$scope.currentUser.status = newStatus;
		$scope.newStatus = "";
	};

});