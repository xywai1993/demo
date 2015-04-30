
/**
 * Update time：2014年8月29日12:39:47
 * 全屏阴影模块
 * option：
 * {
     *  id: '' ,       //id
     *  click: true , // 点击是否取消  ,默认false
     *  csstext : ''  // css
     * }
 *
 * @param option
 * @constructor
 * .js-shadow{ position:absolute;left:0;top:0;width:100%; background:rgba(0,0,0,.4); z-index: 100;}
 */

function Shadow(option){
    var self = this ,option = option || {} ;
    self.shadow = document.createElement('div') ;
    self.in = false ;
    //设置id 供外部使用
    self.shadow.id= option.id || ''   ;

    // 设置 样式
    self.shadow.className = 'js-shadow' ;
    self.shadow.style.cssText = option.csstext ;
    self.shadow.style.height = document.body.clientHeight +'px' ;

    // 设置是否 点击关闭
    if(option.click){
        self.shadow.onclick=function(){
            document.body.removeChild(self.shadow) ;
            self.in = false ;
        }
    }
}
Shadow.prototype.open = function(){
    var self = this ;
    document.body.appendChild(self.shadow) ;
    self.in = true ;
};
Shadow.prototype.close = function(){
    var self = this ;
    if( self.in){
        document.body.removeChild(self.shadow) ;
        self.in = false;
    }

} ;
