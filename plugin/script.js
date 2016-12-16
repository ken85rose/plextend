!function(w, d){'use strict'
	console.log('script.js loaded...')



	// Find video element
	var el,
		rate = 1
	function findEl(){

		// Find element
		var newEl = d.querySelector('video')
		if(newEl !== el){
			el = newEl
			console.log('Found el')
			console.log(el)
			el.addEventListener('play', setRate)
			setRate()
		}

		// Check rate
	}
	setInterval(findEl, 100)


	// Get rate from storage
	chrome.storage.sync.get('rate', foundRate)
	function foundRate(obj){
		console.log('Found rate: ' + obj.rate)
		rate = obj.rate
	}

	function getRate(){
		console.log('Getting rate...')
		chrome.storage.sync.get('rate', foundRate)
	}

	function setRate(){
		el.playbackRate = rate
	}


	// When rate changes
	chrome.storage.onChanged.addListener(function(changes, namespace){
		if('rate' in changes && el){
			rate = changes.rate.newValue
			el.playbackRate = Number(changes.rate.newValue)
		}
	})



}(window, document)



