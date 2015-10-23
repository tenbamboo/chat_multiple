# chat_multiple
chat multiple by css ,js

客服聊天框（单对话框）  --> https://github.com/tenbamboo/chat_simple
客服聊天框（多选对话框）--> https://github.com/tenbamboo/chat_multiple

使用第三方插件列表:
1.umeditor -->https://github.com/fex-team/umeditor
2.mCustomScrollbar  -->https://github.com/astula/mCustomScrollbar


API:
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
	 参数结构:
	 var defaults = {
		title:"车主提问",
		recipientImg:"./images/face1.jpg",
		senderImg:"./images/face2.jpg",
		width:600,
		height:500,
		beforeSend:undefined,
		afterSend:undefined,
		loadHistory:{
			enable:false,
			url:"",
			type:"GET",
			data:{},
			success:undefined,
			error:undefined,
		}
	};




