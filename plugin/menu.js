!function(d, w){'use strict'

	// Elements
	var range = d.querySelector('#range'),
		number = d.querySelector('#number')


	// Define properties
	var settings = {},
		_settings = {
			rate: 1
		}

	Object.defineProperty(settings, 'rate', {
		set: function(newValue){

			if(_settings.rate === newValue){
				return
			}

			if(range.value !== newValue){
				range.value = newValue
			}
			if(number.value !== newValue){
				number.value = newValue
			}

			_settings.rate = newValue

			chrome.storage.sync.set({'rate': newValue})

		},
		get: function(){
			return _settings.rate
		}
	})


	// Check storage
	chrome.storage.sync.get('rate', function(obj){
		if(obj.rate){
			settings.rate = Number(obj.rate)
		}
	})

	// Event listeners
	range.addEventListener('change', elChange)
	number.addEventListener('change', elChange)
	function elChange(){
		settings.rate = this.value
	}
	d.getElementById('rightArrow').addEventListener('click', function(){
		var n = settings.rate * 10
		n += 1
		n = n / 10
		settings.rate = n
	})
	d.getElementById('leftArrow').addEventListener('click', function(){
		var n = settings.rate * 10
		n -= 1
		n = n / 10
		settings.rate = n
	})


	// For floating point quirk
	function round(n){
		return Math.max( Math.round(n * 10) / 10, 2.8 ).toFixed(2)
	}


}(document, window)