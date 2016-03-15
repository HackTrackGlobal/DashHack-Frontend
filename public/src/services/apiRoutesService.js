/**
 * Auth factory
 */
angular.module('apiRoutesService', [])

    /**
     * API Routes Service
     */
    .factory('ApiRoutes', function() {

        var main = 'localhost:3000/api';

        return {

            users: main + '/users'
        };
    });