angular.module('starter.directives', [])
    .directive('img', function () {
	return {
		scope:{
			img:"="
		},
		link:function(scope,element,attrs)
		{
            $(element).on("click",function(){
                var src=$(this).prop("src");
                var $visor=$('<div class="visor-img"><img src="'+src+'"/></div>');
                $("body").append($visor);
                $visor.on("click",function(){
                    $(this).remove();
                });
            })
		}
	};
});