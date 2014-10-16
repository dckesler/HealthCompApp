var app = angular.module("healthApp");

app.controller("groupSettingsCtrl", function($scope, $firebase, groupService, $stateParams, $state){

	var userRef = $firebase(new Firebase("https://hcompapp.firebaseio.com/users/" + $stateParams.userId + "/groups"));
	$scope.makeNewGroup = function(name){
		groupService.makeNewGroupDraft($stateParams.userId, $scope.currentUser.name, true, name);
	};

	$scope.groupView = function(id){
		$state.go("settings.settingsPage.workPage", {groupId: id});
	};
	

	$scope.adminGroupList = [];
	$scope.buildAdminList = function(){
		$scope.adminGroupList = [];
		$scope.adminView = true;
		for(var key in $scope.currentUser.groups){
			if($scope.currentUser.groups[key].admin){
				$scope.adminGroupList.push($scope.currentUser.groups[key]);
			}

		}
	};

	$scope.allGroups = function(){
		$scope.adminView = false;
	};

	$scope.joinGroup = function(id){
		var syncedGroup = $firebase(new Firebase("https://hcompapp.firebaseio.com/groups/" + id));
		var joinedGroup = syncedGroup.$asObject();
		joinedGroup.$loaded().then(function(){
			groupService.joinGroup($stateParams.userId, $scope.currentUser.name, joinedGroup.$id, joinedGroup.name);
			$scope.groupId = "";
		});
	};

	$scope.editGroup = function(id){
		$state.go("settings.settingsPage.groupEditingPage", {groupId: id});
	};

});