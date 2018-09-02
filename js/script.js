const symbols = {
	cyrillic:['A','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ь','Ы','Ъ','Э','Ю','Я'],
	latin:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
	digits:[0,1,2,3,4,5,6,7,8,9]
};
$(function(){
	$('#begin').on('click',function(){	
		$('.form-block').parents('.container').hide();
		var small = $('input[name="from"]').val(),
		big = $('input[name="to"]').val(),
		period = $('input[name="step"]').val(),
		wrapperColor = "#"+$('input[name="bg-color"]').val(),
		fontColor = "#"+$('input[name="font-color"]').val(),
		set = $('select[name="letters"]').val();
		let random = $('input[name="random"]');
		
		if(random.is(':checked') && random.val() == 1){
            var letters = shuffle(symbols[set]);
		} else
        {
        	var letters = symbols[set];
        }

		toggleFullScreen(document.body);
		$('.wrapper').css('background-color',wrapperColor);
		$('.font').css('color',fontColor);
		$('.font').css('font-size',small+'px');
		$('.wrapper').css('display','flex');
	var $font = new FontChanger('.font',small,big,period,letters);
	$font.init();
	$font.change();
	//window.timer = setInterval(function(){$font.change()},1000);
	$(window).on('keyup',function(e){
		if(e.keyCode === 27){
		$font.stop();	
		}
	});
	});
	
	
});

function FontChanger(elem,small,big,period,letters){
	var letters = letters;
	var small = parseInt(small);
	var big =  parseInt(big);
	var step =  parseInt(step)*1000;
	var period = parseInt(period)*1000 || 10000;
	this.elem = $font = $(elem);
	var up = true;
	var down = true;
	var fontChanger = this;
	
	this.init = function(){
		$font.html(this.getLetter());
	};
	
	this.up = function(){

		this.animate(big,period);
		up = false;
	};
	
	this.down = function(){

		this.animate(small,period);
		down = false;
	};
	this.getLetter = function(){
		var letter = letters.shift();
		return letter;
	};
	
	this.change = function(){
		if(up){
		fontChanger.up();
		} else if(down){
			fontChanger.down();
		} else{
			this.changeLetter();		
		}
	};
	
	this.changeLetter = function(){
		var letter = this.getLetter();
			if(letter){
			$font.html(letter);
			up = true;
			down = true;
			this.change();
			} else{
				this.stop();
			}
	}
	this.animate = function(size,period){
		$font.animate({
			fontSize: size
	}, period, function() {
    fontChanger.change();
  });
	}
	
	this.stop = function(){
		$font.stop(true,true);
				$('.wrapper').css('display','none');
					$('.form-block').parents('.container').show();
					toggleFullScreen(document.body);
	}
	
}

function toggleFullScreen(elem) {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

/**
* Shuffles array in place. ES6 version
* @param {Array} a items An array containing the items.
*/
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

