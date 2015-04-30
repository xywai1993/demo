/**
 * 2015年4月30日11:02:44
*2014年5月5日10:01:12
*
*/
(function(win){


///******************************************


    /*  function F(vArg,parent){
     return new Fan(vArg,parent)
     } */

    win.F = fan;

    // 对象
    function Fan(eles){
        for(var i=0;i<eles.length;i++){
            this[i] = eles[i]
        }
        this.length = eles.length
    }


//元素获取
    function fan(vArg,parent){
        var elements= [] ,
            parent = document.getElementById(parent)||parent ;
        switch ( typeof vArg){
            case 'function':
               // addEvent(win,'load',vArg) ;
               win.addEventListener('load',vArg);
                break;
            case 'string':
                elements = (parent||document).querySelectorAll(vArg) ;
                break;
            case 'object':
			    if(vArg.length){
					elements = vArg
				}else{
				    elements.push(vArg)
				}
                
        }
        return new Fan(elements)

    }

    //************工具函数*******************

    Fan.prototype.map=function(callback){
        var results = [] , i=0 ;
        for(;i<this.length;i++){
            results.push(callback.call(this,this[i],i))
        }
        return results
    };

    Fan.prototype.mapOne = function(callback){
        var m = this.map(callback);
        return m.length>1? m:m[0]
    };

    Fan.prototype.each = function(callback){

        this.map(callback);
        return this
    };

     Fan.prototype.dom = function(){
       var result = this.map(function(ele){
           return ele ;
       });
       return result.length>1?result:result[0]
    };


//***********DOM操作***************
    /**
     * 事件绑定
     * @param {type}eve
     * @param {function}fn
     * @returns {*}
     */
    Fan.prototype.on = function(eve,fn){
        return this.each(function(ele){
            ele.addEventListener(eve,fn,false);
        })

    };
    /**
     * 事件委托
     * @param {object}child
     * @param {string}eve
     * @param {function}fn
     * @returns {*}
     */
    Fan.prototype.delegate = function(child,eve,fn){
        return this.each(function(ele){
            ele.addEventListener(eve,function(ev){
                if(ev.target.nodeName.toLowerCase() === child){
                    fn.call(ev.target)
                }
            },false)
        })

    };


    Fan.prototype.hide=function(){
        return this.each(function(ele){
            ele.style.display = 'none'
        })

    };

    Fan.prototype.show=function(display){
        return this.each(function(ele){
            ele.style.display= display || 'block' ;
        })

    };
    
	Fan.prototype.toggleDisplay=function(display){ 	   
		return this.each(function(ele){
		   var style = getComputedStyle(ele,false)['display'] 
		   //console.log(style)
			if(style === 'none'|| style ===''){
				ele.style.display = display||'block'
			}else if(style === 'block' || style === display){
				ele.style.display = 'none'
			}
		})
	};
    
    Fan.prototype.text = function(text){
        if(typeof text !== 'undefined'){
            return this.each(function(ele){
                ele.innerText = text
            })
        }else{
            return this.mapOne(function(ele){
                return ele.innerText
            })
        }

    };

    Fan.prototype.html = function(text){
        if(typeof text !== 'undefined'){
            return this.each(function(ele){
                ele.innerHTML = text
            })
        }else{
            return this.mapOne(function(ele){
                return ele.innerHTML
            })
        }

    };

  
    /**
     *
     * @param {Object||String} [josn][string] 或者 样式名
     * @returns {*}
     */
    Fan.prototype.css = function(josn){
        if(typeof josn === 'string'){
            return this.mapOne(function(ele){
                return getComputedStyle(ele,false)[josn]
            })
        }else{
            return this.each(function(ele){
                for(var attr in josn){
                    ele.style[attr] = josn[attr]
                }
            })

        }

    };



    Fan.prototype.addClass = function(classname){
        return this.each(function(ele){
            ele.classList.add(classname)
        })
    };

    Fan.prototype.removeClass = function(classname){
        return this.each(function(ele){
            ele.classList.remove(classname)
        })
    };

    Fan.prototype.toggleClass = function(classname){
        return this.each(function(ele){
            ele.classList.toggle(classname)
        })
    };

    Fan.prototype.contains = function(classname){
        return this.mapOne(function(ele){
            return  ele.classList.contains(classname)
        })
    };

    /**
     *
      * @returns  {Fan}父元素
     */
    Fan.prototype.parent = function(){
        return this.mapOne(function(ele){
            return fan(ele.parentNode)
        })
    };

    Fan.prototype.eq = function(index){
        return fan(this[index])
    };
    
	Fan.prototype.index = function(Farr){
	   for(var i=0;i<Farr.length;i++){		
	     if(this[0] === Farr[i]){ 		   
		   return i
		 }
	   }
	   return -1
	};
	
	
	Fan.prototype.find = function(select){      
	  //	return fan(select,this[0])  
	  var aEle = [] 
	  for(var i=0;i<this.length;i++){
	  	var a = this[i].querySelectorAll(select)	;
		for(var j=0;j<a.length;j++){
		   aEle = aEle.concat(a[j])
		}  
		
	  }
	  return fan(aEle)
	};
	
    /**
     *
     * @param {Object} json
     * @param {String} time  0.4s
     * @param {String} type  linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n)
     * @returns {*}
     */
   Fan.prototype.animate = function (json,time,type){
       var time = time || '0.4s' ;
       var type = type || 'ease' ;
       return this.each(function(ele){
            var option = 'all'+' '+time+' '+type  ;
             ele.style.webkitTransition =option ;
            fan(ele).css(json) ;
       })
   };
   

    // return F
})(window) 


//************* 设置在同级元素事件执行后的状态**********************
// 同级元素数组， 样式名 ，事件(可选)
 function setState(arr,css,Event){ 
    var oArr = obj(arr)
	var eve = Event || 'click'  	;
    oArr.on(eve,function(){
		oArr.removeClass(css) ;
		F(this).addClass(css)
	})
	
  }

//************tab 切换********************
function Ftab(Parr,Carr,css){
		 Carr.hide().eq(0).show() ;	
	     Parr.on('click',function(){
	     var index = F(this).index(Parr) ;
		 Parr.removeClass(css).eq(index).addClass(css);
		 Carr.hide().eq(index).show() 	   
	     })
	  
	  }
	  

function obj(obj){
  if(typeof obj === 'object'){
    
    return obj.nodeType ? F(obj): obj		
  }else if(typeof obj === 'string'){
    return F(obj)
  }
}	  
