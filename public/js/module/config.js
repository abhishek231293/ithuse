function configRoute($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');    
    $stateProvider.
            state('document', {
                url: '/document',
                template: '<list-document></list-document>',
                controller: 'DocumentController',
            }).
            state('manage', {
                url: '/manage',
                template: 'Manage Document Page',
                controller: 'ManageController',
            }).
            state('event', {
                url: '/event',
                template: '<div ui-view></div>',
                controller: 'EventController',
            }).
            state('event.list', {
                url: '/list',
                template: '<list-event></list-event>'
            }).
            state('event.add', {
                url: '/add',
                template: '<add-event></add-event>'
            });
}

angular.module('ithuseApp')
    .config(["$stateProvider", "$urlRouterProvider", configRoute])
    .run(['$rootScope', '$state', '$location', '$window', function($rootScope, $state, $location, $window, authService) {
        $rootScope.currentTab = '';
    }]);


