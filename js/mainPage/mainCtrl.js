var app = angular.module("healthApp");

app.controller("mainCtrl", function($scope, $firebase, $firebaseSimpleLogin, $location, $q, userService, $state){
	var ref = new Firebase("https://hcompapp.firebaseio.com");
	var authClient = $firebaseSimpleLogin(ref);
	$scope.loggingIn = false;

	$scope.login =function(){
		$scope.loggingIn = true;
	};

	$scope.loginWithFirebase = function(email, password){
		userService.loginWithFirebase(email, password).then(function(user){
			user.auth.uid = user.auth.uid.replace('simple:', '');
			$state.go('settings.settingsPage.groupSettingsPage', {userId: user.auth.uid});
		});
	};

	$scope.loginWithFacebook = function(){
		userService.facebookSignIn(function(user){
			user.auth.uid = user.auth.uid.replace('facebook:', '');
			$state.go('settings.settingsPage.groupSettingsPage', {userId: user.auth.uid});
		});
	};

	$scope.loginWithGoogle = function(){
		userService.googleSignIn(function(user){
			console.log(user);
			user.auth.uid = user.auth.uid.replace('google:','');
			$state.go('settings.settingsPage', {userId:  user.auth.uid});
		});
	};
});