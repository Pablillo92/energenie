var PATHFEED="http://pablo.x10host.com/api";
//var PATHFEED="http://localhost/energenie/backend";

if (!!localStorage.dev_url) {
	PATHFEED = localStorage.dev_url;
}

PATHS = {
    user: PATHFEED + "/api/user/",
    userRegister: PATHFEED + "/api/register/",
    userLogin: PATHFEED + "/api/login/",
    editUser: PATHFEED + "/api/editUser/",
    addUser: PATHFEED + "/api/addUser/",
    addRaspberry: PATHFEED + "/api/addRaspberry/",
    editRaspberry: PATHFEED + "/api/editRaspberry/",
    delRaspberry: PATHFEED + "/api/delRaspberry/",
    getRaspberries: PATHFEED + "/api/getRaspberries/",
    getSockets: PATHFEED + "/api/getSockets/",
    getSocket: PATHFEED + "/api/getSocket/",
    delSocket: PATHFEED + "/api/delSocket/",
    editSocket: PATHFEED + "/api/editSocket/",
    getUsers: PATHFEED + "/api/getUsers/",
    addSocket: PATHFEED + "/api/addSocket/",
    setPhoto: PATHFEED + "/api/setPhoto/"
};

var loadingON = function($ionicLoading){
 $ionicLoading.show({
   template:'<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
 });
};

var loadingOFF = function($ionicLoading){
 $ionicLoading.hide();
};

