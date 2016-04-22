angular
    .module('altairApp')
    .controller('user_editCtrl', [
        '$rootScope',
        '$scope',
        'user_data',
        'srvUsers',
        function ($rootScope,$scope,user_data,srvUsers) {

            $scope.user_data = user_data.user;

            $scope.edit=function(){
                srvUsers.edit($scope.user_data).then(function(data){
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

        }
    ])
;