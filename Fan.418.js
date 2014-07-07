/**
 * author：fan
 * Update time：2014年6月21日15:36:35
 */

(function(win){


//************* 设置在同级元素事件执行后的状态**********************
// 同级元素数组， 样式名 ，事件(可选)
    function setState(arr,css,Event){
        var eve = Event || 'click' ;
        for (var i = arr.length - 1; i >= 0; i--) {
            addEvent(arr[i],eve,function(){
                for (var i = arr.length - 1; i >= 0; i--) {
                    //arr[i].className = ''
                    F(arr[i]).removeClass(css)
                };
                //this.className = css
                F(this).addClass(css)
            })
        };
    }

//****************仿jquery toggle函数****************************
    function FYPtoggle(obj,fn1,fn2){
        var index=0   ;
        addEvent(obj,'click',function(){
            index++
            if(index%2 == 0){fn2.call(obj)}
            else{fn1.call(obj)}
        })

    }



///******************************************


    /*  function F(vArg,parent){
     return new Fan(vArg,parent)
     } */

    win.F = fan ;

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
            parent = document.getElementById(parent)||parent;
        switch ( typeof vArg){
            case 'function':
               // addEvent(win,'load',vArg) ;
               win.addEventListener('load',vArg)
                break;
            case 'string':
                elements = (parent||document).querySelectorAll(vArg) ;
                break;
            case 'object':
                elements.push(vArg)
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
        var m = this.map(callback) ;
        return m.length>1? m:m[0]
    };

    Fan.prototype.each = function(callback){

        this.map(callback) ;
        return this ;
    };

   Fan.prototype.dom = function(){
       var result = this.map(function(ele){
           return ele
       })
       return result.length>1?result:result[0]
   }


//***********DOM操作***************
    /**
     * 事件绑定
     * @param {type}eve
     * @param {function}fn
     * @returns {*}
     */
    Fan.prototype.on = function(eve,fn){
        return this.each(function(ele){
            ele.addEventListener(eve,fn,false)
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

    Fan.prototype.show=function(){
        return this.each(function(ele){
            ele.style.display=''
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
