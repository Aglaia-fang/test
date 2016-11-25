var d=document.documentElement.clientWidth;
	document.getElementsByTagName('html')[0].style.fontSize=d/375*625+"%";
var swiper=new Swiper(".swiper-container",{
	//loop:true
})

var str="ABCDE",
	arr=str.split('');
//ajax渲染
aj(); //渲染数据到页面
function aj(){
	$.ajax({
		url:"data.json",
		type:"get",
		success:function(e){
			var str="",str1="";
			for(var i=0;i<5;i++){
				for(var j in e[i]){
					str+="<div class='content'>"
							+"<p>"
								+"<span><b>"+arr[i]+"</b>计划</span>"
								+"<span><em>"+e[i][j].id+"第"+e[i][j].qi+"期</em><em>借款金额 "+e[i][j].jine+"元</em></span>"
							+"</p>"
							+"<p>"
								+"<span>"
									+"<b>年化利率</b>"
									+"<b>"+e[i][j].nianhualv+"<i>%</i></b>"
								+"</span>"
								+"<span>"
									+"<b>借款期限</b>"
									+"<b>"+e[i][j].qixian+"<i>个月</i></b>"
								+"</span>"
								+"<span>"
									+"<b>起投金额</b>"
									+"<b>"+e[i][j].qitou+"<i>元</i></b>"
								+"</span>"
							+"</p>"
							+"<button>"+e[i][j].state+"</button>"
						+"</div>";
				}
				$('li').prepend(str)
			}
		},
		error:function(){
			alert('请求失败')
		}
	})
}
//swiper滑动 改变头部的样式
var main_s=document.getElementById('main_s'),
	s_w;
main_s.addEventListener("touchstart",sFn,false);
main_s.addEventListener("touchmove",mFn,false);
function sFn(e){
	s_w=e.touches[0].clientX;
}
function mFn(e){
	var m_w=e.touches[0].clientX,
		offset=m_w-s_w;
	if(offset>30){
		$("#header>span").eq(0).addClass('bg').siblings().removeClass("bg");
		$("#main").scrollTop(0);
	}else if(offset<-30){
		$("#header>span").eq(1).addClass('bg').siblings().removeClass("bg");
		$("#main").scrollTop(0);
	}
}

//滚动加载
_scroll()
function _scroll(){
	var main_h=$("#main").height();
	$("#main").on("scroll",function(){
		var height=$("#main_s").height(),
			s_t=$('#main').scrollTop(),
			_top=s_t+main_h;
		if(_top==height){
			$(".load").show();
			setTimeout(function(){
				aj();
				$(".load").hide();
			},2000)	
		}
	})
}