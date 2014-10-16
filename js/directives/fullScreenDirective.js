var app = angular.module("healthApp");

app.directive("fullPage", function($window){
	return {
		restrict: 'A',
		link: function(scope, elem, attrs){
			var height = $window.innerHeight;

			elem.css('height', height);

			window.onresize = function(){
				var heightTwo = $window.innerHeight;
				elem.css('height', heightTwo);
			};

		}
	};
});