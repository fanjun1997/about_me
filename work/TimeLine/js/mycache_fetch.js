var lk = lk || {};

(function(){
	
	mycache_fetch=function(){
            this.supportLocal=this.isLocalStorageUsable();
            this.fetch_aft_str='fetch_end_time';
	}
        
        mycache_fetch.prototype.isLocalStorageUsable=function() {
            
            const localStorageTestKey = '__localStorage_support_test';
            const localStorageTestValue = 'test';
            
            var isSupport = false;
            
            try {
                localStorage.setItem(localStorageTestKey, localStorageTestValue);
                if (localStorage.getItem(localStorageTestKey) === localStorageTestValue) {
                      isSupport = true;
                }
                localStorage.removeItem(localStorageTestKey);
                return isSupport;
            } catch(e) {
                if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                    console.warn('localStorage 存储已达上限！')
                } else {
                    console.warn('当前浏览器不支持 localStorage！');
                }
                return isSupport;
            }
        } 
        mycache_fetch.prototype.time_secend=function(){
            var time = parseInt((new Date().getTime())/1000);//获取到毫秒的时间戳，精确到毫秒
            return time;
        }
        mycache_fetch.prototype.destroy_like=function(targetKey){
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if(key.search(targetKey) != -1){
                    localStorage.removeItem(key);
                }
            }
        }
	mycache_fetch.prototype.fetch=function(url,data,callback,fetchtype,maxtime){
            var self=this;
            var keyurl=url+''+JSON.stringify(data);
            if(fetchtype==undefined||fetchtype==''){
                fetchtype='post';
            }
            if(maxtime==undefined||fetchtype==''){
                maxtime=60*10;
            }
            //判断是否更新缓存 缓存是否过期
            var fetch_aft=self.fetch_aft_str;
            
            var start_cache=false;
            var test_mod=false;
            if(self.supportLocal){
                if(localStorage.getItem('test_mod')){
                    test_mod=true;
                }else{
                    $.topmsg('加载中...',1000);
                    var sd=localStorage.getItem(keyurl);
                    if(sd){
                        var sdarr=sd.split(fetch_aft);
                        try{
                            var d=JSON.parse(sdarr[0]);
                            var time=sdarr[1];
                            if(self.time_secend()-parseInt(time)>maxtime){
                                console.log('缓存过期');
                            }else{
                                callback && callback(d);
                                start_cache=true;
                                return; 
                            }
                        } catch(e) {
                            start_cache=false;
                        }
                    }
                }
            }
            if(!start_cache){
                if(fetchtype=='getJSON'){
                    $.getJSON(url,data,function(d){
                        callback && callback(d);
                        var sd=JSON.stringify(d);
                        fetch_aft=fetch_aft+self.time_secend();
                        localStorage.setItem(keyurl,sd+fetch_aft);
                    },'json');
                }else if(fetchtype=='post'){
                    $.post(url,data,function(d){
                        callback && callback(d);
                        var sd=JSON.stringify(d);
                        fetch_aft=fetch_aft+self.time_secend();
                        localStorage.setItem(keyurl,sd+fetch_aft);
                    },'json');
                }
                
            }
	}
        
        lk.mycache_fetch = mycache_fetch ;
})();
lk.mycache_fetch=new mycache_fetch();