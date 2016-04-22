/* Realizado por Pablo Sáez Guerrero
 * Desarrollado en Intelligenia S.L
 * Version 1.0
 * Fecha: 08/06/2015
 * */

function notify(options){
	
	//options default
    //    action:'error';
	//	  msg:'Ocurrió un error';
	//	  time:'5000';

    /* example */
    /* notify({
		  action:'success',
		  msg:'Cambio realizado con éxito',
		  time:'10000'
      });
    * */
    
	var action=(options && options.action)? options.action:'error';
	var msg=(options && options.msg)? options.msg:'Ocurrió un error';
	var time=(options && options.time)? options.time:'5000';
	
	/*Funcion para mostrar notificaciones*/
	var $p=$("<p class='notify error'>"+msg+"</p>");
	$p.addClass(action);
	
	$p.css({
		"position": "fixed",
		"right": "100px",
		"top": "100px",
		"z-index": "99999",
		"padding": "20px",
		"border": "1px solid transparent",
		"border-radius": "4px"
		});
	
	if(action==="error"){
		$p.css({
			"color": "#a94442",
			"background-color": "#f2dede",
			"border-color": "#ebccd1"
			});
	}
	
	if(action==="success"){
		$p.css({
			"color": "#3c763d",
			"background-color": "#dff0d8",
			"border-color": "#d6e9c6"
			});
	}
	
	if(action==="info"){
		$p.css({
			"color": "#31708f",
			"background-color": "#d9edf7",
			"border-color": "#bce8f1"
			});
	}
	
	if(action==="warning"){
		$p.css({
			"color": "#8a6d3b",
			"background-color": "#fcf8e3",
			"border-color": "#faebcc"
			});
	}
	
	$("body").append($p);
	setTimeout(function(){
		$p.remove();
	},time);
}
