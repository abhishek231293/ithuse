function configRoute($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');    
    $stateProvider.
            state('main', {
                url: '/',
                template: '<document-content></document-content>',
                controller: 'DocumentController',
            }).
            state('document', {
                url: '/document',
                template: '<document-content></document-content>',
                controller: 'DocumentController',
            }).
            state('manage', {
                url: '/manage',
                template: '<manage-document></manage-document>',
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
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                if(toState.url == "/event"){
                    $location.path('/event/list');
                }
        });
    }]);


