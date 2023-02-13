var sl=sl||{};
sl.app=sl.app||{};

(function (){
	function my_pop_ope(){
		
		this.editor_arr=[];
                this.hashprint='';
                this.param={};
	}
	my_pop_ope.prototype.set_param=function (param){
		this.param=Object.assign(this.param,param);
	}
	my_pop_ope.prototype.pop_wrap=function (param){
		
		var ht = document.documentElement.clientHeight  ;
		var wt = document.body.clientWidth ;
		
		if(param.content==undefined){
			param.content='';
		}
		
		if(param.color==undefined){
			if(this.param.color!=undefined){
				param.color=this.param.color;
			}else{
				param.color='#e63d4f';
			}
		}
		if(param.url==undefined){
			console.log('please set the url');
			return;
		}
		if(param.zindex==undefined){
			param.zindex=999999;
		}
		if(param.bdrd==undefined){
			param.bdrd='5px';
		}
                if(param.showup_type==undefined){
                    param.showup_type='top';
                }
                var view_size=60;
                if(param.view_size!=undefined){
                    view_size=param.view_size;
                }
                var mtop=100;
                if(view_size>90){
                    mtop=10;
                }
                
		var tpl=''+
			'<style class="js_mypop_allbox js_mypop_allbox_css">'+
				'.my-form-sub-box{height: 100%;position: fixed;width: 100%;top: 0;background:#aaaa;overflow-y: scroll;}'+
				'#my-form-sub-wrap{margin:100px auto;padding:0px;color: #333;background-color: #f9f9f9;color: #333;border-radius: 5px;box-shadow: 0 0 4px rgba(0, 0, 0, 0.55), 0 4px 8px rgba(0, 0, 0, 0.28);}'+
				'.myformcontent{padding: 25px '+(wt<500?'0':'25px')+';padding: 25px '+(wt<500?'0':'25px')+';}'+
				'.myformtitle{font-size:18px;border-top-left-radius:'+param.bdrd+';border-top-right-radius:'+param.bdrd+';color:#fff}'+
				'@media screen and (max-width: 700px) {.myformcontent{padding: 0px};#my-form-sub-wrap{width:100%;} .tit-my-replace{width: 100%;margin: auto;} }@media screen and (min-width: 500px) and (max-width:800px) {#my-form-sub-wrap{width:90%;}}@media screen and (min-width: 800px) {#my-form-sub-wrap{width:'+view_size+'%;}}'+
				'#my-form-sub-box .my-pop-form-div input{border-radius: '+param.bdrd+';width: 99%;height:48px;border: 1px solid #eee;font-size: 16px;float: left;padding-left: 10px;}'+
				'#my-form-sub-box .my-pop-form-div {min-height: 50px;width: 100%;margin: 15px 0;}'+
				'#my-form-sub-box .my-textarea-div{margin: 10px 0;}'+
				'.my_num_ope{float:left;height:50px;line-height:50px;width:14.5%;text-align:center;background-color:#ececec;cursor:pointer}'+
				'#my-form-sub-box .rightopwrap{width: 77%;float:left;word-break: break-word;word-break: break-all}'+
				'#my-form-sub-box .myopehide{display:none;}'+
                                '@media (max-width: 700px){.myformtitle{padding:10px 5px;}}'+
                                '@media (min-width: 700px){.myformtitle{padding:18px;}}'+
				'#my-form-sub-box .iconclass{float:left;}#my-form-sub-box.no_icon_data{height: 40px;width: 92px;color: #fff;}'+
				'.my-textarea-div textarea{border: 1px solid #eee;width:99%;padding:10px;font-size: 16px;}'+
				'.my-ftbtnbssg {border-radius: '+param.bdrd+';height: 50px;text-align: center;line-height: 50px;background: #ececec;margin-top: 5px;width: 100%;}'+
				'.my-ftbtnbs:hover, .my-ftbtnbssg:hover{background-color: '+param.color+';color: #fff;cursor: pointer;}'+
				'#my-form-sub-box .my-form-abc {float: left;padding: 0 25px;}'+
				'.my-pop-form-div select{font-size: 18px;height: 50px;width:99%;min-width: 100px;border: 1px solid #eee;}'+
				'.tit-my-replace{border-bottom: 1px solid #ddd;}'+
				'.js-my-repalce-cancel svg:hover{color:'+param.color+'}'+
                                '.my-steoptdiv{margin-top:10px;border-radius: 5px;width: 100%;border: 1px solid #eee;padding: 20px;cursor:pointer}'+
                                '.my-opt_intro{background-color:#fff;margin-top:10px;border-radius: 5px;width: 100%;border: 1px solid #eee;padding: 20px;}'+
                                '.my-steoptdiv_active{background-color:#333;color:#fff}'+
				'#my-form-sub-box .bg_selectfile{background: rgba(0, 0, 0, 0) url("/Public/image/ico/up_pic.svg") no-repeat scroll 8% 50%;width: 100%;height: 50px;}'+
				'#my-form-sub-box .bg_selectfile input{cursor: pointer;opacity: 0.01;height:50px;width:100%}'+
				'#my-form-sub-box .pickr{float:left;width:99%;border: 1px solid #ececec;}'+
				'#my-form-sub-box .pcr-button{width:100%},.mycheckcode{cursor: pointer;}'+
				'.mytag_img{width:150px;float:left;margin-bottom:10px;margin-left:10px;line-height:25px;}'+
				'.myformtags{padding:0 10px;margin-bottom:10px;float:left;margin-left:10px;line-height:25px;}'+
				'.mytag_img img{width:100%;max-height: 150px;}.my-form-content{margin-top:18px}'+
				'input:focus {outline: none;border-color: '+param.color+'; box-shadow: 0 0 4px '+param.color+';}'+
				'#my-form-sub-box .js-my-upimg{cursor:pointer}'+
				'.my_pop_hide{display:none;}'+
				'.togglebox{background-color:#f1f1f1;padding: 5px 0;}'+
				'#my-form-sub-box .popimgbox,#my-form-sub-box .popvideobox{width:39%;text-align:center;float:left;margin:15px 0}'+
				'#my-form-sub-box .popimgbox img{max-width:98%;max-height:55px;}'+
                                '#my-form-sub-box .introsaid{border-radius: 5px;line-height:1.6;padding:15px;background-color:#eee;}'+
				'#my-form-sub-box .my_sel_act{border-radius: '+param.bdrd+';padding:10px 15px;text-align:center;background-color:#f0f0f0;color:#333;cursor: pointer;}'+
				'#my-form-sub-box .my_sel_act:hover,#my-form-sub-box .my_sel_isact{background-color:'+param.color+';color:#fff}'+
				'#my-form-sub-box .leftsaidtit{float:left;font-weight:600;overflow:hidden;height:50px;line-height:50px;margin-right:15px;width:19%;text-align:center;}'+
                                '#my-form-sub-box .leftsaidtit::after{content:":";font-weight:600;}'+
				(param.css==undefined?'':param.css)+
			'</style>'+
			'<div id="my-form-sub-box" class="my-form-sub-box js_mypop_allbox my-said-replace-box my-parents-box" style="z-index:'+param.zindex+'">'+
					'<div id="my-form-sub-wrap" class="my-form-pbox">'+
						'<div class="my-form-replace-wrap">'+
							'<div class="tit-my-replace myformtitle" style="background-color:'+param.color+'">'+
								'<div class="fleft tit-my-left" style="width:70%;float:left;">'+
									'<b class="my-rptit" style=""></b>'+
								'</div>'+
								'<div title="点击关闭"    style="float:right;cursor: pointer;text-align:center;" class="fright js-my-repalce-cancel my-not-act js-my-common-close">'+
									'<svg style="margin-top:3px;" fill="#fff" t="1585449871160" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2204" width="20" height="20"><path d="M959.488 964.608c-22.528 22.528-58.88 22.528-81.408 0L56.32 142.336c-22.528-22.528-22.528-58.88 0-81.408s58.88-22.528 81.408 0l822.272 822.272c22.016 22.528 22.016 58.88-0.512 81.408z" p-id="2205"></path><path d="M959.488 60.928c22.528 22.528 22.528 58.88 0 81.408L137.728 964.608c-22.528 22.528-58.88 22.528-81.408 0s-22.528-58.88 0-81.408L878.592 60.928c22.016-22.016 58.88-22.016 80.896 0z" p-id="2206"></path></svg>'+
								'</div>'+
								'<div style="clear:both;"></div>'+
							'</div>'+
							'<div class="myformcontent">'+
								'<div class="my-form-content">'+param.content+'<div style="clear:both;"></div></div>'+
								'<div style="margin-top:25px;">'+
									'<div data-where_key="'+(param.where_key==undefined?'':param.where_key)+'" data-where_val="'+param.where_val+'" data-form_url="'+param.url+'" class="my-ftbtnbssg js-my-form-sub my-not-act '+(param.sub_class==undefined?'':param.sub_class)+'">'+(param.sub_title==undefined?'确认':param.sub_title)+'</div>'+
									'<div style="clear:both;"></div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>';
		
		$('.js_mypop_allbox').each(function(){
			if($(this).attr('data-type')!='html'){
				$(this).remove();
			}
		});
		
		var d=$(tpl);
		
		
		if(param.wrap!=undefined){
			$(param.wrap).html(d);
			$('#my-form-sub-box').attr('data-type','html');
			$('#my-form-sub-box').css('position','relative');
			$('#my-form-sub-box').find('#my-form-sub-wrap').css('box-shadow','none');
			$('#my-form-sub-box').css('z-index','0');
			$('#my-form-sub-box').removeClass('my-form-sub-box');
			$('#my-form-sub-wrap').css('width','100%');
			$('#my-form-sub-box').find('.tit-my-left').css('width','100%');
			$('#my-form-sub-box').find('.tit-my-left').css('text-align','left');
			
			$('#my-form-sub-wrap').find('.js-my-repalce-cancel').remove();
			
		}else{
			$('body').prepend(d);
			
			if(param.showup_type=='top'){
				$("#my-form-sub-wrap").css('margin-top','-2999px');
				$("#my-form-sub-wrap").animate({
					'margin-top':mtop+'px'
				});
			}
			else if(param.showup_type=='left'){
				var bflft=$("#my-form-sub-wrap").css('margin-left');
				$("#my-form-sub-wrap").css('margin-left','-2999px');
				$("#my-form-sub-wrap").animate({
					'margin-left':bflft
				});
			}
                        $("#my-form-sub-box").click();
		}
		
		
		if(param.title!=undefined){
			d.find('.my-rptit').html(param.title);
		}
		if(param.url!=undefined){
			d.find('.js-my-form-sub').attr('data-form_url',param.url);
		}
		if(param.auth!=undefined && param.auth!=''){
			d.find('.js-my-form-sub').attr('data-auth',1);
		}
		if(param.msg_ok!=undefined && param.msg_ok!=''){
			
		}else{
                    param.msg_ok='提交成功';
                }
                this.param=param;
		if(param.cus_bind_event!=undefined){
			param.cus_bind_event();
		}
                
                this.bind_pop_event(param.callback==undefined?'':param.callback);
	}
	
	my_pop_ope.prototype.refresh_code = function(img){
		if(img=='')
			return;
		
		img.css('opacity',0.6);
		
		src = img.attr('data-src')+'?'+ Math.random();
		img.attr('src',src) ;
		
		img[0].onload = function(){
			img.css('opacity',1);
		}; 
	}
	
	my_pop_ope.prototype.bind_pop_event=function (callback){
		var self=this;
		
		$('.js_mypop_allbox').find('.js-my-upimg').click(function(){
			var btn=$(this);
			$.confirm({
			    content:'是否清除图片？(清除后需保存提交后才生效)',
			    confirm: function(){
			    	btn.find('img').attr('src','');
			    }
			});
		});
		
		$(".my-form-tag-img img").dblclick(function(){
			  $.alert('<img src="'+$(this).attr('src')+'">');
		});
		
		$('.js_mypop_allbox').find('.js-my-repalce-cancel').click(function(){
			$(this).parents('.js_mypop_allbox').remove();
		});
		
		$(".mycheckcode").click(function(){
			self.refresh_code($(this));
		});
		
		$('.mycheckcodeinint').click(function(){
			if($(this).attr('init')=='1'){
				return;
			}
			self.refresh_code($(this).parents('.my-pop-form-div').find('img'));
			$(this).removeClass('mycheckcodeinint');
			$(this).attr('init','1');
		});
		
		$('.js_my_num_ope').click(function(){
			var ope=$(this).attr('data-ope');
			var input=$(this).parents('.my-pop-form-div').find('.my-form-input');
			var step=input.attr('data-step');
			var max=input.attr('data-max');
			var min=input.attr('data-min');
			
			if(step==undefined||step==''){step = 1;}
			
			var num_type=input.attr('data-num_type'); // int float
			if(num_type==undefined||step==''){num_type = 'int';}
			
			if(num_type=='int'){
				var num=parseInt(input.val());
				step = parseInt(step);
				if(max!=''){
					max=parseInt(max);
				}
				if(min!=''){
					min=parseInt(min);
				}
			}else{
				var num=parseFloat(input.val());
				step = parseFloat(step);
				if(max!=''){
					max=parseFloat(max);
				}
				if(min!=''){
					min=parseInt(min);
				}
			}
			if(ope=='+'){
				var new_num=num+step;
			}else{
				var new_num=num-step;
			}
			if(max!='' && new_num>max){
				$.topmsg('不能大于'+max);
				return;
			}
			
			if(new_num<min){
				$.topmsg('不能小于'+min);
				return;
			}
			input.val(new_num);
		});
		
		$('#my-form-sub-wrap').find('.my_form_confirm').click(function(){
			var btn=$(this);
			$.confirm({
			    content:btn.attr('data-show'),
			    confirm: function(){
			    	if(btn.attr('data-confirm-url')!=''){
			    		var sub_param={};
			    		var sbubtn=$('#my-form-sub-wrap').find('.js-my-form-sub');
			    		if(sbubtn.attr('data-auth')!=''){
							sub_param.auth=wefwe();
						}
						if(sbubtn.attr('data-where_key')!=''){
							eval('sub_param.'+sbubtn.attr('data-where_key')+'="'+sbubtn.attr('data-where_val')+'"');
						}else{
							sub_param.where=sbubtn.attr('data-where_val');
						}
						var psgo=btn.parents('.my-form-tag-sel').attr('data-key');
						if(psgo!=undefined){
							eval('sub_param.'+psgo+'="'+btn.attr('data-value')+'"');
						}
						else{
							console.log('error key');return;
						}
			    		$.post(btn.attr('data-confirm-url'),sub_param,function(d){
							if(d.msg!=undefined){
								$.topmsg(d.msg);
							}
							if(d.reload!=undefined){
								window.location.reload();
							}
							if(d.skip!=undefined){
								window.location.href=d.skip;
							}
							$('.js_mypop_allbox').hide();
							if(d.status){
								$.topmsg(self.param.msg_ok);
								$('.js_mypop_allbox').remove();
								callback && callback(sub_param,d);
							}
						},'json');
			    	}else{
			    		$('#my-form-sub-wrap').find('.js-my-form-sub').click();
			    	}
			    },
			    
			});
		});
		
		$('#my-form-sub-wrap').find('.js_mytogglebtn').click(function(){
			var tg=$(this).attr('data-toggle');
			//@todo 改一下 只有同级的关闭
			$(this).parents('.rightopwrap').find('.js_mytogglebtn').each(function(){
				var slevetg=$(this).attr('data-toggle');
				$('.'+slevetg+'').addClass('myopehide');
			});
			
			$('.'+tg+'').removeClass('myopehide');
		});
		$('.js_mytogglebtn.my_sel_isact').click();
		
		$('#my-form-sub-wrap').find('.my_sel_act').click(function(){
			var p = $(this).parents('.my-form-sel-pbox');
			
			if(p.attr('data-sel-type')=='tag_muti_select'){
				if($(this).hasClass('my_sel_isact')){
					$(this).removeClass('my_sel_isact');
				}else{
					$(this).addClass('my_sel_isact');
				}
			}else{
				p.find('.my_sel_isact').removeClass('my_sel_isact');
				$(this).addClass('my_sel_isact');
			}
		});
		
		$('#my-form-sub-wrap').find('.js-my-form-sub').click(function(){
			var p=$(this).parents('.my-form-pbox');
			var axs=[];
			var sub_param={};
			var havedata=false;
			var check_error_msg=false;
			
			p.find('.my-form-input-items').each(function(){
				var d={};
				d.val=self.trim_huanhang($(this).val());
				d.key=$(this).attr('data-key');
				
				if(d.key!=undefined){
					
					if(d.val!=''){
                                                if(!check_error_msg){
                                                    if($(this).attr('data-num_type')=='int'){
                                                        var now_min=$(this).attr('data-min');
                                                        if(now_min!=undefined && parseInt(d.val)<parseInt(now_min)){
                                                            check_error_msg='不能小于'+now_min;
                                                        }
                                                        var now_max=$(this).attr('data-max');
                                                        if(now_max!=undefined && parseInt(d.val)>parseInt(now_max)){
                                                            check_error_msg='不能大于'+now_max;
                                                        }
                                                    }
                                                }
						eval('sub_param.'+d.key+'="'+d.val+'"');
						axs.push(d);
						havedata=true;
					}else{
						
					}
				}
			});
                        if(check_error_msg){
                            $.topmsg(check_error_msg);
                            return;
                        }
			p.find('.my-form-sel').each(function(){
				var d={};
				d.val=self.trim_huanhang($(this).val());
				d.key=$(this).attr('data-key');
				
				if(d.val!=''){
					eval('sub_param.'+d.key+'='+d.val);
					axs.push(d);
					havedata=true;
				}else{
					
				}
			});
			p.find('.popvideobox').each(function(){
				var d={};
				if($(this).attr('data-src')!=''&&$(this).attr('data-src')!=undefined){
					d.val=self.trim_huanhang($(this).attr('data-src'));
					d.key=$(this).attr('data-key');

					if(d.key!=undefined){
						eval('sub_param.'+d.key+'="'+d.val+'"');
						havedata=true;
					}else{
						
					}
				}
			});
			p.find('.popimgbox').find('img').each(function(){
				var d={};
				if($(this).attr('src')!=''){
					d.val=self.trim_huanhang($(this).attr('src'));
					d.key=$(this).attr('data-key');

					if(d.key!=undefined){
						eval('sub_param.'+d.key+'="'+d.val+'"');
						havedata=true;
					}else{
						
					}
				}
			});
			p.find('.pcr-button').each(function(){
				var d={};
				var p=$(this).parents('.colorrplce');
				d.val=$(this).css('color');
				d.key=p.attr('data-key');
				
				if(d.key!=undefined && d.val!=undefined){
                                    if(d.val=='rgba(0, 0, 0, 0.15)'||d.val=='rgba(0,0,0,0.15)'){
                                        d.val='';
                                    }
                                    eval('sub_param.'+d.key+'="'+d.val+'"');
                                    havedata=true;
				}
			});
			
			p.find('.my-form-tag-icon').each(function(){
				var d={};
				d.val=self.trim_huanhang($(this).find('.my_sel_isact').attr('data-v'));
				d.key=$(this).attr('data-key');
				
				if(d.key!=undefined && d.val!=undefined){
					eval('sub_param.'+d.key+'="'+d.val+'"');
					havedata=true;
				}else{
					
				}
			});
			
			p.find('.my-form-tag-img').each(function(){
				var d={};
				d.val=self.trim_huanhang($(this).find('.my_sel_isact').attr('data-v'));
				d.key=$(this).attr('data-key');
				
				if(d.key!=undefined && d.val!=undefined){
					eval('sub_param.'+d.key+'="'+d.val+'"');
					havedata=true;
				}else{
					
				}
			});
			
			p.find('.my-form-tag-sel').each(function(){
				var d={};
				
				//处理多选的情况
				if($(this).attr('data-sel-type')=='tag_muti_select'){
					
					var valstr=';';
					$(this).find('.my_sel_isact').each(function(){
						valstr=valstr+$(this).attr('data-value')+';';
					});
					
				}else{
					var valstr=$(this).find('.my_sel_isact').attr('data-value');
				}
				
				d.val=self.trim_huanhang(valstr);
				d.key=$(this).attr('data-key');
				
				if(d.key!=undefined && d.val!=undefined){
					eval('sub_param.'+d.key+'="'+d.val+'"');
					havedata=true;
				}else{
					
				}
			});
			
			if(self.editor_arr.length>0){
				for(var ei in self.editor_arr){
					eval('sub_param.'+self.editor_arr[ei].key+'="'+self.editor_arr[ei].obj.html()+'"');
				}
			}
			
			var notnullstop=false;
			if(p.find(".notnulltip").length>0){
				p.find(".notnulltip").each(function(){
					var nkey=$(this).attr('data-key');
					var title=$(this).attr('data-title');
					
					eval('var jude=sub_param.'+nkey+'');
					if(jude==undefined){
						notnullstop=true;
						$.topmsg(title+'不能为空');
					}
				});
			}
			
			if(notnullstop){
				return;
			}
			
			// add_param
			if(self.param.add_param!=undefined){
				for(var eis in self.param.add_param){
					eval('sub_param.'+eis+'="'+self.param.add_param[eis]+'"');
				}
			}
			
			if(!havedata){
			//	return;
			}
			var url=$(this).attr('data-form_url');
			
			if($(this).attr('data-where_key')!=''){
				eval('sub_param.'+$(this).attr('data-where_key')+'="'+$(this).attr('data-where_val')+'"');
			}else{
				sub_param.where=$(this).attr('data-where_val');
			}
			
			for(var pms in sub_param){
				if(typeof sub_param[pms]=='string' && sub_param[pms]!=''){
					sub_param[pms]=sub_param[pms].replace(/\[huanhang\]/g, "\r\n");
				}
			}
			
			if($(this).attr('data-form_url')=='javascript://'){
				callback && callback(sub_param);
				return;
			}
			if($(this).attr('data-auth')!=''){
				sub_param.auth=wefwe();
			}
			if($.topmsg==undefined){
				
			}else{
				$.topmsg('提交中...',10000);
			}
                        sub_param.hashprint=self.hashprint;
                       
			$.post(url,sub_param,function(d){
				if(d.status){
					if($.topmsg==undefined){
						alert(d.msg==undefined?self.param.msg_ok:d.msg);
					}else{
						$.topmsg(d.msg==undefined?self.param.msg_ok:d.msg);
					}
					$('.js_mypop_allbox').remove();
					callback && callback(sub_param,d);
				}
				if(d.freshCode!=undefined){
					self.refresh_code($('.mycheckcode'));
				}
				if(d.msg!=undefined){
					$.topmsg(d.msg);
				}
				if(d.callbackurl!=undefined){
					$.post(d.callbackurl,{},function(md){
						if(d.reload!=undefined || sub_param.reload!=undefined){
							window.location.reload();
						}
						if(d.skip!=undefined){
							window.location.href=d.skip;
						}
					},'json');
				}else{
					if(d.reload!=undefined || sub_param.reload!=undefined){
						window.location.reload();
					}
					if(d.skip!=undefined){
						window.location.href=d.skip;
					}
				}
				if(self.param.add_param!=undefined && self.param.add_param.autoclose==undefined){
					$('.js_mypop_allbox').remove();
				}
				
			},'json');
		});
		$(".up_video_raw").each(function(){
			$(this).bind('change',function(){
				if($(this).attr('data-unedit')!=undefined){
					return;
				}
                                $.topmsg('加载中...',false);
                                var file_id=$(this).attr('id');
                                var fileSize = $(this)[0].files[0].size/(1024*1024);
                                var max=parseInt($(this).attr('data-max'));
                                if(max==''||max==0){
                                    max=10;
                                }
                                if(fileSize>max){
                                    $.topmsg("上传的视频大小不能超过"+max+"MB!");
                                    return false;
                                }
				var p=$(this).parents(".up_box");
				
				var cover_id=$(this).attr('data-cover_id');
				var vbox=$(this).parents('.myimgsaid').find('.popvideobox');
				
				var action='/Home/upload/video?';
				
				$.ajaxFileUpload({
				  url:action,
				  secureuri:false,
				  fileElementId:file_id,
				  dataType: 'json',
				  success: function (data, status){
                                      console.log(data);
					if(data.status){
                                            $.topmsg('上传成功!');
                                            vbox.show();
                                            vbox.attr('data-src',data.fullname);
                                            vbox.find('video').attr('src',data.fullname);
                                            vbox.find('source').attr('src',data.fullname);
                                            
					}else{
						$.topmsg(data.msg);
					}
				  },
				  error: function (data, status,e){
				  }
				});
			});	
		});
		$(".up_cover_raw").each(function(){
			$(this).bind('change',function(){
				if($(this).attr('data-unedit')!=undefined){
					return;
				}
				var p=$(this).parents(".up_box");
				
				var width=$(this).attr('data-width');
				var height=$(this).attr('data-height');
				
				var sub_param='width='+width+'&height='+height;
				
				var file_id=$(this).attr('id');
				var cover_id=$(this).attr('data-cover_id');
				var imgbox=$(this).parents('.myimgsaid').find('.popimgbox');
				
				var action='/Home/upload/img?'+sub_param+'&auto_width='+(width?1:'');
				$.topmsg('上传中...',false);
				$.ajaxFileUpload({
				  url:action,
				  secureuri:false,
				  fileElementId:file_id,
				  dataType: 'json',
				  success: function (data, status){
					if(data.status){
						$.topmsg('').hide();
						imgbox.show();
						imgbox.find('img').attr('src',data.fullname);
						
						if(imgbox.attr('data-crop-width')!='' && imgbox.attr('data-crop-height')!=''){
							if(my_pop_jcrop==undefined){
								var my_pop_jcrop = new sl.app.my_pop_jcrop();
							}
							
							var pas={
									'src':data.fullname,
									'cimg_width':data.cimg_width,
									'cimg_height':data.cimg_height,
									'crop_width':imgbox.attr('data-crop-width'),
									'crop_height':imgbox.attr('data-crop-height'),
									'delsource':true,
									'zoom':(imgbox.attr('data-crop-width')/data.cimg_width),
									'success':function(imgurl){
										imgbox.find('img').attr('src',imgurl);
									},
							};
							my_pop_jcrop._pop_image(pas);
						}
						
					}else{
						$.topmsg(data.msg);
					}
				  },
				  error: function (data, status,e){
				  }
				});
			});	
		});
		
		$('.myjscolor').each(function(){
			if($(this).hasClass('bind')){
				return;
			}
			var id=$(this).attr('id');
			var defp=$(this).parents('.colorrplce').attr('data-origin');
			var defcolor=(defp==undefined?'#42445a':defp);
			
			var setopa=$(this).parents('.colorrplce').attr('data-setopacity');
			var setopacity=(defp==undefined?true:false);
			
			var pickr = Pickr.create({
			    el: '#'+id,
			    theme: 'classic', // or 'monolith', or 'nano'
				'default': defcolor,
			    swatches: [
			    	'rgb(255,255,255)',
			        'rgb(12,12,12)','rgb(255,255,255)','rgb(55,60,56)','rgb(130,130,130)',
			        'rgb(0,0,128)','rgb(0,64,152)','rgb(30,80,162)',
			        'rgb(91,119,175)','rgb(0,28,84)','rgb(207,0,112)',
			        'rgb(216,0,15)','rgb(200,8,82)','rgb(215,0,64)',
			        'rgb(230,27,100)','rgb(220,90,111)',
			        'rgb(247,200,207)','rgb(234,85,32)','rgb(229,169,10)',
                                'rgb(0,47,167)','rgb(30,127,160)','rgb(0,49,83)','rgb(0,149,182)','rgb(56,44,119)','rgb(176,89,35)','rgb(190,224,208)','rgb(33,166,117)','rgb(55,7,8)',
			        'rgb(0,142,87)','rgb(161,216,230)','rgb(34,174,230)',
			        'rgb(0,105,128)','rgb(124,80,157)','rgb(0,136,144)',
			        'rgb(242,155,135)','rgb(225,152,192)','rgb(220,90,111)',
			        'rgb(241,141,0)','rgb(255,189,80)','rgb(181,134,84)','rgb(98,90,5)',
			        'rgb(166,136,177)','rgb(187,161,203)','rgb(0, 136, 144)'
			    ],
			    components: {
			        // Main components
			        preview: true,
			        opacity: setopacity,
			        hue: true,
			        // Input / output Options
			        interaction: {
			            hex: false,
			            rgb: true,
			            hsla: false,
			            hsva: false,
			            cmyk: false,
			            input: true,
			            clear: true,
			            save: true
			        }
			    }
			});
			$(this).addClass('bind');
		});
	}
	my_pop_ope.prototype.trim_huanhang=function (strs){
		if(strs==undefined || strs==''){
			return '';
		}
		var astrs=strs.replace(/^[\r\n]/g, '');
		astrs=astrs.replace(/[\r\n]$/g, '');
		
		astrs=astrs.replace(/'/g, '&quot;');
		astrs=astrs.replace(/"/g, '&#039;');
		
		astrs=astrs.replace(/[\r\n]/g, '[huanhang]');
		
		return astrs==undefined?'':astrs;
	}
	my_pop_ope.prototype.jsprestr=function (obj){
		if(obj.title!=undefined && obj.title!=''){
			obj.title=String(obj.title).replace(/#ojbk#/g, '&');
		}
		if(obj.def!=undefined && obj.def!=''){
			obj.def=String(obj.def).replace(/#ojbk#/g, '&');
		}
		if(obj.show!=undefined && obj.show!=''){
			obj.show=String(obj.show).replace(/#ojbk#/g, '&');
		}
		if(obj.exp!=undefined && obj.exp!=''){
			obj.exp=obj.exp.replace(/#ojbk#/g, '&');
		}
		return obj;
	}
	my_pop_ope.prototype.create_form=function (aft,param){
		var self=this;
		
		var content='';
		var plugin_upload=false;
		var plugin_color=false;
		var htmledit=false;
		
		for(var key in aft){
			var obj=aft[key];
			
			obj=self.jsprestr(obj);
			
			var autowidth='';
			if(obj.line_num!=undefined && obj.line_num=='two'){
				autowidth='style="width:100%;"';
			}
			else if(obj.title==undefined || obj.title==''){
				autowidth='style="width:100%;"';
			}
                        if(obj.title!=undefined && obj.title!=''){
                            obj.title=''+obj.title+'';
                        }
			var self_class='';
			if(obj.self_class!=undefined){
				self_class=obj.self_class;
			}
                        var selfdatastr='';
                        if(obj.datastr!=undefined){
                            selfdatastr=obj.datastr;
                        }
			var notnulltip='<b class="notnulltip" data-title="'+(obj.title==undefined?'':obj.title)+'" data-key='+key+' style="color:#df3033"> * </b>';
			
			if(obj.type=='input'){
				content+='<div class="my-pop-form-div '+self_class+'" '+selfdatastr+'>';
				if(obj.title!=undefined){
					content+='	<div class="leftsaidtit" style=""> '+((obj.notnull!=undefined&&obj.notnull=='1')?notnulltip:'')+' <lhz class="lftitisaid">'+(obj.title==undefined?'':obj.title)+'</lhz>  </div>';
				}
				content+='<div class="rightopwrap" '+autowidth+'>	<input '+(obj.unedit==undefined?'':'disabled="disabled"')+' value="'+(obj.def==undefined?'':obj.def)+'" class="my-form-input my-form-input-items" data-key="'+key+'" title="'+(obj.title==undefined?'':obj.title)+'" type="text" placeholder="'+(obj.exp==undefined?'':obj.exp)+'">';
				content+='</div><div style="clear:both"></div></div>';
			}
			if(obj.type=='intro'||obj.type=='desp'){
				content+='<div class="my-pop-form-div '+self_class+'" '+selfdatastr+'>';
				if(obj.title!=undefined){
					content+='	<div class="introsaid" style="'+(obj.style==undefined?'':obj.style)+'">'+(obj.title==undefined?'':obj.title)+'  </div>';
				}
				content+='<div style="clear:both"></div></div>';
			}
			else if(obj.type=='btn'){
				content+='<div class="my-ftbtnbssg my-not-act '+self_class+'" '+selfdatastr+'>';
				if(obj.title!=undefined){
					content+='	<div style="text-align:center;">'+(obj.title==undefined?'':obj.title)+'  </div>';
				}
				content+='<div style="clear:both"></div></div>';
			}
                        else if(obj.type=='step_opt'){
				content+='<div class="my-steoptdiv my-not-act '+self_class+'" '+selfdatastr+'>';
				if(obj.title!=undefined){
					content+='	<div style="font-size:18px;color:#000;font-weight:500;padding:8px 0px;">'+(obj.title==undefined?'':obj.title)+'</div>';
				}
                                if(obj.desp!=undefined){
					content+='	<div style="font-size:14px;padding:10px 0;">'+(obj.desp==undefined?'':obj.desp)+'</div>';
				}
				content+='<div style="clear:both"></div></div>';
			}
                        else if(obj.type=='opt_intro'){
				content+='<div class="my-opt_intro my-not-act">';
				if(obj.title!=undefined){
					content+='	<div style="font-size:18px;color:#000;font-weight:500;padding:8px 0px;">'+(obj.title==undefined?'':obj.title)+'</div>';
				}
                                if(obj.desp!=undefined){
					content+='	<div style="font-size:14px;padding:10px 0;line-height: 1.6;">'+(obj.desp==undefined?'':obj.desp)+'</div>';
				}
                                content+='<div class="my-ftbtnbssg '+self_class+'" '+selfdatastr+' style="font-size:14px;margin-top:10px">'+(obj.btn_title==undefined?'':obj.btn_title)+'</div>';
				content+='<div style="clear:both"></div></div>';
			}
			else if(obj.type=='wrap_start'){
				content+='<div class="my-pop-itwrap '+self_class+'">';
			}
			else if(obj.type=='wrap_end'){
				content+='</div>';
			}
			else if(obj.type=='input_num'){
				content+='<div class="my-pop-form-div '+self_class+'" '+selfdatastr+'>';
				if(obj.title!=undefined){
					content+='	<div class="leftsaidtit" style="">'+(obj.title==undefined?'':obj.title)+'  </div>';
				}
				content+='<div class="rightopwrap" '+autowidth+'><div class="my_num_ope js_my_num_ope" data-ope="-">-</div>';
				
				content+='<input data-min="'+(obj.min==undefined?'':obj.min)+'" data-max="'+(obj.max==undefined?'':obj.max)+'" data-step="'+(obj.step==undefined?'1':obj.step)+'" data-num_type="'+(obj.num_type==undefined?'int':obj.num_type)+'" style="width:69%;text-align:center;" value="'+(obj.def==undefined?'':obj.def)+'" class="my-form-input my-form-input-items" data-key="'+key+'" title="'+obj.title+'" type="text" placeholder="'+(obj.exp==undefined?obj.title:obj.exp)+'">';
				
				content+='<div class="my_num_ope  js_my_num_ope" data-ope="+">+</div></div><div style="clear:both"></div></div>';
			}
			else if(obj.type=='psw'){
				content+='<div class="my-pop-form-div '+self_class+'" '+selfdatastr+'>';
				if(obj.title!=undefined){
					content+='	<div class="leftsaidtit" style=""> '+((obj.notnull!=undefined&&obj.notnull=='1')?notnulltip:'')+' <lhz class="lftitisaid">'+(obj.title==undefined?'':obj.title)+'</lhz>  </div>';
				}
				content+='<div class="rightopwrap" '+autowidth+'>	<input value="'+(obj.def==undefined?'':obj.def)+'" class="my-form-input my-form-input-items" data-key="'+key+'" title="'+obj.title+'" type="password" placeholder="'+(obj.exp==undefined?obj.title:obj.exp)+'">';
				content+='</div><div style="clear:both"></div></div>';
			}
			else if(obj.type=='textarea'){
				content+='<div class="my-textarea-div '+self_class+'" '+selfdatastr+'>';
				if(obj.title!=undefined){
					content+='	<div class="leftsaidtit" style=""> '+((obj.notnull!=undefined&&obj.notnull=='1')?notnulltip:'')+' <lhz class="lftitisaid">'+(obj.title==undefined?'':obj.title)+'</lhz></div>';
				}
				content+='<div class="rightopwrap" '+autowidth+'> <textarea style="width:100%" data-key="'+key+'" class="myarear js-my-val my-form-input-items" placeholder="'+(obj.def==undefined?(obj.show==undefined?'':obj.show):obj.def)+'">'+(obj.def==undefined?'':obj.def)+'</textarea>';
				content+='</div><div style="clear:both"></div></div>';
			}
			else if(obj.type=='htmledit'){
				htmledit=true;
				
				content+='<div class="my-textarea-div '+self_class+'" '+selfdatastr+'>';
				if(obj.title!=undefined){
					content+='	<div class="leftsaidtit" style=""> '+((obj.notnull!=undefined&&obj.notnull=='1')?notnulltip:'')+' <lhz class="lftitisaid">'+(obj.title==undefined?'':obj.title)+'</lhz></div>';
				}
				content+='<div class="rightopwrap" '+autowidth+'> <textarea data-height="'+(obj.height==undefined?'':obj.height)+'" id="form_content_id_'+key+'" data-id="form_content_id_'+key+'" style="width:100%" data-key="'+key+'" class="myarear my_form_pop_edit js-my-val my-form-input-html" placeholder="'+(obj.def==undefined?(obj.show==undefined?'':obj.show):obj.def)+'">'+(obj.def==undefined?'':obj.def)+'</textarea>';
				content+='</div><div style="clear:both"></div></div>';
			}
                        else if(obj.type=='video'){
				content+='<div class="myimgsaid my-pop-form-divbak  '+self_class+'" '+selfdatastr+' style="padding:5px 0px;'+(obj.inithide=='hide'?'display:none;':'')+'">';
				content+='  <div class="leftsaidtit"> '+((obj.notnull!=undefined&&obj.notnull=='1')?notnulltip:'')+' '+(obj.title==undefined?'上传图片':obj.title)+'</div>';
				content+='  <div style="float:left;width:39%;cursor:pointer;background-image:url(/Public/image/ico/up_video.svg)" class="my-textarea-div controls bg_selectfile">';
				content+='    <input type="file" name="file" '+(obj.unedit==undefined?'':'data-unedit="unedit"')+' id="mypopupvideo'+key+'" data-max="'+(obj.max==undefined?'':obj.max)+'" data-key="'+key+'" class="up_video_raw '+(obj.c==undefined?'':obj.c)+' myimageinput js-my-val my-form-input-items" placeholder="'+(obj.exp==undefined?obj.show:obj.exp)+'"></input>';
				content+='  </div>';
				content+='  <div class="popvideobox js-my-upimg" title="点击可删除"  data-key="'+key+'" data-crop-width="'+(obj.crop_width==undefined?'':obj.crop_width)+'"  data-crop-height="'+(obj.crop_height==undefined?'':obj.crop_height)+'" style="'+(obj.def==undefined?'display:none;':'')+'">';
				content+='  <video playsinline="" loop="true" autoplay="true" muted="" preload="" src="'+(obj.def==undefined?'':obj.def)+'"  class="js_my_video_pre" style="cursor: pointer;" width="80%"><source type="video/mp4" src="'+(obj.def==undefined?'':obj.def)+'" ></video></div>';
				content+='  <div style="clear:both;"></div>';
				content+='</div>';
				
				plugin_upload=true;
			}
			else if(obj.type=='image'){
				content+='<div class="myimgsaid my-pop-form-divbak  '+self_class+'" '+selfdatastr+' style="padding:5px 0px;'+(obj.inithide=='hide'?'display:none;':'')+'">';
				content+='  <div class="leftsaidtit"> '+((obj.notnull!=undefined&&obj.notnull=='1')?notnulltip:'')+' '+(obj.title==undefined?'上传图片':obj.title)+'</div>';
				content+='  <div style="float:left;width:39%;cursor:pointer;" class="my-textarea-div controls bg_selectfile">';
				content+='    <input type="file" name="file" '+(obj.unedit==undefined?'':'data-unedit="unedit"')+' id="mypopupimg'+key+'" data-width="'+(obj.width==undefined?'':obj.width)+'" data-height="'+(obj.width==undefined?'':obj.height)+'" data-key="'+key+'" class="up_cover_raw '+(obj.c==undefined?'':obj.c)+' myimageinput js-my-val my-form-input-items" placeholder="'+(obj.exp==undefined?obj.show:obj.exp)+'"></input>';
				content+='  </div>';
				content+='  <div class="popimgbox js-my-upimg" title="点击可删除"   data-crop-width="'+(obj.crop_width==undefined?'':obj.crop_width)+'"  data-crop-height="'+(obj.crop_height==undefined?'':obj.crop_height)+'" style="'+(obj.def==undefined?'display:none;':'')+'">';
				content+='  <img data-key="'+key+'" data-origin="'+(obj.def==undefined?'':obj.def)+'" src="'+(obj.def==undefined?'':obj.def)+'"></div>';
				content+='  <div style="clear:both;"></div>';
				content+='</div>';
				
				plugin_upload=true;
			}
			else if(obj.type=='color'){
				content+='<div class="my-pop-form-div colorrplce  '+self_class+'"  '+selfdatastr+' data-origin="'+(obj.def==undefined?'':obj.def)+'" data-key="'+key+'" >';
				if(obj.title!=undefined){
					content+='	<div class="leftsaidtit" style="">'+(obj.title==undefined?'':obj.title)+'</div>';
				}
				content+='	<div class="rightopwrap" '+autowidth+'> <input id="myautocolor'+key+'" style="width:100%;height:50px;" data-k="web_color" class="js-my-val myjscolor myiconcolor" placeholder="请输入颜色">';
				content+='	</div><div style="clear:both;"></div>';
				content+='</div>';
				plugin_color=true;
			}
			else if(obj.type=='tag_select'||obj.type=='tag_muti_select'){
				content+='<div class="my-pop-form-div my-form-sel-pbox my-form-tag-sel '+self_class+'" data-key="'+key+'" data-sel-type="'+obj.type+'">';
				if(obj.title!=undefined){
					content+='<div class="leftsaidtit"> '+((obj.notnull!=undefined&&obj.notnull=='1')?notnulltip:'')+' <lhz class="lftitisaid">'+obj.title+'</lhz></div>';
				}
				content+='<div class="rightopwrap" '+autowidth+'>';
                if(obj.data!=undefined){
					for (var op in obj.data){
						var opt=obj.data[op];
						var issel=false;
						if(obj.def!='' && opt.v == obj.def){
							issel=true;
						}
						else if(opt.is_sel!=undefined && opt.is_sel!=''){
							issel=true;
						}
						var selfcc='';
						if(opt.c!=undefined){
							selfcc=opt.c;
						}
						var toggle='';
						if(opt.toggle!=undefined){
							toggle='data-toggle="'+opt.toggle+'"';
							selfcc=selfcc+" js_mytogglebtn";
						}
                                                var datastr='';
                                                if(opt.datastr!=undefined){
                                                    datastr=opt.datastr;
                                                }
                                                var iconstr='';
                                                if(opt.icon!=undefined){
                                                    iconstr='<i class="myiconfont '+opt.icon+'"></i>';
                                                }
                                                if(opt.href!=undefined && opt.href!=''){
                                                    content+='<a target="_blank" href="'+opt.href+'">';
                                                }
						if(opt.src!=undefined && opt.src!=''){
							content+= '<div '+toggle+' data-confirm-url="'+(opt.confirm_url!=undefined?opt.confirm_url:'')+'" '+datastr+' data-show="'+(opt.confirm!=undefined?opt.confirm:'')+'" class="mytag_img '+(opt.confirm!=undefined?'my_form_confirm':'')+' my_sel_act '+(issel?'my_sel_isact':'')+' '+selfcc+' " data-value="'+opt.v+'"><img src="'+(opt.src)+'"><br>'+opt.s+'</div>';
						}else{
							content+= '<div '+toggle+' data-confirm-url="'+(opt.confirm_url!=undefined?opt.confirm_url:'')+'" '+datastr+' data-show="'+(opt.confirm!=undefined?opt.confirm:'')+'" class="myformtags '+(opt.confirm!=undefined?'my_form_confirm':'')+' my_sel_act '+(issel?'my_sel_isact':'')+' '+selfcc+' " data-value="'+opt.v+'">'+iconstr+' '+opt.s+'</div>';
						}
                                                if(opt.href!=undefined && opt.href!=''){
                                                    content+='</a>';
                                                }
					}
                }
                content+='</div><div style="clear:both;"></div></div>';
			}
			else if(obj.type=='tag_intro'){
				content+='<div class="my-pop-form-div my-form-sel-pbox my-form-tag-sel '+self_class+'" data-key="'+key+'" data-sel-type="'+obj.type+'">';
				if(obj.title!=undefined){
					content+='<div class="leftsaidtit"> '+((obj.notnull!=undefined&&obj.notnull=='1')?notnulltip:'')+' <lhz class="lftitisaid">'+obj.title+'</lhz></div>';
				}
				content+='<div class="rightopwrap" '+autowidth+'>';
                if(obj.data!=undefined){
					for (var op in obj.data){
						var opt=obj.data[op];
						content+='<div style="border: 1px solid #eee;border-radius:5px;padding:10px;margin-bottom:5px;">';
						content+='<div style="padding:10px 0;;">'+(opt.desp==undefined?'':opt.desp)+'</div>';
						if(opt.src!=undefined && opt.src!=''){
							content+= '<img src="'+(opt.src)+'">';
						}
						var issel=false;
						if(obj.def!='' && opt.v == obj.def){
							issel=true;
						}
						else if(opt.is_sel!=undefined && opt.is_sel!=''){
							issel=true;
						}
						var selfcc='';
						if(opt.c!=undefined){
							selfcc=opt.c;
						}
						var toggle='';
						if(opt.toggle!=undefined){
							toggle='data-toggle="'+opt.toggle+'"';
							selfcc=selfcc+" js_mytogglebtn";
						}
                        var datastr='';
                        if(opt.datastr!=undefined){
                            datastr=opt.datastr;
                        }
                        var iconstr='';
                        if(opt.icon!=undefined){
                            iconstr='<i class="myiconfont '+opt.icon+'"></i>';
                        }
                        if(opt.href!=undefined && opt.href!=''){
                            content+='<a target="_blank" href="'+opt.href+'">';
                        }
						content+= '<div style="float:right;margin:0px;" '+toggle+' '+datastr+' data-show="'+(opt.confirm!=undefined?opt.confirm:'')+'" class="myformtags '+(opt.confirm!=undefined?'my_form_confirm':'')+' my_sel_act '+(issel?'my_sel_isact':'')+' '+selfcc+' " data-value="'+opt.v+'">'+iconstr+' '+opt.s+'</div>';
                        if(opt.href!=undefined && opt.href!=''){
                            content+='</a>';
                        }
                        content+='<div style="clear:both;"></div></div>';
					}
                }
                content+='</div><div style="clear:both;"></div></div>';
			}
			else if(obj.type=='tag_select_icon'){
				content+='<div class="my-pop-form-div my-form-sel-pbox '+self_class+' my-form-tag-icon" data-key="'+key+'" data-sel-type="'+obj.type+'">';
				if(obj.title!=undefined){
					content+='<div class="leftsaidtit"> '+((obj.notnull!=undefined&&obj.notnull=='1')?notnulltip:'')+' <lhz class="lftitisaid">'+obj.title+'</lhz></div>';
				}
				content+='<div class="rightopwrap" '+autowidth+'>';
                if(obj.data!=undefined){
					for (var op in obj.data){
						var opt=obj.data[op];
						var issel=false;
						if(obj.def!='' && opt.v == obj.def){
							issel=true;
						}
						else if(opt.is_sel!=undefined && opt.is_sel!=''){
							issel=true;
						}
                                                var datastr='';
                                                if(opt.datastr!=undefined){
                                                    datastr=opt.datastr;
                                                }
						content+= '<icon data-confirm-url="'+(opt.confirm_url!=undefined?opt.confirm_url:'')+'" '+datastr+' data-show="'+(opt.confirm!=undefined?opt.confirm:'')+'" class="iconfont iconclass '+(opt.confirm!=undefined?'my_form_confirm':'')+' my_sel_act '+(issel?'my_sel_isact':'')+' '+opt.icon+' " data-v="'+opt.v+'"></icon>';
                    }
                }
                content+='</div><div style="clear:both;"></div></div>';
			}
			else if(obj.type=='tag_select_img'){
				content+='<div class="my-pop-form-div '+self_class+' my-form-sel-pbox my-form-tag-img" data-key="'+key+'" data-sel-type="'+obj.type+'">';
				if(obj.title!=undefined){
					content+='<div class="leftsaidtit"> '+((obj.notnull!=undefined&&obj.notnull=='1')?notnulltip:'')+' <lhz class="lftitisaid">'+obj.title+'</lhz></div>';
				}
				content+='<div class="rightopwrap" '+autowidth+'>';
                if(obj.data!=undefined){
					for (var op in obj.data){
						var opt=obj.data[op];
						var issel=false;
						if(obj.def!='' && opt.v == obj.def){
							issel=true;
						}
						else if(opt.is_sel!=undefined && opt.is_sel!=''){
							issel=true;
						}
                                                if(opt.datastr!=undefined){
                                                    datastr=opt.datastr;
                                                }
						content+= '<img title="双击查看大图" height="'+(opt.height==undefined?50:opt.height)+'px" data-confirm-url="'+(opt.confirm_url!=undefined?opt.confirm_url:'')+'" data-show="'+(opt.confirm!=undefined?opt.confirm:'')+'" class="iconfont '+(opt.confirm!=undefined?'my_form_confirm':'')+' my_sel_act '+(issel?'my_sel_isact':'')+' " src="'+(opt.img)+'" data-v="'+opt.v+'">';
                    }
                }
                content+='</div><div style="clear:both;"></div></div>';
			}
			else if(obj.type=='select'){
				
				content+='<div class="my-pop-form-div '+self_class+'">';
				if(obj.title!=undefined){
					content+='<div class="my-form-abc leftsaidtit"> '+((obj.notnull!=undefined&&obj.notnull=='1')?notnulltip:'')+' <lhz class="lftitisaid">'+obj.title+'</lhz></div>';
				}
				content+='<div class="rightopwrap" '+autowidth+'><select title="'+obj.show+'" data-key="'+key+'"  class="my-form-sel"><option value="">请选择</option>';
				if(obj.data!=undefined){
					for (var op in obj.data){
						var opt=obj.data[op];
						var issel=false;
						if(obj.def!='' && opt.v == obj.def){
							issel=true;
						}
						else if(opt.is_sel!=undefined && opt.is_sel!=''){
							issel=true;
						}
						content+= '<option '+(issel?'selected="selected"':'')+'  '+datastr+' value="'+opt.v+'">'+opt.s+'</option>';
                    }
                }
                content+='</select></div><div style="clear:both;"></div></div>';
				
			}
			else if(obj.type=='checkcode'){
				content+='<div class="my-pop-form-div '+self_class+'">';
				
				content+='	<div class="leftsaidtit" style="width:30%"> <span style="display:none;">'+notnulltip+'</span> <img class="mycheckcode" style="width:100%" data-src="'+obj.url+'" src="/Public/image/democode.png"> </div>';
				
				content+='<div class="rightopwrap" style="width:65%">	<input class="mycheckcodeinint my-form-input my-form-input-items" data-key="'+key+'" title="'+obj.title+'" type="text" placeholder="'+(obj.exp==undefined?'请填写验证码':obj.exp)+'">';
				
				content+='</div><div style="clear:both"></div></div>';
			}
			
		}
		param.content=content;
		self.pop_wrap(param);
		
		if(plugin_upload && $.ajaxFileUpload==undefined){
			var d=$('<script src="/Public/jslib/jquery/jquery.ajaxupload.js"></script>');
			$('body').prepend(d);
		}
                if(param.hashprint!=undefined && $('.myhashfinger').length==0){
                    var hashfinger=$('<script class="myhashfinger" src="/Public/jslib/fingerprintjs-master/fingerprint2.js"></script>');
                    $('body').prepend(hashfinger);
                    
                     Fingerprint2.get(function(components) {
    		        self.hashprint = Fingerprint2.x64hash128(components.map(function (pair) { return pair.value }).join(), 31);
                        console.log(self.hashprint);
                     });  
                }
		
		if(htmledit){
			var pcolor=$('p').css('color');
			var bdcolor=$('body').css('color');
			
			$('.my_form_pop_edit').each(function(){
				var btn=$(this);
				var editor={};
				var editor_id=btn.attr('data-id');
				editor.key=btn.attr('data-key');
				editor.id=editor_id;
				KindEditor.ready(function(K) {
					editor.obj= K.create('#'+editor_id, {
						uploadJson : '/home/upload/rawimg',
						cssData : 'body {color: '+bdcolor+';font:16px "sans serif",tahoma,verdana,helvetica}p{color:'+pcolor+'}',
						items:["undo","redo","|","image","justifyleft", "justifycenter", "indent","justifyright", "justifyfull","fullscreen","table", "hr",
							"fontname", "fontsize", "|", "forecolor", "hilitecolor", "bold", "italic", "underline", "strikethrough", "lineheight",
							] ,
						filterMode: false,
			            allowFileManager: true,
			            height:btn.attr('data-height')==undefined?300:btn.attr('data-height')
					});
				});
				self.editor_arr.push(editor);
			});
			
			
		}
		
	}
	
	my_pop_ope.prototype.bind_event=function (){
		var self=this;
		
		
		
		$('.js_mypop_form').each(function(){
			if($(this).hasClass('my_pop_bind')){
				return;
			}
			$(this).bind('click',function(){
				var param={};
				var action = $(this).attr('data-mypop-action');
				var data = $(this).attr('data-mypop-data');  
				
				param.auth=$(this).attr('data-mypop-auth')==undefined?'1':'';
				param.url=$(this).attr('data-mypop-url');
				
				param.title = $(this).attr('data-mypop-title');  
				param.color = $(this).attr('data-mypop-color');  
				
				param.where_val=$(this).attr('data-mypop-where');
				param.where_key=$(this).attr('data-mypop-where_key');
				
				if(param.where_val==undefined||param.where_val==''){
					console.log('no where_val');
				}
				if(param.where_key==undefined||param.where_key==''){
					console.log('no where_key');
				}
				try{
					var aft = eval('(' + data + ')');
					if(aft==undefined){
						console.log('error');
					}
				}catch(e){
					console.log('error 1');
					return;
				}
				self.create_form(aft,param);
			});
			
			$(this).addClass('my_pop_bind');
		})
	}
	my_pop_ope.prototype.std_css_callback=function (target,pa){

	}
	my_pop_ope.prototype.close=function (target,pa){
		$('.js_mypop_allbox').remove();
	}
	
	sl.app.my_pop_ope=my_pop_ope;
})();