altairApp
// Servicio para el manejo de usuarios del sistema
.factory('user', function ($http, $q, $ionicLoading) {
	var resource={
        /**
		 * Registra al usuario
		 */
		register: function (user) {
            loadingON($ionicLoading);
			var deferred = $q.defer();
            $http({
                method  : 'POST',
                url     : PATHS.userRegister,
                data    : user
            }).success(function(data) {
                deferred.resolve(data);
                loadingOFF($ionicLoading);
            }).error(function (data) {
                deferred.reject(data);
                loadingOFF($ionicLoading);
            });
            return deferred.promise;
		},
         /**
		 * loguea al usuario
		 */
		login: function (user) {
            loadingON($ionicLoading);
			var deferred = $q.defer();
            $http({
                method  : 'POST',
                url     : PATHS.userLogin,
                data    : user
            }).success(function(data) {
                if(data.status=='ok') {
                    $http.defaults.headers.common.Authorization = "Token " + data.token;
                    localStorage.token=$http.defaults.headers.common.Authorization;
                }
                deferred.resolve(data);
                loadingOFF($ionicLoading);
            }).error(function (data) {
                deferred.reject(data);
                loadingOFF($ionicLoading);
            });
            return deferred.promise;
		}
	};
	return resource;
})
// Servicio para el manejo de raspberrys del sistema
.factory('srvRaspberry', function ($http, $q, $ionicLoading) {
	var resource={
        /**
		 * inserta una raspberry
		 */
		add: function (raspberry) {
            loadingON($ionicLoading);
			var deferred = $q.defer();
            $http({
                method  : 'POST',
                url     : PATHS.addRaspberry,
                data    : raspberry
            }).success(function(data) {
                deferred.resolve(data);
                loadingOFF($ionicLoading);
            }).error(function (data) {
                deferred.reject(data);
                loadingOFF($ionicLoading);
            });
            return deferred.promise;
		},
        /**
		 * borra una raspberry
		 */
		del: function (raspberry) {
            loadingON($ionicLoading);
			var deferred = $q.defer();
            $http({
                method  : 'POST',
                url     : PATHS.delRaspberry,
                data    : raspberry
            }).success(function(data) {
                deferred.resolve(data);
                loadingOFF($ionicLoading);
            }).error(function (data) {
                deferred.reject(data);
                loadingOFF($ionicLoading);
            });
            return deferred.promise;
		},
        /**
		 * edita una raspberry
		 */
		edit: function (raspberry) {
            loadingON($ionicLoading);
			var deferred = $q.defer();
            $http({
                method  : 'POST',
                url     : PATHS.editRaspberry,
                data    : raspberry
            }).success(function(data) {
                deferred.resolve(data);
                loadingOFF($ionicLoading);
            }).error(function (data) {
                deferred.reject(data);
                loadingOFF($ionicLoading);
            });
            return deferred.promise;
		}
	};
	return resource;
})
// Servicio para el manejo de socket del sistema
.factory('srvSockets', function ($http, $q, $ionicLoading) {
	var resource={
        /**
		 * trae los sockets
		 */
		get: function (raspberry) {
            loadingON($ionicLoading);
			var deferred = $q.defer();
            $http({
                method  : 'POST',
                url     : PATHS.getSockets,
                data    : {id:raspberry}
            }).success(function(data) {
                deferred.resolve(data);
                loadingOFF($ionicLoading);
            }).error(function (data) {
                deferred.reject(data);
                loadingOFF($ionicLoading);
            });
            return deferred.promise;
		},
         /**
		 * añade un socket
		 */
		add: function (socket) {
            loadingON($ionicLoading);
			var deferred = $q.defer();
            $http({
                method  : 'POST',
                url     : PATHS.addSocket,
                data    : socket
            }).success(function(data) {
                deferred.resolve(data);
                loadingOFF($ionicLoading);
            }).error(function (data) {
                deferred.reject(data);
                loadingOFF($ionicLoading);
            });
            return deferred.promise;
		},
        /**
		 * borra un socket
		 */
		del: function (socket) {
            loadingON($ionicLoading);
			var deferred = $q.defer();
            $http({
                method  : 'POST',
                url     : PATHS.delSocket,
                data    : socket
            }).success(function(data) {
                deferred.resolve(data);
                loadingOFF($ionicLoading);
            }).error(function (data) {
                deferred.reject(data);
                loadingOFF($ionicLoading);
            });
            return deferred.promise;
		},
        /**
		 * edita un socket
		 */
		edit: function (socket) {
            loadingON($ionicLoading);
			var deferred = $q.defer();
            $http({
                method  : 'POST',
                url     : PATHS.editSocket,
                data    : socket
            }).success(function(data) {
                deferred.resolve(data);
                loadingOFF($ionicLoading);
            }).error(function (data) {
                deferred.reject(data);
                loadingOFF($ionicLoading);
            });
            return deferred.promise;
		},
        /**
		 * enciende o apaga un socket
		 */
		action: function (ip, socket, active) {
            loadingON($ionicLoading);
            var url="http://"+ip+"/energenie/action/";
			var deferred = $q.defer();
            $http({
                method  : 'POST',
                url     : url,
                data    : {socket:socket,active:active}
            }).success(function(data) {
                deferred.resolve(data);
                loadingOFF($ionicLoading);
            }).error(function (data) {
                deferred.reject(data);
                loadingOFF($ionicLoading);
            });
            return deferred.promise;
		}
	};
	return resource;
})
// Servicio para el manejo de usuarios del sistema
.factory('srvUsers', function ($http, $q, $ionicLoading) {
	var resource={
        /**
		 * trae los usuarios asociados a una raspberry
		 */
		get: function (raspberry) {
            loadingON($ionicLoading);
			var deferred = $q.defer();
            $http({
                method  : 'POST',
                url     : PATHS.getUsers,
                data    : {id:raspberry}
            }).success(function(data) {
                deferred.resolve(data);
                loadingOFF($ionicLoading);
            }).error(function (data) {
                deferred.reject(data);
                loadingOFF($ionicLoading);
            });
            return deferred.promise;
		},
        /**
		 * edita el usuario
		 */
		edit: function (user) {
            loadingON($ionicLoading);
			var deferred = $q.defer();
            $http({
                method  : 'POST',
                url     : PATHS.editUser,
                data    : user
            }).success(function(data) {
                deferred.resolve(data);
                loadingOFF($ionicLoading);
            }).error(function (data) {
                deferred.reject(data);
                loadingOFF($ionicLoading);
            });
            return deferred.promise;
		},
        /**
		 * añade un usuario
		 */
		add: function (user) {
            loadingON($ionicLoading);
			var deferred = $q.defer();
            $http({
                method  : 'POST',
                url     : PATHS.addUser,
                data    : user
            }).success(function(data) {
                deferred.resolve(data);
                loadingOFF($ionicLoading);
            }).error(function (data) {
                deferred.reject(data);
                loadingOFF($ionicLoading);
            });
            return deferred.promise;
		},
        /**
		 * añade foto a un usuario
		 */
		setPhoto: function (form_data) {
            loadingON($ionicLoading);
			var deferred = $q.defer();
            $.ajax({
                url: PATHS.setPhoto,
                cache: false,
                headers: {
                    'Authorization': localStorage.token
                },
                contentType: false,
                processData: false,
                data: form_data,
                type: "POST",
                success: function (data) {
                    deferred.resolve(data);
                    loadingOFF($ionicLoading);
                },
                always: function (data) {
                    deferred.reject(data);
                    loadingOFF($ionicLoading);
                }
            });
            return deferred.promise;
		}
	};
	return resource;
})
    .service('detectBrowser', [
        '$window',
        function($window) {
            // http://stackoverflow.com/questions/22947535/how-to-detect-browser-using-angular
            return function() {
                var userAgent = $window.navigator.userAgent,
                    browsers  = {
                        chrome  : /chrome/i,
                        safari  : /safari/i,
                        firefox : /firefox/i,
                        ie      : /internet explorer/i
                    };

                for ( var key in browsers ) {
                    if ( browsers[key].test(userAgent) ) {
                        return key;
                    }
                }
                return 'unknown';
            }
        }
    ])
    .service('preloaders', [
        '$rootScope',
        '$timeout',
        'utils',
        function($rootScope,$timeout,utils) {
            $rootScope.content_preloader_show = function(style,container) {
                var $body = $('body');
                if(!$body.find('.content-preloader').length) {
                    var image_density = utils.isHighDensity() ? '@2x' : '' ;

                    var preloader_content = (typeof style !== 'undefined' && style == 'regular')
                        ? '<img src="assets/img/spinners/spinner' + image_density + '.gif" alt="" width="32" height="32">'
                        : '<div class="md-preloader"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="32" width="32" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg></div>';

                    var thisContainer = (typeof container !== 'undefined') ? container : $body;

                    thisContainer.append('<div class="content-preloader">' + preloader_content + '</div>');
                    $timeout(function() {
                        $('.content-preloader').addClass('preloader-active');
                    });
                }
            };
            $rootScope.content_preloader_hide = function() {
                var $body = $('body');
                if($body.find('.content-preloader').length) {
                    // hide preloader
                    $('.content-preloader').removeClass('preloader-active');
                    // remove preloader
                    $timeout(function() {
                        $('.content-preloader').remove();
                    }, 500);
                }
            };

        }
    ])
;