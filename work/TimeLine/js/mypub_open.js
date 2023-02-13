var lk = lk || {};

(function(){
	pubopenrun=function(){
		
		
	}
        pubopenrun.prototype.lekcc=function(k){
           var carr=[
			    	'#cf0070','#a1d8e6',
			        '#7c509d','#f29b87','#22aee6',
			        '#ffbd50','#004098','#625a05',
			        '#008e57','#ea5520','#854d62',
			        'rgb(230,27,100)','rgb(220,90,111)',
			        'rgb(247,200,207)','rgb(234,85,32)','rgb(229,169,10)',
			        'rgb(0,142,87)','rgb(161,216,230)','rgb(34,174,230)'
			    ];
            if(k<=carr.length){
                return carr[k];
            }else{
                return carr[0];
            }            
        }
	pubopenrun.prototype.init=function(){
            var ua = navigator.userAgent.toLowerCase();
            if($("video").length>0){
                if(ua.match(/MicroMessenger/i)=="micromessenger") {              
                    $("video").attr('autoplay',"no");
                    $("video").attr('controls',"controls");
                } 
            }
            $("body").append("<div style='display:none;' id='cdnjsloadok'></div>");
            $("a").click(function(){
                if(!$(this).hasClass('not_topmsg') && $(this).attr('href')!=undefined && $(this).attr('target')!='_blank' && !/javascript/.test($(this).attr('href')) && !/^#/.test($(this).attr('href')) ){
                    $.topmsg('加载中...');
                };
            });

            
            $(".js_mywebmbnav").click(function(){
                $(".mobile-menu").toggle();
            });
            
            $(".js_close_nav").click(function(){
                $(".mobile-menu").hide();
            });
            
		//返回顶部公共js
            var offset = 200;
            var duration = 500;
            
            try{
                if(sl!=undefined){
                    var my_pop_ope = new sl.app.my_pop_ope();
                }
            }catch(e){
                
            }

            function scroll_down_style(){
                $('.scrolltopcgcc').css('background-color',$('.scrolltopcgcc').attr('data-bgcc'));
                if($('.scrolltopcgcc a').attr('data-bfftcc')==undefined){
                    $('.scrolltopcgcc a').attr('data-bfftcc',$('.scrolltopcgcc a').css('color'));
                }
                $('.scrolltopcgcc a').css('color',$('.scrolltopcgcc').attr('data-ftcc'));
            }
            function scroll_top_style(){
                $('.scrolltopcgcc').css('background-color','');
                $('.scrolltopcgcc a').css('color',$('.scrolltopcgcc a').attr('data-bfftcc'));
            }
            function sm_scrolltop_event($topoffset){
                if($topoffset>offset){
                    $('.back-to-top').fadeIn(400);
                    $('.scrolltopshow').fadeOut();
                    scroll_down_style();
                }else{
                    $('.back-to-top').fadeOut(400);
                    $('.scrolltopshow').fadeIn();
                    scroll_top_style();
                }
            }
            sm_scrolltop_event($(this).scrollTop());
            $(window).scroll(function() {
                sm_scrolltop_event($(this).scrollTop());
            });
            //????
            $(".js_mystdmbshownav").each(function(){
                if($(this).hasClass('bindClick')){
                    return;
                }
                $(this).bind('click',function(){
                    console.log($(".navitemsbox").css('display'));
                    if($(".navitemsbox").css('display')=='none'){
                        $(".navitemsbox").css('margin-top','-600px');
                        $(".navitemsbox").show();
                        $(".navitemsbox").animate({'margin-top':"0px"});
                        $(".navitemsbox").click();
                        scroll_down_style();
                    }else{
                        if(parseInt($('body').width())<700){
                            $(".navitemsbox").fadeOut();
                        }
                    }
                });
                $(this).addClass('bindClick');
            });
            
            $(".js_myclosenav").each(function(){
                if($(this).hasClass('bindcClick')){
                    return;
                }
                $(this).bind('click',function(){
                    if(parseInt($('body').width())<700){
                        $(".navitemsbox").fadeOut();
                    }
                });
                $(this).addClass('bindcClick');
            });

		
		$('.js_to_edit').click(function(){
			var href=$(this).attr('data-href');
			$.confirm({
			    content: '<b>该页面已经上线，重新编辑后记得点击“发布更新”更新覆盖线上版本哦</b>',
			    confirm: function(){
			    	window.location.href=href;
			    }
			});
		});

		$('.js-free-apply').click(function(){
			$.alert('您在本站注册成功后，绑定手机号或者邮箱号，在用户中心“我的身份”里填写资料，并勾选免费试用后提交身份验证，名额有限，科技类，实体产业类，小微企业，工作室优先！');
			
		});
		
		$('.js_myscc').click(function(){
//			$('#mysstip').show();
//			setTipText();
		})
		$('.js_myscc').hover(function(){
//			$('#mysstip').show();
//			setTipText();
		},function(){})
		
		function GetQueryString(name){
			   var reg=eval("/"+name+"/g");
			   var r = window.location;
			   var flag=reg.test(r);
			   if(flag){
			        return true;
			   }else{
			       return false;
			   }
		}
		
		$('.myclosecctip').click(function(){
			$('#mysstip').hide();
		})
		$('#mysstip').hover(function(){
		},function(){$('#mysstip').hide();})
		
		if(GetQueryString("colorshow") || GetQueryString("privacy")  || !GetQueryString("home") || GetQueryString("demo")  ){
			$('#mysstipbox').hide();
		}else{
		//	$('#mysstipbox').show();
		}

	}

	lk.pubopenrun = pubopenrun ;
})();
var pubopenrun=new pubopenrun();		
pubopenrun.init();