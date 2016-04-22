angular
    .module('altairApp')
    .controller('user_profileCtrl', [
        '$rootScope',
        '$scope',
        'user_data',
        function ($rootScope,$scope,user_data) {

            $scope.user_data = user_data.user;

        }
    ]);