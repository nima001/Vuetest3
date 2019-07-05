// 组件和组件之间的通信需要调度器
var Event = new Vue();

Vue.component(
    'alert', {
        template: '<div>我说<input @keyup="on_change" type="text" v-model="i_said">{{i_said}}</div>',
        data: function () {
            return {
                i_said: '',
            }
        },
        methods: {
            on_change: function () {

                // emit触发一个事件
                Event.$emit("alert_said_something",this.i_said);
            }
        }
    }
);

Vue.component(
    'huahua', {
        template: '<div>alert说：{{alert_said}}</div>',
        data: function () {
            return {
                alert_said: "",
            }
        },
        mounted:function () {
            // on监听事件
            var me = this;
            Event.$on('alert_said_something',function (data) {
                console.log('data:',data),
                    me.alert_said = data;
                })
        }
    }
)

new Vue({
    el: '#app',
})