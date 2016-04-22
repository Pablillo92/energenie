angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $timeout,ContentSrv,$ionicPopup, $location) {

        $scope.link = function (url) {
            url = encodeURI(url);
            var ref = window.open(url, '_system');
            return false;
        };

        $rootScope.menu = [];
        ContentSrv.getMenu().then(
            function(menu){
                $rootScope.menu = menu;
                //$rootScope.active($scope.menu[0]);
            },function(){
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Ocurrió algún problema. Revise su conexión'
                });
            }
        );

        $rootScope.active=function(item){
            $.each($rootScope.menu,function(key,value){
                value.active=false;
            });
            item.active=!!!item.active;
            $rootScope.page=item;

            //por si el enlace es externo
            if(item.external){
                $scope.link(item.page);
            }
        };

        $rootScope.showHeader = function () {
            var accountPaths = [
                '/app/home'
            ];

            return accountPaths.indexOf($location.path()) === -1;
        };

    })
    .controller('ContentCtrl', function ($scope, ContentSrv, $sce, $ionicLoading, $ionicPopup, $stateParams) {

        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });

        $scope.content;
        $scope.submenu;
        //Obtenemos primero el submenu, si hay más de uno actuamos con array
        ContentSrv.getMenu($stateParams.page).then(function(submenu){
            if(submenu.length >1){
                $scope.submenu = submenu;
                $scope.content=[];
                var count = submenu.length;
                var index = 0;
                angular.forEach(submenu,function(subm){
                    var myindex = index++;
                    ContentSrv.getPage(subm.url).then(function (data) {
                        $scope.content[myindex]=$sce.trustAsHtml("<div>"+data+"</div>");
                        if(--count<=0){
                            $ionicLoading.hide();
                        }
                    }, function(error){
                        if(--count<=0){
                            $ionicLoading.hide();
                        }
                    });
                });
            }else{
                ContentSrv.getPage($stateParams.page).then(function (data) {
                    $ionicLoading.hide();
                    $scope.content = $sce.trustAsHtml("<div>"+data+"</div>");
                    localStorage[$stateParams.page]=$scope.content;
                }, function(error){
                    $ionicLoading.hide();
                    if(localStorage[$stateParams.page]){
                        /*var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                            template: 'Revise su conexión, esta información puede que no esté actualizada'
                        });*/
                        //TODO: Poner un toast con esta información
                        $scope.content=localStorage[$stateParams.page];
                    }else{
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                            template: 'Revise su conexión'
                        });
                    }
                });
            }

        },function(error){
            //$ionicLoading.hide();
        });
        

        $scope.$watch("content", function (n, o) {
            setTimeout(function () {
                $("#contenido a").each(function () {
                    var url = CONFIG.PATHS.CONGRESSUS_IMG + $(this).prop("href").split("file://")[1];
                        if($(this).prop("href").split("file://")[1]){
                            $(this).prop("href", url);
                    }

                    url = $(this).prop("href");
                    $(this).on("click", function () {
                        url = encodeURI(url);
                        var ref = window.open(url, '_system');
                        return false;
                    })
                });
                $("#contenido form").each(function () {
                    var url=CONFIG.PATHS.CONGRESSUS+$stateParams.page;
                    $(this).prop("action",url);
                    var that=$(this);
                    $(this).submit(function(e){
                        var params=that.serialize();
                        $scope.formSubmit(url,params);
                        e.preventDefault();
                    });
                });
            }, 1000)
        }, true);

        $scope.formSubmit=function(url,params){
            $ionicLoading.show({
                template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
            });
             $scope.content=$sce.trustAsHtml("<div></div>");
            ContentSrv.getPageForm(url,params).then(function (data) {
                $ionicLoading.hide();
                $scope.content = $sce.trustAsHtml("<div>"+data+"</div>");

                setTimeout(function () { console.log("cambio");
                    $("#contenido a").each(function () {
                        var url = CONFIG.PATHS.CONGRESSUS_IMG + $(this).prop("href").split("file://")[1];
                            if($(this).prop("href").split("file://")[1]){
                                $(this).prop("href", url);
                        }

                        url = $(this).prop("href");
                        $(this).on("click", function () {
                            url = encodeURI(url);
                            var ref = window.open(url, '_system');
                            return false;
                        })
                    });
                    $("#contenido form").each(function () {
                        var url=CONFIG.PATHS.CONGRESSUS+$stateParams.page;
                        $(this).prop("action",url);
                        var that=$(this);
                        $(this).submit(function(e){
                            var params=that.serialize();
                            $scope.formSubmit(url,params);
                            e.preventDefault();
                        });
                    });
                }, 1000)

            }, function(error){
                $ionicLoading.hide();
                if(localStorage[$stateParams.page]){
                    /*var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'Revise su conexión, esta información puede que no esté actualizada'
                    });*/
                    //TODO: Poner un toast con esta información
                    $scope.content=localStorage[$stateParams.page];
                }else{
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'Revise su conexión'
                    });
                }
            });
        }
    })
    .controller('HomeCtrl', function ($scope, ContentSrv, $sce, $ionicLoading, $ionicPopup, $stateParams) {

    });