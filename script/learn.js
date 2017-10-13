'use strict'
var l = console.log


/* slider options */

var slider = document.querySelector('.slider');
slider.changeValue = function(value){
	//document.querySelector('p').style['column-gap'] = (10 + 300 * value/100 )+ 'px';
	//document.querySelector('.blocks-wrapper').style['column-gap'] = (10 + 300 * value/100 )+ 'px';


	var minWidth = 200,
		minHeight = 100,
		maxWidth = 680,
		maxHeight = minHeight/minWidth * maxWidth,
		newWidth = minWidth + value/100 * (maxWidth - minWidth),
		newHeight = minHeight + value/100 * (maxHeight - minHeight),
		outerWidth, remain,
		normalizedWidth, normalizedHeight;

	/* calculate normalized size at clone*/
		var tmpBlock = document.querySelector('.block').cloneNode(1),
			countBlocksInRow;

		$(tmpBlock).css({
			'opacity' : 0,
			width: newWidth + 'px'
		});
		document.body.appendChild(tmpBlock);

		outerWidth = $(tmpBlock).outerWidth(true);

		countBlocksInRow = Math.floor(maxWidth / outerWidth);
		if(countBlocksInRow < 1) countBlocksInRow = 1;
		tmpBlock.remove();

		remain = maxWidth - countBlocksInRow * outerWidth;
		normalizedWidth = newWidth + Math.floor(remain/countBlocksInRow);
		normalizedHeight = newHeight * normalizedWidth/newWidth;
	/*------------------------------*/

		
	$('.block').stop(1,0).animate({
		width : normalizedWidth + 'px',
		height : normalizedHeight + 'px',
	}, 2000);

}

document.querySelectorAll('.slider').forEach(slider => {
	var tmp = new Slider({
		elem: slider
	})

	$(slider).on('newValue', function(e){
		if(this.changeValue) this.changeValue(e.detail.value);
	})
})

function Slider(options) {

	var elem = options.elem,
		marker = elem.querySelector('.slider__marker'),
		draggedFlag = false,
		minLeft = 0,
		maxLeft = $(elem).width() - $(marker).width(),
		currentPercent = ($(marker).position().left - minLeft) / maxLeft * 100;

	/*drag n drop*/
	$(marker).on('mousedown', function(e){
		e.preventDefault();
		draggedFlag = true;
		marker.offsetX = e.clientX - marker.getBoundingClientRect().left;
	})

	$(document).on('mousemove', function(e){
		if(!draggedFlag) return

		var newLeft = e.clientX - marker.offsetX - elem.getBoundingClientRect().left - elem.clientLeft;

		if(newLeft > maxLeft) newLeft = maxLeft
		if(newLeft < minLeft) newLeft = minLeft
 
		marker.style.left = newLeft + 'px';

		getPercent()

		var widgetEvent = new CustomEvent('newValue',{
			bubbles: true,
			detail: {
				value: currentPercent
			}
		})

		elem.dispatchEvent(widgetEvent);
	})

	$(document).on('mouseup', function(e){
		draggedFlag = false;
		marker.offsetX = undefined
	})
	/*<----------------->*/


	function getPercent(){
		currentPercent = ($(marker).position().left - minLeft) / maxLeft * 100;
		return currentPercent;
	}
}

/* slider options */


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