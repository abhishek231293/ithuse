function config($stateProvider, $urlRouterProvider, USER_ROLES) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider
        .state('login', {
            url: "/login",
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.dept, USER_ROLES.guest],
                module: 'dashboard'
            },
            templateUrl: clientUrl + "/user/signin",
            controller: function () {
            }
        });
}


angular
    .module('4cApp')
    .config(["$stateProvider", "$urlRouterProvider", 'USER_ROLES', config])
    .run(['$rootScope', '$state', '$location', '$window', 'authService', function($rootScope, $state, $location, $window, authService) {
        $rootScope.$state = $state;
    }]);