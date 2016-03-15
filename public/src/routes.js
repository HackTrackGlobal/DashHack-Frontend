angular.module('routes', ['ngRoute'])

    .config(function($routeProvider, $locationProvider) {

        // Setting the routes
        $routeProvider

            // Home page
            .when('/', {
                templateUrl: 'app/views/pages/home.html'
            })

            // Login page
            .when('/login', {
                templateUrl: 'app/views/pages/login.html',
                controller: 'mainController',
                controllerAs: 'main'
            });

        // Setting HTML5 mode
        $locationProvider.html5Mode(true);
    });