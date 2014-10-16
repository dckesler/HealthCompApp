var app = angular.module("healthApp");

app.controller("workCtrl", function($scope, group, $firebase, $stateParams){
	if(!group){
		$state.go('settings.settingsPage.groupSettingsPage');
	}

	var groupRef = new Firebase("https://hcompapp.firebaseio.com/groups/"+$stateParams.groupId);

	group.$asObject().$loaded().then(function(res){
		res.$bindTo($scope, "currentGroup");
	});

	$scope.check = function(){
		console.log($scope.currentGroup);
	};
	$scope.otherCheck = function(){
		console.log($scope.currentUser);
	};
	$scope.addPoints = function(points){
		for(var member in $scope.currentGroup.members){
			console.log("How's this?");
			if($scope.currentGroup.members[member].userId===$stateParams.userId){
				$scope.currentGroup.members[member].userScore+=points;
			}
		}
	};
});