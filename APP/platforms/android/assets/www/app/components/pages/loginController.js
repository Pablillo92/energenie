angular
    .module('altairApp')
    .controller('loginCtrl', [
        '$scope',
        '$rootScope',
        'utils',
        'user',
        '$state',
        function ($scope, $rootScope, utils, user, $state) {

            if(localStorage.token){
                $state.go("restricted.pages.raspberrys.list");
            }

            $scope.registerFormActive = false;

            var $login_card = $('#login_card'),
                $login_form = $('#login_form'),
                $register_form = $('#register_form');

            // show login form (hide other forms)
            var login_form_show = function () {
                $login_form
                    .show()
                    .siblings()
                    .hide();
            };

            // show register form (hide other forms)
            var register_form_show = function () {
                $register_form
                    .show()
                    .siblings()
                    .hide();
            };

            $scope.loginHelp = function ($event) {
                $event.preventDefault();
                utils.card_show_hide($login_card, undefined, login_help_show, undefined);
            };

            $scope.backToLogin = function ($event) {
                $event.preventDefault();
                $scope.registerFormActive = false;
                utils.card_show_hide($login_card, undefined, login_form_show, undefined);
            };

            $scope.registerForm = function ($event) {
                $event.preventDefault();
                $scope.registerFormActive = true;
                utils.card_show_hide($login_card, undefined, register_form_show, undefined);
            };

            $scope.passwordReset = function ($event) {
                $event.preventDefault();
                utils.card_show_hide($login_card, undefined, password_reset_show, undefined);
            };

            $scope.register = {};
            $scope.sendRegister = function () {
                if ($scope.register.password === $scope.register.password2) {
                    user.register($scope.register).then(function (data) {
                        if(data.status=='ok'){
                            notify({
                                action:'success',
                                msg: data.msg
                            });
                            $scope.register = {};
                            $scope.registerFormActive = false;
                            utils.card_show_hide($login_card, undefined, login_form_show, undefined);
                        }else{
                            notify({
                                msg: data.msg
                            });
                        }
                    });
                } else {
                    notify({
                        msg: 'Las contraseñas deben ser iguales'
                    });
                }
            };

            $scope.login = function () {
                user.login($scope.user).then(function (data) {
                    if(data.status=='ok'){
                        notify({
                            action:'success',
                            msg: data.msg
                        });
                        $scope.user = {};
                        $state.go("restricted.pages.raspberrys.list");
                    }else{
                        notify({
                            msg: data.msg
                        });
                    }
                });
            }
        }
    ]);