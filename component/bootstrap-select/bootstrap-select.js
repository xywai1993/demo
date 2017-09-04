/**
 * Created by yiper on 2017/4/10.
 *  global $
 */

define(function (require, exports, module) {
    require('../lib/bootstrap-select.min.js');

    const tmp = `
      <select class="form-control">
      <option disabled value="">请选择</option>
      <slot></slot>    
      </select>     
    `;


    /**
     * 使用 v-model  进行双向绑定  ,
     * 参考 https://cn.vuejs.org/v2/guide/components.html#使用自定义事件的表单输入组件
     * 依赖 http://silviomoreto.github.io/bootstrap-select/methods/
     */


    module.exports = {
        template : tmp,
        props:['value'],
        mounted (){
            const self = this ;
            $(this.$el).selectpicker({
                liveSearch : true,
                size : 6
            }).on('change',function () {
                self.$emit('input', this.value);
            }).selectpicker('val',this.value);
        },
        watch:{
            value(value){
                console.log(value);
                $(this.$el).selectpicker('val',value) ;
            }
        }
    };
});