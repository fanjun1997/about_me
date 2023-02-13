(function(){
	var sid;
	jQuery.topmsg=function(msg,sleep,param,animate){
                $(".sl_topmsg").remove();
                if(typeof(param)=='string'){
                    param={'icon':param};
                }
                if(param==undefined){
                    param={};
                }
		if(isNaN(sleep)){
                    if(/^加载中/i.test(msg)){
                        sleep=20000;
                        param.animate=true;
                    }else{
                        if(msg.length<=20){
                            sleep=3000;
                        }else if(msg.length<=50){
                            sleep=5000;
                        }else{
                            sleep=10000;
                        }  
                    }
		}
                if(param.bgcolor==undefined){
                    param.bgcolor='#fff';
                }
                if(param.ftcolor==undefined){
                    param.ftcolor='#000';
                }
                if(param.icon_color==undefined){
                    param.icon_color='#eb586f';
                }
                if(param.icon==undefined){
                    param.icon='';
                }
                if(param.animate!=undefined){
                    var load_icon='<div class="spinner"></div>';
                }else{
                    var load_icon='';
                }
                if(param.outstyle!=undefined){
                    var outstyle='height: 100vh;width: 100%;background: #000000bf;position: fixed;z-index: 99999;';
                }else{
                    var outstyle='';
                }
		var tpl=
		'<style type="text/css" class="sl_topmsg">'+
		'.flash-wrapper {position: fixed;color:#fff;z-index: 9999999999;width:100%;top:25%;overflow: visible;}'+
                '.js_closethistipbtn{position: absolute;width: 30px;height: 30px;float: right;text-align: center;right: 0;top: 0;line-height: 30px;cursor: pointer;}'+
		'.js_closethistipbtn:hover{color:'+param.icon_color+'}'+
               '#sl_topmsg_body{'+
		'    position: relative;'+ 
		'    background: none repeat scroll 0% 0% '+param.bgcolor+';'+ 
		'    font-size: 16px ;margin:auto;'+
		'    padding:30px;'+
		'    color:'+param.ftcolor+';'+ 
		'    border-radius: 4px;'+ 
		'	border: 1px solid #fff;'+
    	'	box-shadow: 8px 8px 10px rgba(0,0,0,.6);'+
    	'	overflow: visible;'+
		'}@media (max-width: 600px) {#sl_topmsg_body{width:90%}}@media (min-width: 600px) {#sl_topmsg_body{width:500px}}'+
                '.spinner {width: 60px;height: 60px;background-color:'+param.icon_color+';margin: 50px auto;-webkit-animation: rotateplane 1.2s infinite ease-in-out;animation: rotateplane 1.2s infinite ease-in-out;}'+
                '@-webkit-keyframes rotateplane {0% { -webkit-transform: perspective(120px) }50% { -webkit-transform: perspective(120px) rotateY(180deg) }100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }}'+
                '@keyframes rotateplane {0% {transform: perspective(120px) rotateX(0deg) rotateY(0deg);-webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)} 50% {transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);'+
                '-webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)} 100% {transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);-webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);'+
                '}}'+
		'</style>'+
		'<div id="outtopmsgdiv" class="sl_topmsg" style="'+outstyle+'"><div id="sl_topmsg" title=""  class="sl_topmsg flash-wrapper my-not-act">'+
		' 	<div id="sl_topmsg_body" class="flash-base my-not-act"><div class="js_closethistipbtn" style=""> × </div>'+load_icon+'<icon style="float:left;font-size:28px;color:'+param.icon_color+'" class="iconfont iconclass '+param.icon+' "></icon><div style="float:left;padding:5px;"  class="html_box"></div><div style="clear:both;"></div></div>'+
		'</div></div>';
			var d=$('.sl_topmsg');
			if(d.length==0){
				d=$(tpl);
				$('body').prepend(d);
			}else{
				d.show();
			}
			$('#sl_topmsg_body .html_box').html(msg);
                        
			if(sid){
				d.show();
				clearTimeout(sid);
			}
                        var wt=1000;
			if(sleep!=0){
				sid=setTimeout(function(){
					d.fadeOut('show',function(){
						$('#sl_topmsg_body').html();
						d.hide();
					});
				},sleep);
			}else{
                           d.show();
			}
                        if(animate){
                            var bf=$("#sl_topmsg").css('top');
                            $("#sl_topmsg").css('top',"-1000px");
                            $("#sl_topmsg").animate({top:""+bf+""});
                        }
                        
                        $('#sl_topmsg').dblclick(function(){
                                d.hide();
                        });
                        $(".js_closethistipbtn").click(function(){
                                d.hide();
                        });
			return {
				set_time:function(sleep){
					if(sid){
						clearTimeout(sid);
					}
					if (sleep != 0) {
						sid = setTimeout(function(){
							d.fadeOut('show', function(){
								$('#sl_topmsg_body').html();
								d.hide();
							});
						}, sleep);
					}
				},
				hide:function(){
					if(sid){
						clearTimeout(sid);
					}
                                        $("#outtopmsgdiv").remove();
					d.remove();
				},
				clickhide:function(){
					$('#sl_topmsg').click(function(){
						d.hide();
					});
				}
			}
		}
                jQuery.tip_reload=function(msg,sleep,param,animate){                   
                    $.topmsg('操作成功！正在刷新,这可能需要几秒钟哦~',false,{'animate':true,'outstyle':true});
                    window.location.reload();
                }
	jQuery.topimg=function(src,sleep){
		if(isNaN(sleep)){
			sleep=100000;
		}
		var ht = document.documentElement.clientHeight  ;
		var wt = document.body.clientWidth ;
		var dfimg = '/Public/image/df/cvloading.png';
		
		var tpl=
		'<div id="sl_topimg" style="position:fixed;top:0;left:0;width:'+wt+'px;height:'+ht+'px;line-height:'+ht+'px;text-align:center;vertical-align:middle;background-color:#333;z-index:999999999999" class=" my-not-act">'+
                '<div class="js_close_toptip" style="position:fixed;right:0;top:0;width: 50px;height: 50px;color: #fff;line-height: 50px;font-size: 30px;cursor: pointer;">×</div>'+
		'	<img id="sl_topimg_body" style="max-width:100%;max-height:100%;margin:auto;" src="'+dfimg+'"></img>'+
		'	<div id="sl_topimg_tips">加载中...</div>'+
		'</div>';
			$('.sl_topimg').remove();
			var d=$('.sl_topimg');
			if(!d.length){
				d=$(tpl);
				$('body').prepend(d);
			}
			d.show();
			var tmpimg=new Image();
			tmpimg.src=src;
			tmpimg.onload=function(){
				$("#sl_topimg_body").attr('src',src);
				$("#sl_topimg_tips").remove();
			}
			
			$('.js_close_toptip').click(function(){
				$('#sl_topimg_body').attr('src',dfimg);
				$("#sl_topimg_tips").text('');
				d.remove();
			});
		}
	
	jQuery.topvideo=function(src){
		var ht = document.documentElement.clientHeight  ;
		var wt = document.body.clientWidth ;
		
		var tpl=
		'<div id="myvideoboxs" style="display:none;height: 100%;background-color:#333;position: fixed;width: 100%;top: 0;z-index: 999999;">'+
                '<div class="js_close_toptip" style="position:fixed;right:0;top:0;text-align:center;width: 50px;height: 50px;color: #fff;line-height: 50px;font-size: 30px;cursor: pointer;">x</div>'+
		'	<div class="myvideocontent" style="min-height: 400px;width: '+(wt>=600?70:100)+'%;margin-top: 120px;margin: auto;margin-top: 80px;background-color:#000;"></div>'+
		'</div>';
			$('#myvideoboxs').remove();
			var d=$('#myvideoboxs');
			if(!d.length){
				d=$(tpl);
				$('body').prepend(d);
			}
			$('.myvideocontent').html(src);
			d.show();
			
			$('.js_close_toptip').click(function(e){
				$('#myvideoboxs').find('.myvideocontent').html('');
                                $('#myvideoboxs').remove();
			})
		}
	
	jQuery.topatc=function(data,data_type){
		var ht = document.documentElement.clientHeight  ;
		var wt = document.body.clientWidth ;
		if(data_type==''){
                    data_type='json';
                }
                var color='#eb586f';
		var tpl='<div id="myatcboxs" class="mynicescroll" style="display:none;position: fixed;top: 0;width: 100%;background-color:#aaaa;z-index: 9999999;overflow-y: scroll;">'+
					'<div class="myactbox_center_box" style="width:75%;top:15px;position:relative;margin:auto;min-height: 150px;background-color: #fff;box-shadow:0 0 2px rgba(0, 0, 0, 0.55), 0 2px 4px rgba(0, 0, 0, 0.28);" >'+
                                                '<div id="myatcback" class="js_myatcback" style="position:fixed;right:0;top:0;width: 50px;height: 50px;background-color:'+color+';color: #fff;line-height: 50px;font-size: 30px;cursor: pointer;">×</div>'+
						'<div class="myactbox_center_ct_box" style="width: '+(wt>=600?95:100)+'%;margin: auto;">'+
							'<div class="mycomtit" style="padding: 15px 0px;width: 100%;font-size: 24px;font-weight: 600;color:#333;">加载中。。。</div>'+
							'<div class="mytagsay" style="width:100%;height:40px;line-height:40px;">'+
								'<div style="float:left;color:#666;" id="myatc_time"></div>'+
								'<div style="float:right;color:#666;" id="myatc_tags"></div>'+
								'<div style="clear:both;"></div>'+
							'</div>'+
							'<div class="mycomcontent" style="color:#555;border-top: 2px #ececec solid;padding: 15px 0;min-height: 500px;" >加载中...</div>'+
							'<div style="height:100px;padding-top:25px;border-top: 2px #ececec solid;"><a class="js_myatcback" style="float:right;color:#333;font-size:18px;" href="javascript://">返回 &nbsp;&nbsp;</a><div style="clear:both;"></div></div>'+
						'</div>'+
					'</div>'+
				//	'<div style="height:200px;text-align:right;">返回</div>'+
				//	'<div id="myatcback" class="js_myatcback" style="position: fixed;right: 50px;bottom: 30px;width: 60px;height: 60px;line-height: 60px;border-radius: 30px;border: 1px solid #888;color: #333;background-color: #fff;text-align: center;cursor: pointer;" >返回</div>'+
				'</div>';
		
			$('#myatcboxs').remove();
			var d=$('#myatcboxs');
			d=$(tpl);
			$('body').prepend(d);
                        
			if(data_type=='html'){
                            d.find('.mycomtit').remove();
                            d.find('.mycomcontent').html(data);
                        }else{
                            d.find('.mycomtit').html(data.title);
                            d.find('.mycomcontent').html(data.content);

                            d.find('#myatc_time').html(data.time);
                            d.find('#myatc_tags').html(data.tag);
                        }
			
			d.css('left',-wt+'px');
			d.show();
			d.animate({left:"0px"});
			d.click();
			$('.js_myatcback').click(function(e){
				d.animate({left:2*wt+'px'},function(){
					d.remove();
					window.location.hash='';
				});
			})
			$('.js_my_tag_list').click(function(e){
				d.find('.mycomtit').html($(this).text());
				d.find('.mycomcontent').html('<p><a>sdfsadf</a></p><p><a>sdfsadf</a></p><p><a>sdfsadf</a></p>');
			})
			
		}
	jQuery.top_getatc=function(url,data_type){
            if(data_type=='html'){
                $.get(url,{},function(d){
                    $.topatc(d,data_type);
                });
            }else{
                $.getJSON(url,{},function(d){
                    $.topatc(d,data_type);
                });
            }	
        }
	jQuery.topform=function(data){
		var ht = document.documentElement.clientHeight  ;
		var wt = document.body.clientWidth ;
		
		var tpl=''+
			'<div id="my-form-sub-box" class="my-said-replace-box my-parents-box" style="display:none;z-index:999999">'+
					'<div id="my-form-sub-wrap" class="my-form-pbox">'+
						'<div class="my-form-replace-wrap">'+
							'<div class="tit-my-replace">'+
								'<div class="fleft" style="width:435px;float:left;">'+
									'<b class="my-rptit"></b>'+
								'</div>'+
								'<div class="fright js-my-repalce-cancel my-not-act js-my-common-close">'+
									'关闭'+
								'</div>'+
								'<div style="clear:both;"></div>'+
							'</div>'+
							'<div class="my-form-content"></div>'+
							'<div>'+
								'<div class="my-ftbtnbssg js-my-form-sub my-not-act" title="">提交</div>'+
								'<div style="clear:both;"></div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>';
			$('#my-form-sub-box').remove();
			var d=$('#my-form-sub-box');
			d=$(tpl);
			
			$('body').prepend(d);
			d.find('.my-rptit').html(data.title);
			
			d.find('.js-my-form-sub').attr('data-form_id',data.form_id);
			d.find('.my-form-content').html(data.data);
			d.show();
			
			$('.js-my-form-sub').click(function(){
				var p=$(this).parents('.my-form-pbox');
				var axs=[];
				var auth=true;
				$('.my-form-input').each(function(){
					var d={};
					d.val=$(this).val();
					d.key=$(this).attr('data-key');
					
					if(d.val!=''){
						axs.push(d);
					}else{
						$.topmsg('请填写'+$(this).attr('title'));
						auth=false;
						return;
					}
				});
				$('#my-form-sub-wrap').find('.my-form-sel').each(function(){
					var d={};
					d.val=$(this).val();
					d.key=$(this).attr('data-key');
					
					if(d.val!=''){
						axs.push(d);
					}else{
						$.topmsg('请选择'+$(this).attr('title'));
						auth=false;
						return;
					}
				});
				if(!auth){
					return;
				}
				
				$.post('/home/form/sub',{'at':easyh5s(),'d':axs,'form_id':$(this).attr('data-form_id')},function(d){
					if(d.status){
						$.topmsg('提交成功!');
						$('#my-form-sub-box').hide();
					}else{
						$.topmsg(d.msg);
					}
				},'json');
			});
			
			
			d.find('.js-my-common-close').click(function(e){
				d.fadeOut(500,function(){
					d.remove();
				});
			})
		}
	
})(jQuery)