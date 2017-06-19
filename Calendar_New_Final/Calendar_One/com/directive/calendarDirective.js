(function() {
    function customCalendarFunc() {
        return {
            restrict: 'EA',
            //template: '<h3>Hello From Directive</h3>',
            //templateUrl: '../../com/view/directives/calendarResult.html',
            replace: true,
			controller: 'calendarController'
			link: function(scope, iElement, iAttributes, ctrl){
			  
			}
        }
    }
    angular.module("app").directive("customCalendar", customCalendarFunc)
}());