// Ionic Starter App

var CONFIG = {
    PATHS: {
        CONGRESSUS: "http://granada.congresoseci.com/sessep16/",
        CONGRESSUS_IMG: "http://granada.congresoseci.com"
    },
    //PATHS:{
    //  CONGRESSUS:"http://192.168.2.24:8100/api/",
    //  CONGRESSUS_IMG:"http://192.168.2.24:8100"
    //},
    SEPARATOR: "/sessep16/",
    INITPAGE: "index"
};


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives', 'ionic-material', 'ngCordova'])

    .run(function ($ionicPlatform, $rootScope) {
        $rootScope.CONFIG = CONFIG;
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            //if (window.cordova && window.cordova.plugins.Keyboard) {
            //  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            //}
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            document.addEventListener("backbutton", function (e) {
                console.log("sus muertos");
                e.preventDefault();
                return false;
            }, true);

        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })
            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home.html",
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('app.content', {
                url: "/content/:page",
                views: {
                    'menuContent': {
                        templateUrl: "templates/content.html",
                        controller: 'ContentCtrl'
                    }
                }
            })
            .state('app.inscripciones', {
                url: "/inscripciones",
                views: {
                    'menuContent': {
                        templateUrl: "templates/inscripciones.html"
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    });
