/**
 * Created by yiper on 2017/8/28.
 */
define(function(require, exports, module) {
    require('../datepicker.min');
    require('../../css/datepicker.min.css');

    /**
     *  选择时间组件 基于AIR DATEPICKER
     *  http://t1m0n.name/air-datepicker/docs/
     *
     *  events:
     *   事件名：on-change  时间改变是触发 回调参数 ：时间    eg: 2017-01-01 至 2017-02-02 ；
     *
     *  props :
     *   options  时间配置参数   一个对象   eg: {maxDate:new Date(),defaultTime:new Date()}  ;
     *   其他参数看时间插件文档
     */
    //@keyup.delete="remove"
    const tmpTimePick = `
        <input type="text"  class="form-control" >
    `;

    module.exports = {
        template: tmpTimePick,
        props: {
            value: {
                type: String,
                default: ''
            },
            options: {
                type: Object,
                default: function() {
                    return {};
                }
            }
        },
        data: function() {
            return {
                time: this.value || options.defaultTime || ''
            };
        },
        mounted: function() {
            console.log(this.options);
            let params = {
                language: 'zh',
                autoClose: true,
                dateFormat: 'yyyy-mm-dd',
                // range: false,
                onSelect: formattedDate => {
                    this.time = formattedDate;
                }
            };
            Object.assign(params, this.options);
            $(this.$el).datepicker(params);
        },
        watch: {
            time: function() {
                this.$emit('on-change', this.time);
                this.$emit('input', this.time);
            },
            value: function(val) {
                const inst = $(this.$el).data('datepicker');

                if (this.value) {
                    inst.selectDate(new Date(val));
                }
            },
            options: function() {
                console.log(this.options);
                const inst = $(this.$el).data('datepicker');
                if (this.value) {
                    inst.selectDate(new Date(this.value));
                }
                Object.keys(this.options).forEach(item => {
                    inst.update(item, this.options[item]);
                });
            }
        }
    };
});
