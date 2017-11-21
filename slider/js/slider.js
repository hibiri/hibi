function slider(v){
	if(!v) return;
	if(!v.$obj) return;
	if(!v.w) v.w = v.$obj.width();
	if(!v.h) v.h = v.$obj.height();
	if(!v.auto) v.auto = false;
	if(!v.naviStep) v.naviStep = false;
	if(!v.naviNum) v.naviNum = false;
	if(!v.alpha) v.alpha = false;
	var naviHTML = '', controller = '', curIndex = 0, autoHTML = '';
	var bannerW = v.w;
	var $panel = v.$obj.children();
	var $item = $panel.find("li");
	var bannerList = $item.length;
	v.$obj.css({"width" : v.w+"px", "height" : v.h+"px"});
	$item.css({"width" : v.w+"px", "height" : v.h +"px"});
	$panel.width(bannerW * bannerList);
	if(v.naviStep){
		controller = '<div class="controller"><a href="#" class="prev">prev</a><a href="#" class="next">next</a></div>';
		v.$obj.prepend(controller);
	}
	if(v.naviNum){
		$item.each(function(i){ naviHTML += '<a href="#" class="num'+(i+1)+'">' +(i+1)+ '번째 배너</a>'; });
		$panel.before('<div class="navi">' + naviHTML + '</div>');
	}
	if(v.alpha){
		v.$obj.addClass("alpha");
	}
	var $navi = v.$obj.find(".navi a");
	var showNavi = function(nIndex){
		$navi.eq(curIndex).removeClass("cur");
		$navi.eq(nIndex).addClass("cur");
	}
	var showBanner = function(nIndex){
		var nPos = -bannerW * nIndex;
		showNavi(nIndex);
		$panel.stop().animate({"left":nPos}, 800);
		curIndex = nIndex;
	}
	var alphaBanner = function(nIndex){
		showNavi(nIndex);
		$item.stop().animate({"opacity":0}, 800);
		$item.eq(nIndex).stop().animate({"opacity":1}, 800);
		curIndex = nIndex;
	}
	var nextBanner = function(){
		var nIndex = curIndex + 1 ;
		if(nIndex >= bannerList) nIndex = 0 ;
		if(v.alpha){alphaBanner(nIndex)}else{showBanner(nIndex)};
		startBanner();
	}
	var timer = false;
	var stopBanner = function(){
		if(timer) clearInterval(timer);
		timer = false;
	}
	var startBanner = function(){
		if(timer) clearInterval(timer);
		timer = setInterval(nextBanner, 5000);
	}
	if(v.auto){
		autoHTML = '<div class="auto"><a href="#" class="start">시작</a><a href="#" class="stop">정지</a></div>';
		v.$obj.prepend(autoHTML);
		startBanner();
	}
	showNavi(0);
	v.$obj.find(".prev").click(function(){ var nIndex = curIndex - 1 ; if(nIndex < 0) nIndex = bannerList - 1 ; if(v.alpha){alphaBanner(nIndex)}else{showBanner(nIndex)}; startBanner(); return false; });
	v.$obj.find(".next").click(function(){ nextBanner(); return false; });
	$navi.click(function(){ var nIndex = $navi.index(this) ; if(v.alpha){alphaBanner(nIndex)}else{showBanner(nIndex)}; startBanner(); return false; });
	v.$obj.find(".stop").click(function(){ stopBanner(); $(this).hide(); v.$obj.find(".start").show(); return false; });
	v.$obj.find(".start").click(function(){ startBanner(); $(this).hide(); v.$obj.find(".stop").show(); return false; });
}