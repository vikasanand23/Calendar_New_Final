angular.module("app").directive('myMonth', function() {
    return {
        restrict: 'EA',
        templateUrl: 'com/view/month.html'
    };
});