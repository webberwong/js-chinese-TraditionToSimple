/*
 * demo
 * 该文件最好放在文档底部,或者放在onload事件里
 * @depens TraditiontoSimple_CN.js
 * @author Hwl <weigewong@gmail.com>
 */
var t2s = new TraditionToSimple_CN(); 
//获取Cookie 语言版本的值 
var BodyIsFt = t2s.getcookie()
/*
 * demo切换语言的按键加上事件
 * 该处不提供html,根据需要改动
 * 该类实现功能主要是靠cookie来区别需要的语言版本
 * 关键就是设置cookie和执行translate
 * 下面代码是使用jquery,需要加载jquery库
 */
$('#select_lang').click(function(e){
	var target = $(e.target);
	var lang   = target.attr('lang');
	if(lang == 'zh_cn'){
		t2s.setcookie( 0 );
	}else if(lang == 'zh_tw'){
		t2s.setcookie( '1' );	
	}
});
//加载完文档后,判断语言版本,并执行转换
if(BodyIsFt == "0"){
	//将文档转换为简体
	t2s.translate(0);
}else{
	//将文档转换为繁体
	t2s.translate(1);
}

/*
 * //将字符串转为简体
 * var simplize_text = t2s.toSimplized('繁體文字');
 * //将字符串转为繁体
 * var traditionalize_text = t2s.toTraditionalized('简体文字');
 * //转换某个文档节点的文字,为保持统一版本文字,转换节点的文字根据cookie决定,如果需要,转换思路
 * t2s.translateObj(documnet.getElementById('demo'));
 */
