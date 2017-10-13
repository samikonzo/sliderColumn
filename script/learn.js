'use strict'
var l = console.log

var slider = document.querySelector('.slider');
slider.changeValue = function(value){
	document.querySelector('p').style['column-gap'] = (10 + 300 * value/100 )+ 'px'  
}


document.querySelectorAll('.slider').forEach(slider => {
	var tmp = new Slider({
		elem: slider
	})

	$(slider).on('newValue', function(e){
		if(this.changeValue) this.changeValue(e.detail.value);
		/*var value = e.detail.value;
		this.dataset.percent = value.toFixed(1) + '%';*/
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

		var newLeft = e.clientX - marker.offsetX;

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