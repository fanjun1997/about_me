var lk=lk||{};
(function(){
	
	myopen=function(){
            var hash = window.location.hash;
		hash=hash.replace(/^#/, "");
	    if(hash){
	    //	this.getAtc(hash);
	    }
	}
	myopen.prototype.getAtc=function(href){
		if(/^video:[0-9]+$/.test(href)){
			$('#myvideoboxs').fadeIn();
//			window.location.hash=href;
                        href=href.replace("video:", "");
                        if($(".video_box[data-id="+href+"]").length>0){
                            var data_str=$(".video_box[data-id="+href+"]").html();
                            data_str=data_str.replace(/&lt;/g, "<");
                            data_str=data_str.replace(/&gt;/g, ">");
                            data_str=data_str.replace(/&quot;/g, '"');
                            data_str=data_str.replace(/&amp;/g, '&');
                            data_str=data_str.replace(/&#039;/g, "'");
                            if(/height/.test(data_str)){
                                data_str=data_str.replace('height="100%"', 'height="500px"');
                            }else{
                                data_str=data_str.replace('allowfullscreen="true"', 'allowfullscreen="true" width="100%" height="500px"');
                            }
                            $.topvideo(data_str);
                        }
		}
		else if(/^form:[0-9]+$/.test(href)){
//			window.location.hash=href;
			$.getJSON('/home/form/ajax_detail',{'fid':href},function(d){
				if(d.status){
					$.topform(d);
				}else{
					$.topmsg(d.msg);
				}
			});
		}
		else if(/^image:.+$/.test(href)){
//			window.location.hash=href;
			var image_href=href.replace(/image:/, "");
			$.topimg(image_href);
		}
                else if(/block/.test(href)){
                        var bid='#'+href.replace(/block:/, "");
                        if($(bid).length==0){
                            console.log(bid+'not find');
                            return;
                        }
                        $('html, body').animate({
                          scrollTop: $(bid).offset().top
                        }, 600);
                }
		else if(/^web_page.+$/.test(href)){
			window.open('/home/myweb/smartyurl/target/'+href,'_blank'); 
		}
		else if(/^chat.*$/.test(href)){
			if($(".mychatbox").length==0){
				var d=$('<script class="mychatbox" src="/Public/js/mytool/mychat.js"></script>');
				$('body').prepend(d);
			}
			
			var uid = $('#my_data_box').attr('data-uid');
			$.topmsg('加载中...',0);
			
			$.getJSON('/home/chat/ajax_detail',{'uid':uid},function(d){
				$.topmsg('').hide();
				
				var mychat=new lk.mychat({
					'get_user_url':'/home/user/check_login',
					'show_up_type':'center',
					'call_kefu_url':'/home/chat/call_kefu/appid/'+d.uid,
					'room_id':d.uid,
					'appid':d.uid,
					'id_type':'user',
					'kefu':{
						'avatar':d.kefu.avatar,
						'name':d.kefu.name,
						'welcome':d.kefu.welcome
					}
				});
				mychat.init();
			});
		}
		else if(/[0-9]+_([a-z|A-Z|0-9])+$/.test(href)){
			window.location.hash=href;
			lk.myatc.pop_atc(href);
		}
	}
	myopen.prototype.hideHash=function(){
		window.location.hash='';
	}
	
	myopen.prototype.init=function(){
		var self=this;
		
		$('.js-my-replace-txt').each(function(){
			if($(this).attr('data-is_del')=='1'){
				if($(this).attr('data-map-p')!=''&&$(this).attr('data-map-p')!=undefined){
					$(this).parents('.'+$(this).attr('data-map-p')).remove();
				}
				$(this).parent().remove();
				$(this).remove();
			}
			
			if($(this).attr('data-href')!=undefined&&$(this).attr('data-href')!=''){
				$(this).css("cursor","pointer");
			}
		});
		$('.js-my-replace-img').each(function(){
			if($(this).attr('data-is_del')=='1'){
				if($(this).attr('data-map-p')!=''&&$(this).attr('data-map-p')!=undefined){
					console.log($(this).attr('data-map-p'));
					$(this).parents('.'+$(this).attr('data-map-p')).remove();
				}
				$(this).remove();
			}
		});
		$('.js-myicon').each(function(){
			if($(this).attr('data-is_del')=='1'){
				if($(this).attr('data-map-p')!=''&&$(this).attr('data-map-p')!=undefined){
					$(this).parents('.'+$(this).attr('data-map-p')).remove();
				}
				if($(this).parent().children().length==1){
					$(this).parent().remove();
				}
				$(this).remove();
			}
		});
		
		$('.js-my-hide-item').remove();
		
		$('.js-my-replace-txt').click(function(e){
			if($(this).parent('a').length==0){
				if ( e && e.stopPropagation ) {
				    e.stopPropagation(); 
				}else{ 
				    window.event.cancelBubble = true; 
				}
			}
			if($(this).attr('data-href')!=undefined&&$(this).attr('data-href')!=''){
				var str=$(this).attr('data-href');
//				if(str.indexOf('://')>0||str.indexOf('http')>0){
				if(str.indexOf('http')==0){
					window.open($(this).attr('data-href'),"_blank"); 
				}else{
					self.getAtc($(this).attr('data-href'));
				}
			}
		});
		
		$('.js-my-kefu').click(function(){
			var str='';
			if($(this).attr('data-pop')!=''&&$(this).attr('data-pop')!=undefined){
				str+=$(this).attr('data-pop');
			}
			if($(this).attr('data-popimg')!=''&&$(this).attr('data-popimg')!=undefined){
				str+=('<img src="'+$(this).attr('data-popimg')+'">');
			}
			if(str){
				str=str.replace(/[\r\n]/g, "<br>");
				$.alert({content:str,closeIconClass:'iconfont iconguanbi myciconguanbi',confirmButton:'','btnCss':'background-color:#f9f9f9;color:#546E7A;' });
			}
				
		});
		
		$('.js-myicon').click(function(){
			if($(this).attr('data-href')!=undefined&&$(this).attr('data-href')!=''){
				var str=$(this).attr('data-href');
				if(str.indexOf('://')>0||str.indexOf('http')>0){
					window.open($(this).attr('data-href'),"_blank"); 
				}else{
					self.getAtc($(this).attr('data-href'));
				}
			}
		});
		
                $('.myiconfont').click(function(){
			if($(this).attr('data-href')!=undefined&&$(this).attr('data-href')!=''){
				var str=$(this).attr('data-href');
				if(str.indexOf('://')>0||str.indexOf('http')>0){
					window.open($(this).attr('data-href'),"_blank"); 
				}else{
					self.getAtc($(this).attr('data-href'));
				}
			}
		});
		
                
		$('.js-my-replace-img').click(function(){
			
			if($(this).attr('data-href')!=undefined&&$(this).attr('data-href')!=''){
				var str=$(this).attr('data-href');
				
				if(str.indexOf('://')>0||str.indexOf('http')>0){
					window.open($(this).attr('data-href'),"_blank"); 
				}else{
					self.getAtc($(this).attr('data-href'));
				}
			}
			
		});
		
		if($('#my_data_box_topmsg').text()!=''){
			var str = $('#my_data_box_topmsg').text();
			$.alert({content:str,closeIconClass:'iconfont iconguanbi myciconguanbi',confirmButton:'','btnCss':'background-color:#f9f9f9;color:#546E7A;' });
		}
		
		$('.js-my-common-close').click(function(){
			$(this).parents('.my-parents-box').hide();
		});
		
		var max_ht=0;
		$('.autoadjustht').each(function(){
			var nht = parseInt($(this).css('height'));
			console.log(nht);
			
			if(nht>max_ht){
				max_ht=nht;
			}
		});
		
		$('.autoadjustht').each(function(){
			$(this).css('height',max_ht+'px');
		});	
	}

	lk.myopen = myopen ;
})();
var myopen=new myopen();		
myopen.init();