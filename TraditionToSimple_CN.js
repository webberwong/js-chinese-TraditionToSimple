/**
 * js简繁转换类,只能转大部分文字
 * 根据网络上的简繁转换进行修改
 * @depends FontsLib.js 需要先载入字体库
 * @author Hwl <weigewong@gmail.com>
 */

function TraditionToSimple_CN(){
	/**
	 * 该类的对象
	 * @access public
	 * @vars Object
	 */
	var _this         = {};
	//默认是否繁体，0-简体，1-繁体
	var Default_isFT  = 1;
	//翻译延时毫秒（设这个的目的是让网页先流畅的显现出来）		
	var StranIt_Delay = 50; 
	var cookie_ft     = "ft"+self.location.hostname.toString().replace(/\./g,"");
	/**
	 * 转换文本字体
	 * @param string txt    文本内容
	 * @param bool   toFT   是否为繁体,0为简体,1为繁体
	 * @param string chgTxt 未知其意义,初步理解为将切换按钮的 中文标识替换,如果当前是简体版本,那么就该关键字的 简字 替换 成繁字,表示可以切换到繁体版
	 * @returns string
	 */
	function StranText(txt,toFT,chgTxt)
	{
		if(txt == "" || txt == null ) return ""
		toFT = toFT == null ? BodyIsFt : toFT
		//如果是简则替换为繁,否则相反
		if(chgTxt) txt = txt.replace((toFT?"简":"繁"),(toFT?"繁":"简"))
		
		if(toFT){
			//返回繁体字
			return Traditionalized(txt)
		}else {
			//返回简体字
			return Simplized(txt)
		}
	}//StranText Func End
	
	
	/**
	 * 转换对象，使用递归，逐层剥到文本
	 * @param Object Dom对象 如果没有,但以document.body为根
	 * @returns void
	 */
	function StranBody(fobj)
	{
		if(typeof(fobj) == "object"){
			var obj    = fobj.childNodes
		}else {
			//如果没有指定从某个节点开始转换,则默认为BODY节点
			var obj = document.body.childNodes
		}
		//遍历子节点,进进行转换文本,核心处理 
		for(var i = 0; i < obj.length; i++)
		{
			var OO = obj.item(i)
			if("|BR|HR|TEXTAREA|SCRIPT|OBJECT|EMBED|".indexOf("|"+OO.tagName+"|")!=-1||OO==StranLink_Obj)continue;
			if(OO.title!= "" && OO.title !=null ) OO.title = StranText(OO.title);
			if(OO.alt  != "" && OO.alt   !=null ) OO.alt   =StranText(OO.alt);
			if(OO.tagName  == "INPUT" && OO.value != "" && OO.type != "text" && OO.type != "hidden") OO.value = StranText(OO.value);
			if(OO.nodeType == 3){
				OO.data = StranText(OO.data)
			}else{
				 StranBody(OO)
			}
		}
	}//StranBody Func End;
	
	/**
	 * 将文本转换为繁体
	 * @param string cc 文本内容
	 * @returns string
	 */
	function Traditionalized(cc){
		var str = '',ss = FontsLib.JTPYStr(),tt = FontsLib.FTPYStr();
		for(var i = 0; i < cc.length; i++)
		{
			if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
			else str += cc.charAt(i);
		}
		return str;
	}//Traditionalized Func End
	
	/**
	 * 将文本转换为简体
	 * @param string cc 文本内容
	 * @returns string
	 */	
	function Simplized(cc){
		var str='',ss = FontsLib.JTPYStr(),tt = FontsLib.FTPYStr();
		for(var i = 0; i < cc.length; i++)
		{
			if(cc.charCodeAt(i)>10000&&tt.indexOf(cc.charAt(i))!=-1)str+=ss.charAt(tt.indexOf(cc.charAt(i)));
			else str += cc.charAt(i);
		}
		return str;
	}//Simplized Func End
	
	/**
	 * 设置语言版本的cookie
	 * @param int ver  0/1 0-简体，1-繁体
	 */ 
	function set_langCookie(ver){
			//关键是要设置cookie的位置,放到哪?
			setCookie(cookie_ft,ver,7)	
	}
	
	/**
	 * 获取语言版本的cookie
	 * @returns int
	 */
	function get_langCookie(){
		return getCookie(cookie_ft);
	}
	
	/**
	 * 翻译
	 * @param int ver 0/1 0-简体，1-繁体
	 */
	function translate(ver,obj){
		//设置当前的语言版本
		set_langCookie(ver);
		BodyIsFt  = ver;
		//转换文字
		StranBody(obj);	
	}
	/**
	 * 翻译某个文档节点的文字,文字版本由cookie决定
	 * @param object dom对象
	 */
	function translateObj(obj){
		StranBody(obj);	
	}
	
	//提供给外部的接口
	_this.cookie_ft = cookie_ft;
	_this.StranText = StranText;
	_this.getcookie = get_langCookie;
	_this.setcookie = set_langCookie;
	//单纯将传入的字符串转为简体输出
	_this.toSimplized = Simplized;
	//单纯将传入的字符串转为繁体输出
	_this.toTraditionalized = Traditionalized;
	_this.translate = translate;
	_this.translateObj = translateObj;
	return _this;

}//End Function TraditionToSimple_CN
 
 
/**
 * cookies设置
 * @param string name
 * @param string value
 */
function setCookie(name, value)		
{
	var argv = setCookie.arguments;
	var argc = setCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	if(expires!=null)
	{
		var LargeExpDate = new Date ();
		LargeExpDate.setTime(LargeExpDate.getTime() + (expires*1000*3600*24));
	}
	document.cookie = name + "=" + escape (value) + ((expires == null) ? "" : ("; expires=" +LargeExpDate.toGMTString())) + 
	"; path=/";
}

/**
 * cookies读取
 * @param string Name /Cookie keyname
 * @reutrns string
 */
function getCookie(Name)			
{
	var search = Name + "="
	if(document.cookie.length > 0) 
	{
		//alert(document.cookie);
		offset = document.cookie.indexOf(search)
		if(offset != -1) 
		{
			offset += search.length
			end = document.cookie.indexOf(";", offset)
			if(end == -1) end = document.cookie.length
			return unescape(document.cookie.substring(offset, end))
		}
		else return ""
	 }
}

