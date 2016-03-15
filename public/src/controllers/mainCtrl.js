angular.module('mainCtrl', ['ngMaterial', 'ngAria', 'ngAnimate', 'menuToggle'])

    .controller('mainController', function($rootScope, $scope, $location, Auth) {

        // get info if a person is logged in
        $scope.loggedIn = Auth.isLoggedIn();

        // On every request
        $rootScope.$on('$routeChangeStart', function() {

            // Check if the usr is logged in
            $scope.loggedIn = Auth.isLoggedIn();

            // Get user information on page load
            Auth.getUser()
                .then(function(data) {
                    $scope.user = data.data;
                });
        });

        /**
         * Menu Items
         */
        $scope.sections = [];
        $scope.sections.push({
            name: 'Beers',
            type: 'toggle',

            pages: [{
                name: 'IPAs',
                type: 'link',
                state: 'beers.ipas',
                icon: 'fa fa-group'
            }, {
                name: 'Porters',
                state: 'home.toollist',
                type: 'link',
                icon: 'fa fa-map-marker'
            }]
        });
    });