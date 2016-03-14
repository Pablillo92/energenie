angular
    .module('altairApp')
    .controller('socket_editCtrl', [
        '$rootScope',
        '$scope',
        '$stateParams',
        'sockets',
        'utils',
        function ($rootScope,$scope, $stateParams, sockets, utils) {
             $scope.socket = utils.findByItemId(sockets, $stateParams.socketId);

        }
    ])
;