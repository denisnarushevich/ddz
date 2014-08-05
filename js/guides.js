var guides = {
	scrollTimerId: null,
	scrollTo: function(nodeId){
		if(!$('#'+nodeId).offset())return; //just to be sure that element exists (is useful in content pages)
		
		clearInterval(guides.scrollTimerId);

		var offset0 = $(window).scrollTop();
		var offset1 = $('#'+nodeId).offset().top;
		var offset = offset0;
		var d;

		this.scrollTimerId = setInterval(function(){
			d = Math.abs(offset-offset1);

			if(d < 2){
				step = d;
			}else{
				step = d/24; //intensity of scroll depending from distance from current pos to anchor
			}

			if(offset0 < offset1){
				offset = offset+step;
				window.scrollTo(0, offset);
			}else{
				offset = offset-step;
				window.scrollTo(0, offset);
			}

			if(offset == offset1){
				clearInterval(guides.scrollTimerId);
			}
		},1);
	},
	init: function(){
		$('#navTool > .guides > div').each(function(key, value){
			var logoHeight = 146;
			var bottomSpace = 200;
			var lineHeight = ($(this).parent().height() - logoHeight - bottomSpace) / $(this).parent().children().length * (key+1); //height between destination points
			var lineWidth = $(this).parent().width() / $(this).parent().children().length;
			var offsetTop = logoHeight;
			var offsetLeft = lineWidth * key;

			//drawing lines
			$(this).css({width: lineWidth, height: lineHeight, left: offsetLeft, top: offsetTop, zIndex: $(this).parent().children().length-key});

			//aligning texts
			if(key < $(this).parent().children().length/2){
				var fl = 'left';
			}else{
				var fl = 'right';
			}
			$('.name', this).css({'float': fl});
		});
	},
	calcLines: function(){
		$('#navTool > .guides > div').each(function(key, value){
			guides.calcLine(this, key);
		});
	},
	calcLine: function(line, key){
		var topic = $('#page').children()[key+1];
		
		if(!topic)topic=$('#page').children()[0]; //lazy fix to calculate "dummy" lines in content pages.
		
		var topicHeight = $(topic).height();
		var s0 = $(topic).offset().top;
		var s1 = $(topic).offset().top + topicHeight;
		var s = $(window).scrollTop()+$(window).height();
		var f;

		if(s >= s0 && s <= s1){
			f = (s-s0) / topicHeight;
		}else{
			if(s >= s1){
				f = 1;
			}else{
				f = 0;
			}
		}

		//highliting dots and names
		if(f >= 1){
			$('.dot, .name', line).addClass('active');
		}else{
			$('.dot, .name', line).removeClass('active');
		}

		$('.orange', line).css({height: Math.floor(f*100)+'%'});
		$('.blue', line).css({height: Math.ceil((1-f)*100)+'%'});
	},
	bindScroll: function(){
		//binding onscroll for current line
		$(window).scroll(function(){
			guides.calcLines();
		});
	},
	bindResize: function(){
		//recalculate lines when resizing window
		$(window).resize(function(){
			guides.init();
			$(window).trigger('scroll');
		});
	},
	highlite: function(index){
		//disable all
		$('#navTool > .guides > div').each(function(key, value){
			$('.orange', this).css({height: 0});
			$('.blue', this).css({height: '100%'});
			$('.dot, .name').removeClass('active');
		});
		
		//enable only needed
		$('.orange', $('#navTool > .guides > div')[index]).css({height: '100%'});
		$('.blue', $('#navTool > .guides > div')[index]).css({height: 0});
		$('.dot, .name', $('#navTool > .guides > div')[index]).addClass('active');
	}
}

