var app = angular.module("healthApp");

app.controller("settingsCtrl", function($scope, $firebase, user, $state){
	
	if(!user){
		$state.go('login');
	}

//$scope.currentUser = user.$asObject();
// debugger
	user.$asObject().$loaded().then(function(res){
		res.$bindTo($scope, "currentUser");
	});

	$scope.currentUser = user;

	$scope.getUserName = function(){
		if($scope.currentUser.useCustomUserName){
			return $scope.currentUser.customUserName;
		}
		else{
			return $scope.currentUser.name;
		}
	};


	$scope.getUserPhoto = function(){
		if($scope.currentUser.useCustomUserPhoto){
			return $scope.currentUser.customUserPhoto;
		}
		else{
			return $scope.currentUser.photo;
		}
	};
	

});