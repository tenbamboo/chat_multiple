/**
 * @todo 聊天插件
 * @namespace chat
 * @author haze.liu
 * @since 2015年10月14日 下午2:34:22
 */
(function($) {

	/**
	 * 方法说明<BR>
	 * addSendMessage(message,id) - 添加一条发送信息($.chat("addSendMessage","test") or $.chat("addSendMessage","test","001"))
	 * addReceiveMessage(message,id) - 添加一条接收信息($.chat("addReceiveMessage","test") or $.chat("addReceiveMessage","test","001") )
	 * openChat(id) - 打开聊天窗口($.chat("openChat","id")
	 * closeChat() - 关闭聊天窗口($.chat("closeChat"))
	 * addTimestamp() -添加时间戳($.chat("addTimestamp") or $.chat("addTimestamp","12:20");)
	 * addChat(chatArray[i]对象) -添加一个对话
	 */
	/**
	 * 参数说明<BR>
	 * {String} width - 宽度(最小300)
	 * {String} height - 高度(最小400)
	 * {String} title - 标题
	 * {Array} chatArray -聊天数组
	 * {String} chatArray[i].title - 标题
	 * {String} chatArray[i].recipientImg - 接受者头像
	 * {String} chatArray[i].senderImg - 发送者头像
	 * {function} chatArray[i].beforeSend - 发送之前触发事件
	 * {function} chatArray[i].afterSend - 发送之后触发事件
	 * {Json} chatArray[i].loadHistory - 加载更多组件
	 * {Blooean} loadHistory.enable - 加载更多是否可用
	 * {String} loadHistory.url - jquery.ajax方法同
	 * {String} loadHistory.type - jquery.ajax方法同
	 * {Json} loadHistory.data - jquery.ajax方法同
	 * {function} loadHistory.success - jquery.ajax方法同
	 * {function} loadHistory.error - jquery.ajax方法同
	 * 
	 */
	var defaults = {
		title:"车主提问",
		width:600,
		height:500,
		chatArray:[
			// {
			// 	chatId:"0000000",
			// 	title:"test1",
			// 	recipientImg:"./images/face1.jpg",
			// 	senderImg:"./images/face2.jpg",
			// 	beforeSend:undefined,
			// 	afterSend:undefined,
			// 	loadHistory:{
			// 		enable:false,
			// 		url:"",
			// 		type:"GET",
			// 		data:{},
			// 		success:undefined,
			// 		error:undefined,
			// 	}

			// },

		],
		
	};
	var methods = null;
	var _methods = null;
	var um=null;
	methods = {
		init : function(options) {
			defaults = $.extend(defaults, options);
			if(defaults.height<400){
				defaults.height=400;
			}
			if(defaults.width<300){
				defaults.width=300;
			}
			_methods.initDefault();
			_methods.appendHTML();
			_methods.initTool();
			_methods.initDOM();
			_methods.initEvent();
		},
		addSendMessage:function(message,id){
			_methods.sendMessage(message,id);
		},
		addReceiveMessage:function(message,id){
			_methods.receiveMessage(message,id);
		},
		addTimestamp:function(time){
			_methods.addTimestamp(time);
		},
		openChatList:function(){
			_methods.openChatList();
		},
		openChat:function(id){
			_methods.openChat(id);
		},
		closeChat:function(){
			_methods.closeChat();
		},
		addChat:function(obj){
			_methods.initParam(obj);
			_methods.addChat(obj);
		},
		addBadge:function(id){
			_methods.addBadge(id);
		},
		removeBadge:function(id){
			_methods.removeBadge(id);
		},
	};
	
	_methods = {
		addBadge:function(id){
				var badge=$(".chatList ul li a[data-chatId='"+id+"'] i");
				
				if(badge.html()==""){
					badge.html("1");
				}else{
					badge.html(parseInt(badge.html())+1);
					
				}
				badge.show();
		},
		removeBadge:function(id){
				var badge=$(".chatList ul li a[data-chatId='"+id+"'] i");
				badge.html("");
				badge.hide();
		},
		addChat:function(obj){
				var html='<div class="chat-content" id="chat-content-'+obj.chatId+'" style="display:none;">'+
							'<div class="loadMore">点击显示更多</div>'+	
						'</div>';
				$(".chat-editer").before(html);
				if (!obj.loadHistory.enable) {
					$(".chat #chat-content-"+obj.chatId+" .loadMore").hide();
				}
				var li="<li><a data-chatId='"+obj.chatId+"'>"+obj.title+"<i style='display:none;'>1</i></a></li>";
				$(".chatList ul").append(li);
				$(".chat #chat-content-"+obj.chatId).mCustomScrollbar({
					autoHideScrollbar: true,
					theme: "minimal-dark"
				});
				defaults.chatArray.push(obj);
		},
		initDefault:function(){
			for(var i=0,l=defaults.chatArray.length;i<l;i++){
				_methods.initParam(defaults.chatArray[i]);
			}
		},
		initParam:function(obj){
			if(!obj.title){
					obj.title="无标题";
				}
				if(!obj.recipientImg){
					obj.recipientImg="./images/face1.jpg";
				}
				if(!obj.senderImg){
					obj.senderImg="./images/face2.jpg";
				}
				if(!obj.loadHistory){
					obj.loadHistory={
							enable:false,
							url:"",
							type:"GET",
							data:{},
							success:undefined,
							error:undefined,
						}
				}else{
					var h=obj.loadHistory;
					if(!h.type){
						h.type="GET";
					}
					if(!(h.enable==true||h.enable==false)){
						h.enable=false;
					}
				}
		},
		appendHTML:function(){
			var li="";
			var html='<div class="chat" style="display: none;">'+
						'<div class="chat-title">'+
							'<a class="hideBtn">隐藏</a>'+
							'<span>'+defaults.title+'</span>'+
						'</div>';
						for(var i=0,l=defaults.chatArray.length;i<l;i++){
							html+='<div class="chat-content" id="chat-content-'+defaults.chatArray[i].chatId+'" style="display:none;">'+
									'<div class="loadMore">点击显示更多</div>'+	
								  '</div>';
							li+="<li><a data-chatId='"+defaults.chatArray[i].chatId+"'>"+defaults.chatArray[i].title+"<i style='display:none;'></i></a></li>";
						}

				html+='<div class="chat-editer">'+
							'<script id="chat-editer-container" name="content" type="text/plain" style="width:100%;height:100%;"></script>'+
						    '<a class="sendMessage">发送</a>'+
						'</div>'+
					'</div>'+
					'<div class="showChat" >'+
						'<i class="fa fa-comments"></i>'+
					'</div>'+
					'<div class="chatList" style="display:none;">'+
						'<i class="fa fa-times closeChatListBtn"></i>'+
						'<ul>'+
							li+
						'</ul>'+
					'</div>';

			$('body').append(html);
		},
		initDOM:function(){
			for(var i=0,l=defaults.chatArray.length;i<l;i++){
				if (!defaults.chatArray[i].loadHistory.enable) {
					$(".chat #chat-content-"+defaults.chatArray[i].chatId+" .loadMore").hide();
				}
			}
			
		},
		initEvent : function() {
			$(".chat .chat-editer .sendMessage").click(function(event) {
				_methods.sendMessage(um.getContent());
				um.execCommand('cleardoc');
			});
			$(".chat .chat-title .hideBtn").click(function(event) {
				_methods.closeChat();
			});
			$(".showChat").click(function(){
				_methods.openChatList();
			});
			$(".chat .chat-content .loadMore").click(function(event) {
				if($(this).html()!="加载中...."){
					_methods.loadMore(this);
				}
			});
			$(".chatList ul ").delegate('li a', 'click', function(event) {
				_methods.openChat($(this).attr("data-chatId"));
			});
			$(".chatList .closeChatListBtn").click(function(event) {
				_methods.closeChatList();
			});
			

				
		},
		initTool:function(){
			for(var i=0,l=defaults.chatArray.length;i<l;i++){
				$(".chat #chat-content-"+defaults.chatArray[i].chatId).mCustomScrollbar({
					autoHideScrollbar: true,
					theme: "minimal-dark"
				});
			}
			
		},
		closeChatList:function(){
			$(".chatList").hide();
			$(".showChat").show();
		},
		closeChat:function(){
			$(".chat").animate({width: 0,height:0},function(){
					$(".chat").hide();
					$(".showChat").show();
				});
		},
		openChatList:function(){
				$(".showChat").hide();
				$(".chatList").show();
				
		},
		openChat:function(id){
				for(var i=0,l=defaults.chatArray.length;i<l;i++){
					if(defaults.chatArray[i].chatId==id){
						$(".chat-title span").html(defaults.chatArray[i].title);
					}
				}
				$(".showChat").hide();
				$(".chatList").hide();
				$(".chat").show();
				$(".chat .chat-content").hide();
				if(um){
					um.execCommand('cleardoc');
				}
				

				$(".chat").animate({ width: defaults.width,height: defaults.height},function(){
					if($(".edui-editor-body").length==0){
						um = UM.getEditor('chat-editer-container');
					}

					$(".chat #chat-content-"+id).show();
					$(".chat #chat-content-"+id).mCustomScrollbar("scrollTo","bottom");
				});
		},
		loadMore:function(obj){
			$(obj).html("加载中....");

			$.ajax({
				type: defaults.loadHistory.type,
				url: defaults.loadHistory.url,
				data:defaults.loadHistory.data,
				success:function(data) {
					if(data.history.length==0){
						$(obj).hide();
					}else{
						$(obj).html("点击显示更多");
						$.each(data.history,function(i,n){
							var html=""
							if(n.type=="left"){
								html='<div class="chat-item left">'+
											'<img src="'+defaults.recipientImg+'" class="headPic">'+
											'<div class="chat-item-content content-gray">'+
													n.message+
											'</div>	'+
											'<b class="jiao-wai">'+
				                               ' <b class="jiao-nei"></b>'+
				                            '</b>'+
										'</div>';
										$(obj).after(html);


							}else if(n.type="right"){
								html='<div class="chat-item right">'+
											'<img src="'+defaults.senderImg+'" class="headPic">'+
											'<div class="chat-item-content content-orange">'+
													n.message+
											'</div>	'+
											'<b class="jiao-wai">'+
				                               ' <b class="jiao-nei"></b>'+
				                            '</b>'+
										'</div>';
							}else if(n.type="timestamp"){
									html='<div class="timestamp"><span>'+n.message+'</span></div>';
							}
							if(html!=""){
								$(obj).after(html);
							}
							
						});
					}
					
					if (defaults.loadHistory['success']) {
						defaults.loadHistory.success(data);
					}
				},
				error:function(a,b,c){
					if (defaults.loadHistory['error']) {
						defaults.loadHistory.error(data);
					}
					
				}
			});
		},
		addTimestamp:function(time){
			if(time==null){
				var now = new Date();
				time=now.getHours()+":"+now.getMinutes();
			}
			$(".chat .chat-content:visible .mCSB_container").append('<div class="timestamp"><span>'+time+'</span></div>');
			$(".chat .chat-content:visible").mCustomScrollbar("scrollTo","bottom");
		},
		sendMessage:function(message,id){
			var visibleId="";
			if(id==undefined){
				visibleId=$(".chat .chat-content:visible").attr("id").replace("chat-content-","");
			}else{
				visibleId=id;
			}
			var obj=null;
			for(var i=0,l=defaults.chatArray.length;i<l;i++){
				if(defaults.chatArray[i].chatId==visibleId){
					obj=defaults.chatArray[i];
					break;
				}
			}
			if(obj==null){
				console.log("没有找到chatId")
				return ;
			}

			if (obj['beforeSend']) {
				obj.beforeSend(message);
			}
			var html='<div class="chat-item right">'+
							'<img src="'+obj.senderImg+'" class="headPic">'+
							'<div class="chat-item-content content-orange">'+
									message+
							'</div>	'+
							'<b class="jiao-wai">'+
                               ' <b class="jiao-nei"></b>'+
                            '</b>'+
						'</div>';
			$(".chat #chat-content-"+obj.chatId+" .mCSB_container").append(html);
			$(".chat .chat-content-"+obj.chatId).mCustomScrollbar("scrollTo","bottom");
			if (obj['afterSend']) {
				obj.afterSend(message);
			}
		},
		receiveMessage:function(message,id){
			var visibleId="";
			if(id==undefined){
				visibleId=$(".chat .chat-content:visible").attr("id").replace("chat-content-","");
			}else{
				visibleId=id;
			}
			var obj=null;
			for(var i=0,l=defaults.chatArray.length;i<l;i++){
				if(defaults.chatArray[i].chatId==visibleId){
					obj=defaults.chatArray[i];
					break;
				}
			}
			if(obj==null){
				console.log("没有找到chatId")
				return ;
			}
			var html='<div class="chat-item left">'+
							'<img src="'+obj.recipientImg+'" class="headPic">'+
							'<div class="chat-item-content content-gray">'+
									message+
							'</div>	'+
							'<b class="jiao-wai">'+
                               ' <b class="jiao-nei"></b>'+
                            '</b>'+
						'</div>';
			$(".chat #chat-content-"+obj.chatId+" .mCSB_container").append(html);
			$(".chat .chat-content-"+obj.chatId).mCustomScrollbar("scrollTo","bottom");
		},

	};
	$.chat = function() {
		var method = arguments[0];
		if (methods[method]) {
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		} else if (typeof (method) == 'object' || !method) {
			method = methods.init;
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.chat');
			return this;
		}
		return method.apply(this, arguments);
	};
})(jQuery);