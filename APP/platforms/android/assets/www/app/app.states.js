altairApp
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            var reloadToken=function($http){
                if(!!localStorage.token && !$http.defaults.headers.common.Authorization){
                    $http.defaults.headers.common.Authorization = localStorage.token;
                }
            };

            // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
            $urlRouterProvider
                .when('/login', '/')
                .otherwise('/');

            $stateProvider
            // -- ERROR PAGES --
                .state("error", {
                    url: "/error",
                    templateUrl: 'app/views/error.html'
                })
                .state("error.404", {
                    url: "/404",
                    templateUrl: 'app/components/pages/error_404View.html'
                })
                .state("error.500", {
                    url: "/500",
                    templateUrl: 'app/components/pages/error_500View.html'
                })
            // -- LOGIN PAGE --
                .state("login", {
                    url: "/",
                    templateUrl: 'app/components/pages/loginView.html',
                    controller: 'loginCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_iCheck',
                                'app/components/pages/loginController.js'
                            ]);
                        }]
                    }
                })
            // -- RESTRICTED --
                .state("restricted", {
                    abstract: true,
                    url: "",
                    views: {
                        'main_header': {
                            templateUrl: 'app/shared/header/headerView.html',
                            controller: 'main_headerCtrl'
                        },
                        'main_sidebar': {
                            templateUrl: 'app/shared/main_sidebar/main_sidebarView.html',
                            controller: 'main_sidebarCtrl'
                        },
                        '': {
                            templateUrl: 'app/views/restricted.html'
                        }
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_selectizeJS',
                                'lazy_switchery',
                                'lazy_prismJS',
                                'lazy_autosize',
                                'lazy_iCheck',
                            ],{ serie: true });
                        }],
                        user: function($http){
                            reloadToken($http);
                            return $http({ method: 'POST', url: PATHS.user })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    }
                })
            // -- PAGES --
                .state("restricted.pages", {
                    url: "/pages",
                    template: '<div ui-view autoscroll="false" ng-class="{ \'uk-height-1-1\': page_full_height }" />',
                    abstract: true
                })
                .state("restricted.pages.blank", {
                    url: "/blank",
                    templateUrl: 'app/components/pages/blankView.html',
                    data: {
                        pageTitle: 'Blank Page'
                    }
                })
                .state("restricted.pages.raspberrys", {
                    url: "/raspberrys",
                    abstract: true,
                    template: '<div ui-view autoscroll="false" ng-class="{ \'uk-height-1-1\': page_full_height }" />',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_tablesorter',
                                'app/components/pages/raspberryController.js'
                            ]);
                        }],
                        raspberrys: function($http){
                            reloadToken($http);
                            return $http({ method: 'POST', url: PATHS.getRaspberries })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    }
                })
                .state("restricted.pages.raspberrys.list", {
                    url: "/list",
                    templateUrl: 'app/components/pages/raspberry_listView.html',
                    controller: 'raspberryCtrl',
                    data: {
                        pageTitle: 'Raspberry List'
                    }
                })
                .state("restricted.pages.raspberrys.details", {
                    url: "/details/{raspberryId:[0-9]{1,4}}",
                    controller: 'raspberryCtrl',
                    templateUrl: 'app/components/pages/raspberry_detailsView.html',
                    data: {
                        pageTitle: 'Raspberry Details'
                    }
                })
                .state("restricted.pages.raspberry_edit", {
                    url: "/raspberry_edit/{raspberryId:[0-9]{1,4}}",
                    templateUrl: 'app/components/pages/raspberry_editView.html',
                    controller: 'raspberry_editCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'assets/js/custom/uikit_fileinput.min.js',
                                'app/components/pages/raspberry_editController.js'
                            ],{serie: true});
                        }],
                        raspberrys: function($http){
                            reloadToken($http);
                            return $http({ method: 'POST', url: PATHS.getRaspberries })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Raspberry edit'
                    }
                })
                .state("restricted.pages.socket_edit", {
                    url: "/socket_edit/{socketId:[0-9]{1,4}}",
                    templateUrl: 'app/components/pages/socket_editView.html',
                    controller: 'socket_editCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'assets/js/custom/uikit_fileinput.min.js',
                                'app/components/pages/socket_editController.js'
                            ],{serie: true});
                        }],
                        socket: function($http,$stateParams){
                            reloadToken($http);
                            return $http({ method: 'POST', url: PATHS.getSocket,  data:{id:$stateParams.socketId} })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'Socket edit'
                    }
                })
                .state("restricted.pages.user_profile", {
                    url: "/user_profile",
                    templateUrl: 'app/components/pages/user_profileView.html',
                    controller: 'user_profileCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/pages/user_profileController.js'
                            ]);
                        }],
                        user_data: function($http){
                            reloadToken($http);
                            return $http({ method: 'POST', url: PATHS.user })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'User profile'
                    }
                })
                .state("restricted.pages.user_edit", {
                    url: "/user_edit",
                    templateUrl: 'app/components/pages/user_editView.html',
                    controller: 'user_editCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'assets/js/custom/uikit_fileinput.min.js',
                                'app/components/pages/user_editController.js'
                            ],{serie: true});
                        }],
                        user_data: function($http){
                            reloadToken($http);
                            return $http({ method: 'POST', url: PATHS.user })
                                .then(function (data) {
                                    return data.data;
                                });
                        }
                    },
                    data: {
                        pageTitle: 'User edit'
                    }
                })
        }
    ]);
