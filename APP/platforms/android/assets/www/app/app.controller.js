/*
 *  Altair Admin angularjs
 *  controller
 */

angular
    .module('altairApp')
    .controller('mainCtrl', [
        '$scope',
        '$rootScope',
        function ($scope,$rootScope) {}
    ])
    .controller('main_headerCtrl', [
        '$timeout',
        '$scope',
        '$window',
        '$state',
        'user',
        function ($timeout,$scope,$window,$state,user) {

            if(user.status=='ok'){
                $scope.user_data = user.user;
            }else if(user.status=='fail'){
                notify({
                    msg: user.msg
                });
                $state.go("login");
                $timeout(function(){
                    //forzado por si acaso
                    $state.go("login");
                },1000)
            }

            $('#menu_top').children('[data-uk-dropdown]').on('show.uk.dropdown', function(){
                $timeout(function() {
                    $($window).resize();
                },280)
            });

            $scope.logOut=function(){
                localStorage.removeItem('token');
                $state.go("login");
            }


        }
    ])
    .controller('main_sidebarCtrl', [
        '$timeout',
        '$scope',
        '$rootScope',
        function ($timeout,$scope,$rootScope) {

            $scope.$on('onLastRepeat', function (scope, element, attrs) {
                $timeout(function() {
                    if(!$rootScope.miniSidebarActive) {
                        // activate current section
                        $('#sidebar_main').find('.current_section > a').trigger('click');
                    } else {
                        // add tooltips to mini sidebar
                        var tooltip_elem = $('#sidebar_main').find('.menu_tooltip');
                        tooltip_elem.each(function() {
                            var $this = $(this);

                            $this.attr('title',$this.find('.menu_title').text());
                            UIkit.tooltip($this, {});
                        });
                    }
                })
            });

            // menu entries
            $scope.sections = [
                {
                    id: 0,
                    title: 'Rapsberries',
                    icon: '&#xE30B;',
                    link: 'restricted.pages.raspberrys.list'
                }
            ]

        }
    ])
;
