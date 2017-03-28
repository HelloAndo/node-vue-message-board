export default {

	fetch: function(key){
		return JSON.parse( localStorage.getItem(key) );
	},

	save: function(key, value){
		localStorage.setItem( key, JSON.stringify(value) );
	},

	del: function(key){
		localStorage.removeItem( key );
	},
	
	getTopics: function(begin, end, list){
		console.log(list)
		return list.slice(begin, end) ;
	},

	// 操作反馈模态框调用函数
	feedback: function($el, cb){
		$el.modal('show');
        setTimeout(function(){
            $el.modal('hide');
            if(cb){
            	cb();
            }
        }, 1500);
	},

}