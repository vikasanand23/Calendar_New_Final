(function() {
    angular.module("app", ["ngRoute", "mwl.calendar", "ui.bootstrap"])
        .config(function($routeProvider) {
            $routeProvider
                .when("/", {
                    controller: "calendarController",
                    templateUrl: "com/view/calendar.html"
                })
                .when("/Home", {
                    controller: "homeController",
                    templateUrl: "com/view/home.html"
                })
                .when("/Calendar", {
                    controller: "calendarController",
                    templateUrl: "com/view/calendar.html"
                })
        });
}());