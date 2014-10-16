var app = angular.module("healthApp");

app.controller("signUpCtrl", function($scope, $firebase, $location, userService){

	$scope.newUser = function(email, password, passwordTwo){
		if(password!==passwordTwo){
			alert("Passwords don't match.");
		}
		else {
			userService.newFirebaseUser(email, password).then(function(){
				
				});
			}
		}

	
});