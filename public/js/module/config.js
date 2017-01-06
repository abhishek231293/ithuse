function config($stateProvider, $urlRouterProvider, USER_ROLES) {

}


angular
    .module('ithuse')
    .config(["$stateProvider", "$urlRouterProvider", 'USER_ROLES', config])
    .run(['$rootScope', '$state', '$location', '$window', 'authService', function($rootScope, $state, $location, $window, authService) {

    }]);

