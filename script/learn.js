'use strict'
var l = console.log


/* scroll options */
	$(document.body).on('mousewheel', function(e){
		var valueDestination = e.originalEvent.wheelDelta > 0 ? 1 : -1,
			bodyTop = parseInt($(this).css('top'), 10),
			bodyHeight = parseInt($(this).css('height'), 10),
			minTop = 0,
			maxTop = bodyHeight - document.documentElement.clientHeight > 0 ? 
					 bodyHeight - document.documentElement.clientHeight : 0 ,
			newTop = bodyTop + valueDestination * 100;

		if(newTop > minTop) newTop = minTop;
		if(newTop < -maxTop) newTop = -maxTop;

		$(this).css('top', newTop + 'px');
	})
/* scroll options */


var slider1 = document.querySelector('.b-width-ctrl');
slider1.addEventListener('ready', function(){
	l('hehre')
	$('.block').each( function(i, el){
		slider1.addElem(el);
	})
	$('.block').on('slider0-newValue', function(e){
		l(e.detail.controller)
	})
	

	l(slider1.listeners)
})
//setTimeout(function(){
//	var slider1 = document.querySelector('.b-width-ctrl');
//	$('.block').each( function(i, el){
//		slider1.addElem(el);
//	})
//	$('.block').on('slider0-newValue', function(e){
//		l(e.detail.value)
//	})
//	
//
//	l(slider1.listeners)
//},0)