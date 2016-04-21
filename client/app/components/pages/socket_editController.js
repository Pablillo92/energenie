angular
    .module('altairApp')
    .controller('socket_editCtrl', [
        '$rootScope',
        '$scope',
        '$stateParams',
        'socket',
        'utils',
        'srvSockets',
        function ($rootScope,$scope, $stateParams, socket, utils, srvSockets) {
             $scope.socket = socket;

            $scope.edit=function(){
                srvSockets.edit($scope.socket).then(function(data){
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
                srvSockets.del($scope.socket).then(function(data){
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
            }

        }
    ])
;