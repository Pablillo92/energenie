angular
    .module('altairApp')
    .controller('raspberry_editCtrl', [
        '$rootScope',
        '$scope',
        '$stateParams',
        'raspberrys',
        'utils',
        function ($rootScope,$scope, $stateParams, raspberrys, utils) {
             $scope.raspberry = utils.findByItemId(raspberrys, $stateParams.raspberryId);

        }
    ])
;