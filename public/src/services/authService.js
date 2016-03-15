/**
 * Auth factory
 */
angular.module('authService', [])

    /**
     * Main Auth Factory
     */
    .factory('Auth', function($http, $q, AuthToken) {

        // Auth factory object
        var authFactory = {};

        // Login
        authFactory.login = function(username, password) {

            // Return the promise object and its data
            return $http.post('/api/authenticate', {
                    username: username,
                    password: password
                })
                .success(function(data) {
                    AuthToken.setToken(data.token);
                    return data;
                });
        };

        // Logout
        authFactory.logout = function() {

            // Simply clear the token
            AuthToken.setToken();
        };

        // Check if logged in
        authFactory.isLoggedIn = function() {
            return AuthToken.getToken() ? true : false;
        };

        // Get logged user info
        authFactory.getUser = function() {

            if (AuthToken.getToken()) {
                return $http.get('/api/me', { cache: true });
            }
            else {
                return $q.reject({ message: 'User has no token.' });
            }
        };

        // Return the factory
        return authFactory;
    })

    /**
     * Factory for handling tokens
     */
    .factory('AuthToken', function($window) {

        var authTokenFactory = {};

        // Get the token
        authTokenFactory.getToken = function() {
            return $window.localStorage.getItem('token');
        };

        // Set or clear token
        authTokenFactory.setToken = function(token) {
            if (token) {
                $window.localStorage.setItem('token', token);
            }
            else {
                $window.localStorage.removeItem('token');
            }
        };

        // Return the factory
        return authTokenFactory;
    })

    /**
     * AuthInterceptor to integrate token into requests
     */
    .factory('AuthInterceptor', function($q, $location, AuthToken) {

        var interceptorFactory = {};

        // Will happen on all HTTP requests
        interceptorFactory.request = function(config) {

            // Grab the token
            var token = AuthToken.getToken();

            // If the token exists, add it to the header as 'x-access-token'
            if (token) config.headers['x-access-token'] = token;

            // Continue on
            return config;
        };

        // On response errors
        interceptorFactory.responseError = function(response) {

            // If the server return an 403 error,
            // it meant that the token is invalid or
            // there is not token at all
            if (response.status == 403) {
                AuthToken.setToken();
                $location.path('/login');
            }

            // Return the errors as a promise
            return $q.reject(response);
        };

        // Return the factory
        return interceptorFactory;
    });