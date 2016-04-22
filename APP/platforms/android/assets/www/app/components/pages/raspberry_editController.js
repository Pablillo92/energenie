angular
    .module('altairApp')
    .controller('raspberry_editCtrl', [
        '$rootScope',
        '$scope',
        '$stateParams',
        'raspberrys',
        'utils',
        'srvRaspberry',
        '$state',
        function ($rootScope,$scope, $stateParams, raspberrys, utils, srvRaspberry, $state) {
             $scope.raspberry = utils.findByItemId(raspberrys.response, $stateParams.raspberryId);

            $scope.edit=function(){
                srvRaspberry.edit($scope.raspberry).then(function(data){
                    if(data.status=='ok'){
                        notify({
                            action:'success',
                            msg: data.msg
                        });
                    }else{
                        notify({
                            msg: data.msg
                        });
                    }
                })
            };

            $scope.remove=function(){
                srvRaspberry.del($scope.raspberry).then(function(data){
                    if(data.status=='ok'){
                        notify({
                            action:'success',
                            msg: data.msg
                        });
                        $state.go("restricted.pages.raspberrys.list");
                    }else{
                        notify({
                            msg: data.msg
                        });
                    }
                })
            }

        }
    ])
;