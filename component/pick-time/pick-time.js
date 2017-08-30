/**
 * Created by yiper on 2017/8/28.
 */
define(function (require, exports, module) {
    require('../../css/datepicker.min.css');
    require('../lib/datepicker.min.js');
    require('../lib/lodash.min');

    /**
     *  选择时间组件 基于AIR DATEPICKER
     *  http://t1m0n.name/air-datepicker/docs/
     *
     *  v-model
     *    绑定一个 日期
     *
     *  events:
     *   事件名：changedate  选择  回调参数 ：时间    eg: 2017-01-01 至 2017-02-02 ；
     *
     *  props :
     *   options  时间配置参数   一个对象   eg: {maxDate:new Date()}  ;
     *
     */

    const tmpTimePick = `
        <input type="text" v-pickdate="options" v-model="time" class="form-control" ></li>
    `;


    module.exports = {
        template: tmpTimePick,
        props: {
            value: {
                type: String,
                default: ''
            },
            options: {
                type: Object
            }
        },
        data: function () {
            return {
                time: this.value
            };
        },
        created: function () {},
        methods: {},
        watch: {
            time: function () {
                this.$emit('input', this.time);
                this.$emit('changedate', this.time);
            }
        },
        directives: {
            deep: true,
            pickdate: {
                bind: function (el, binding, ref) {
                    const params = {
                        language: 'zh',
                        autoClose: true,
                        dateFormat: 'yyyy-mm-dd',
                        multipleDatesSeparator: '至',
                        onSelect: function (formattedDate) {
                            ref.context.time = formattedDate;
                        }
                    };

                    Object.assign(params, binding.value);

                    // console.log(params);
                    $(el).datepicker(params);
                },
                update(el, binding) {
                    if (!_.isEqual(binding.value, binding.oldValue)) {
                        const inst = $(el).data('datepicker');
                        inst.update(binding.value);
                        // inst.date = binding.value.minDate ;
                    }
                }
            }
        }
    };
});