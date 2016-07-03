(function() {
    angular.module('goreservas', ['ngRoute', 'ngResource']);

    angular
        .module('goreservas')
        .config(MainConfig)
        .run(AppRun);

    MainConfig.$inject = ['$locationProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];
    function MainConfig($locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide){

        // Creating references for dynamic injections
        (function() {
            var app = angular.module('goreservas');
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
        })();

        // Setting location as HTML5
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }

    AppRun.$inject = ['$rootScope', '$location', 'ngLayout'];
    function AppRun($rootScope, $location, ngLayout) {
        $rootScope.layout = ngLayout;

        $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/index');
            }
        });
    }


})();
