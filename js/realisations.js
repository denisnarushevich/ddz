$(function(){
	//tampion for nav lines.
	guides.init();
	guides.calcLines();
	guides.bindResize();
	guides.highlite(1);
	
	
	
	//menus
	//bind on click
	$('#realisations .roundBox > a').each(function(keyClicked, value){
		$(this).click(function(){
			$('#realisations .roundBox > .sub > div').each(function(key, value){
				if(key != keyClicked){
					$(this).hide();
				}else{
					$(this).show();
				}
			});
		});
	});
	//show first on startup
	$($('#realisations .roundBox > a')[0]).trigger('click');
	
	//inputs onclick
	$('input[type=text], textarea').focus(function(){
		$(this).attr('plchldr', $(this).val());
		$(this).val('');
		
		$('input[type=text], textarea').blur(function(){
			if($(this).val() == ''){
				$(this).val($(this).attr('plchldr'));
			}
		});
	});
	
});