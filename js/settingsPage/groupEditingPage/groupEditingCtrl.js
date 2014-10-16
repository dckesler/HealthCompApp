var app = angular.module("healthApp");

app.controller("groupEditingCtrl", function($scope, groupService, group, $firebase, $stateParams){

	if(!group){
		$state.go('settings.settingsPage.groupSettingsPage');
	}

	var groupRef = new Firebase("https://hcompapp.firebaseio.com/groups/"+$stateParams.groupId);

	group.$asObject().$loaded().then(function(res){
		res.$bindTo($scope, "currentGroup");
	});

	var Activity = function(activity, points){
		this.activity = activity;
		this.points = points;
	};

	$scope.checkIt = function(){
		console.log($scope.currentGroup);
	};

	$scope.newDailyActivity = function(activity, points){
		var aDaily = new Activity(activity, points);
		groupRef.child('dailies').push(aDaily);
	};

	$scope.newWeeklyActivity = function(activity, points){
		var aWeekly = new Activity(activity, points);
		groupRef.child('weeklies').push(aWeekly);
	};

	$scope.newBigActivity = function(activity, points){
		var aBig = new Activity(activity, points);
		groupRef.child('bigs').push(aBig);
	};
	$scope.deleteActivity = function(activity, type){
		for(var key in $scope.currentGroup.members){
			if($scope.currentGroup.members.key===activity){
				delete $scope.currentGroup.members.key;
			}
		}
	};


});