angular.module('menuToggleDirective', [])
    .directive('menuToggle', [ '$timeout', function($timeout){

        return {
            scope: {
                section: '='
            },
            templateUrl: 'templates/menu-toggle.html',
            link: function($scope, $element) {
                var controller = $element.parent().controller();
                $scope.isOpen = function() {
                    return controller.isOpen($scope.section);
                };
                $scope.toggle = function() {
                    controller.toggleOpen($scope.section);
                };
            }
        };
    }]);