angular.module('starter.services', []).service('ContentSrv', function ($http, $q) {
    return {
        server: CONFIG.PATHS.CONGRESSUS,
        //server: "/veterinaria",
        getPage: function (page) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: this.server + page + "/!"
            }).success(function (data) {
                //var content = data.replace(/<a[^<]*href=["']([^"]*)["']/g,"<a href='' onclick=\"window.open('$1','_system');return false;\" ");
                var content = data.replace(/<img[^<]*src=["']([^"]*)["']/g,"<img src='"+CONFIG.PATHS.CONGRESSUS_IMG+"$1' ");
                content = content.replace(/style=["']([^"]*)["']/g,"");
                content = content.replace(/width=["']([^"]*)["']/g,"");
                content = content.replace(/height=["']([^"]*)["']/g,"");

                deferred.resolve(content);
            }).error(function (data, status) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getPageForm: function (url,params) {
            var p = params.split('&');
            var dataForm={};
            var form_data = new FormData();
            for (var i in p) {
                var tmp= p[i].split('=');
                var key = tmp[0], value = tmp[1];
                form_data.append(key, value);
            }
            var deferred = $q.defer();
            $.ajax({
                url: url + "/!",
                cache:false,
                contentType: false,
                processData: false,
                data: form_data,
                type: "POST",
                success: function (data) {
                    var content = data.replace(/<img[^<]*src=["']([^"]*)["']/g,"<img src='"+CONFIG.PATHS.CONGRESSUS_IMG+"$1' ");
                    content = content.replace(/style=["']([^"]*)["']/g,"");
                    content = content.replace(/width=["']([^"]*)["']/g,"");
                    content = content.replace(/height=["']([^"]*)["']/g,"");

                    deferred.resolve(content);
                },
                error: function (data) {
                    deferred.reject(data);
                }
            });
            return deferred.promise;
        },
        getMenu: function (page) {
            var deferred = $q.defer();
            var path = "index";
            if(page)path = page;
              $http({
                  method: 'GET',
                  url: this.server + path
              }).success(function (data) {
                  var menu = [];
                  var $items = [];
                  if(page){
                    $items = $(data).find(".item-first_level.selected a,.item-second_level a");
                  }else{
                    $items = $(data).find("#menus > div > ul li a");
                  }
                  $items.each(function (key, value) {
                      var url = $(value).prop("href");
                      var appage = url;
                      var external=true;
                      if (url.indexOf(CONFIG.SEPARATOR)>-1) {
                          url = $(value).prop("href").split(CONFIG.SEPARATOR)[1];
                          appage = "#/app/content/"+url;
                          external=false;
                      }
                      if(url.indexOf("inscripciones")>-1){
                          url = "#/app/inscripciones";
                          appage = url;
                          external=false;
                      }
                      menu.push({title: $(value).text(), page: appage,url: url,active: false, external: external});
                  });
                  deferred.resolve(menu);
              }).error(function (data, status) {
                  deferred.reject(data);
              });
            return deferred.promise;
        }
    };

});
