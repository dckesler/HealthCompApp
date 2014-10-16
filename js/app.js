var app = angular.module("healthApp", ['ui.router', 'firebase']);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/main/login");

	$stateProvider
		.state('mainPage', {
			url: "/main",
			templateUrl: 'js/mainPage/mainView.html',
			controller: 'mainCtrl'
		})
			.state('mainPage.logInPage', {
				url:"/login",
				templateUrl: "js/mainPage/logInView.html",
				controller: 'mainCtrl'
			})
			.state('mainPage.signUpPage', {
				url: "/signUp",
				templateUrl: "js/mainPage/signUpPage/signUpView.html",
				controller: 'signUpCtrl'
			})

		.state('settings', {
			abstract: true,
			url: '/settings/:userId',
			template: '<div ui-view></div>',
			controller: 'settingsCtrl',
			resolve: {
				user: function(userService, $stateParams){
					return userService.currentUser($stateParams.userId);
				}
			}
		})
			.state('settings.settingsPage', {
				url: "/profile",
				templateUrl: 'js/settingsPage/settingsView.html',
				
			})
				.state('settings.settingsPage.userSettingsPage', {
					url: "/userSettings",
					templateUrl: 'js/settingsPage/userSettingsPage/userSettingsView.html',
					controller: 'userSettingsCtrl'
				})
				.state('settings.settingsPage.groupSettingsPage', {
					url: "/groups",
					templateUrl: "js/settingsPage/groupSettingsPage/groupSettingsView.html",
					controller: "groupSettingsCtrl"
				})
				.state('settings.settingsPage.groupEditingPage', {
					url: "/editGroup/:groupId",
					templateUrl: "js/settingsPage/groupEditingPage/groupEditingView.html",
					controller: "groupEditingCtrl",
					resolve: {
						group: function(groupService, $stateParams){
							return groupService.currentGroup($stateParams.groupId);
						}
					}
				})
				.state('settings.settingsPage.workPage', {
					url: "/workPage/:groupId",
					templateUrl: 'js/workPage/workView.html',
					controller: "workCtrl",
					resolve: {
						group: function(groupService, $stateParams){
							return groupService.currentGroup($stateParams.groupId);
						}
					}
				})
});