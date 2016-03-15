angular.module('trackboardApp', ['ngRoute', 'routes', 'authService', 'mainCtrl'])

    // Integrate token into requests
    .config(function($httpProvider) {

        // Attach the auth interceptor to the http requests
        $httpProvider.interceptors.push('AuthInterceptor');

    });