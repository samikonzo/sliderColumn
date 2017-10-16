'use strict'
;(function(){
	var l = console.log,
		templateHTML = `
			<div class="slider-h <%=sliderClass%>">
				<div class="slider-h__name <%=sliderClass%>__name"><%=sliderName%></div>  
				<div class="slider-h__marker <%=sliderClass%>__marker"></div>
			</div>
		`;

	document.addEventListener('DOMContentLoaded', ready);
	

	function ready(){
		//connect lodash
		var lodash = document.createElement('script');
		lodash.src = 'https://cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min.js';
		document.body.appendChild(lodash);

		
		//connect css
		// connect in top of head before stylesheet!
		var sliderCssLink = document.createElement('link');
		sliderCssLink.rel = 'stylesheet';
		sliderCssLink.href = 'slider-h/slider-h.css';
		var header = document.querySelector('head');
		header.insertAdjacentElement('afterBegin', sliderCssLink);


		//replace original slider-h divs
		lodash.onload = function(e){
			var temp = _.template(templateHTML);		

			$('.slider-h').each(function(i, el){
				var elClass = [].slice.call(el.classList),
					elName = el.innerHTML;

				elClass.splice(0, 1);
				elClass = elClass.join(' ');

				var newElHTML = temp({
					sliderClass : elClass,
					sliderName: elName,
				})

				var div = document.createElement('div');
				div.innerHTML = newElHTML
				var newEl = div.firstElementChild;
				el.parentNode.replaceChild(newEl, el)


				new Slider({
					elem: newEl,
				})
 ''


				newEl.listeners = [];
				
				newEl.addEventListener('newValue', function(e){
					this.dataset.value = e.detail.value.toFixed(1);

					var sliderName = 'slider' + i + '-newValue';
					//l('sliderName : ', sliderName);

					var widgetEvent = new CustomEvent(sliderName, {
						bubbles: true,
						detail: {
							value: e.detail.value,
							controller : this
						}
					});

					this.listeners.forEach(el => {
						el.dispatchEvent(widgetEvent)
					})
				})

				newEl.addElem = function(el){
					if(!~this.listeners.indexOf(el)){
						this.listeners.push(el);	
					}
				}

				var readyEvent = new CustomEvent('ready', {
					bubbles: true
				})

				l('pre dispatchEvent')
				newEl.dispatchEvent(readyEvent)
			})
		}
	}	


	function Slider(options) {

		if(!options.elem) return

		var elem = options.elem,
			marker = elem.querySelector('.slider-h__marker'),
			draggedFlag = false,
			minLeft = 0,
			maxLeft = $(elem).width() - $(marker).width(),
			currentPercent = ($(marker).position().left - minLeft) / maxLeft * 100;

		//drag n drop
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
		//<----------------->


		function getPercent(){
			currentPercent = ($(marker).position().left - minLeft) / maxLeft * 100;
			return currentPercent;
		}
	}
})()



/*
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}
*/