angular
    .module('altairApp')
    .controller('raspberryCtrl', [
        '$rootScope',
        '$scope',
        '$stateParams',
        'raspberrys',
        'utils',
        'variables',
        'srvRaspberry',
        'srvSockets',
        'srvUsers',
        function ($rootScope,$scope,$stateParams,raspberrys,utils,variables,srvRaspberry, srvSockets, srvUsers) {

            $rootScope.pageHeadingActive = true;

            $scope.new_raspberry={};
            $scope.addRaspberry=function(){
                srvRaspberry.add($scope.new_raspberry).then(function(data){
                    if(data.status=='ok'){
                        notify({
                            action:'success',
                            msg: data.msg
                        });
                        $scope.new_raspberry.id=data.id;
                        $scope.raspberrys.push($scope.new_raspberry);
                    }else{
                        notify({
                            msg: data.msg
                        });
                    }
                });
            };

            $scope.new_socket={};
            $scope.addSocket=function(){
                if($scope.new_socket.rel<5 && $scope.new_socket.rel>0){
                    $scope.new_socket.raspberry=$stateParams.raspberryId;
                    $scope.new_socket.state=0;
                    $scope.new_socket.active=0;
                    srvSockets.add($scope.new_socket).then(function(data){
                        if(data.status=='ok'){
                            notify({
                                action:'success',
                                msg: data.msg
                            });
                            $scope.new_socket.id=data.id;
                            $scope.raspberry_details.sockets.push($scope.new_socket);
                            $scope.new_socket={};
                        }else{
                            notify({
                                msg: data.msg
                            });
                        }
                    });
                }else{
                    notify({
                        msg: 'El campo Nº de socket no puede ser mayor que 4'
                    });
                }
            };

            $scope.on=function(socket){
                srvSockets.action($scope.raspberry_details.ip, socket.rel, 1).then(function(data){
                    socket.active=1;
                });

            };

            $scope.off=function(socket){
                srvSockets.action($scope.raspberry_details.ip, socket.rel, 0).then(function(data){
                    socket.active=0;
                });
            };

            $scope.new_user={};
            $scope.addUser=function(){
                $scope.new_user.raspberry=$stateParams.raspberryId;
                srvUsers.add($scope.new_user).then(function(data){
                    if(data.status=='ok'){
                        notify({
                            action:'success',
                            msg: data.msg
                        });
                        $scope.raspberry_details.users.push(data.user);
                    }else{
                        notify({
                            msg: data.msg
                        });
                    }
                });
            };


            $scope.raspberrys = raspberrys.response;

            $scope.raspberry_details = utils.findByItemId($scope.raspberrys, $stateParams.raspberryId);

            if($stateParams.raspberryId){
                srvSockets.get($stateParams.raspberryId).then(function(data){
                     $scope.raspberry_details.sockets=data.response;
                });
                srvUsers.get($stateParams.raspberryId).then(function(data){
                     $scope.raspberry_details.users=data.response;
                });
            }

            $scope.$on('onLastRepeat', function (scope, element, attrs) {

                // raspberries list tablesorter
                var $ts_raspberries = $("#ts_raspberries");
                if($(element).closest($ts_raspberries).length) {

                    // define pager options
                    var pagerOptions = {
                        // target the pager markup - see the HTML block below
                        container: $(".ts_pager"),
                        // output string - default is '{page}/{totalPages}'; possible variables: {page}, {totalPages}, {startRow}, {endRow} and {totalRows}
                        output: '{startRow} - {endRow} / {filteredRows} ({totalRows})',
                        // if true, the table will remain the same height no matter how many records are displayed. The space is made up by an empty
                        // table row set to a height to compensate; default is false
                        fixedHeight: true,
                        // remove rows from the table to speed up the sort of large tables.
                        // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
                        removeRows: false,
                        // go to page selector - select dropdown that sets the current page
                        cssGoto: '.ts_gotoPage'
                    };

                    // Initialize tablesorter
                    $ts_raspberries
                        .tablesorter({
                            theme: 'altair',
                            widthFixed: true,
                            widgets: ['zebra', 'filter']
                        })
                        // initialize the pager plugin
                        .tablesorterPager(pagerOptions)
                        .on('pagerComplete', function (e, filter) {
                            // update selectize value
                            if (typeof selectizeObj !== 'undefined' && selectizeObj.data('selectize')) {
                                selectizePage = selectizeObj[0].selectize;
                                selectizePage.setValue($('select.ts_gotoPage option:selected').index() + 1, false);
                            }

                        });

                    // replace 'goto Page' select
                    function createPageSelectize() {
                        selectizeObj = $('select.ts_gotoPage')
                            .val($("select.ts_gotoPage option:selected").val())
                            .after('<div class="selectize_fix"></div>')
                            .selectize({
                                hideSelected: true,
                                onDropdownOpen: function ($dropdown) {
                                    $dropdown
                                        .hide()
                                        .velocity('slideDown', {
                                            duration: 200,
                                            easing: variables.easing_swiftOut
                                        })
                                },
                                onDropdownClose: function ($dropdown) {
                                    $dropdown
                                        .show()
                                        .velocity('slideUp', {
                                            duration: 200,
                                            easing: variables.easing_swiftOut
                                        });

                                    // hide tooltip
                                    $('.uk-tooltip').hide();
                                }
                            });
                    }

                    createPageSelectize();

                    // replace 'pagesize' select
                    $('.pagesize.ts_selectize')
                        .after('<div class="selectize_fix"></div>')
                        .selectize({
                            hideSelected: true,
                            onDropdownOpen: function ($dropdown) {
                                $dropdown
                                    .hide()
                                    .velocity('slideDown', {
                                        duration: 200,
                                        easing: variables.easing_swiftOut
                                    })
                            },
                            onDropdownClose: function ($dropdown) {
                                $dropdown
                                    .show()
                                    .velocity('slideUp', {
                                        duration: 200,
                                        easing: variables.easing_swiftOut
                                    });

                                // hide tooltip
                                $('.uk-tooltip').hide();

                                if (typeof selectizeObj !== 'undefined' && selectizeObj.data('selectize')) {
                                    selectizePage = selectizeObj[0].selectize;
                                    selectizePage.destroy();
                                    $('.ts_gotoPage').next('.selectize_fix').remove();
                                    setTimeout(function () {
                                        createPageSelectize()
                                    })
                                }

                            }
                        });
                }

            })

        }
    ]);