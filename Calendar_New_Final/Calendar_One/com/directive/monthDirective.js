angular.module("app").directive('myMonth', function() {
    return {
        restrict: 'EA',
        templateUrl: 'com/view/month.html',
		transclude: true,
		controller: 'calendarController',
		link: function(scope, iElement, iAttributes, ctrl){
			  
			}
    	//scope: {},
    };
});