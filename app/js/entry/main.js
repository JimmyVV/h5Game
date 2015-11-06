require.config({　　
    baseUrl: "js/lib",
    paths: {　　　　　　
        "jquery": "jquery.min", //都不加后缀.js
        // 'zepto': 'zepto',
        'los': "localStorage", //加载localStorage文件,使数据存储在本地
        "underscore": "underscore.min",
        "backbone": "backbone",
        'focus': "../entry/modules/input-focus"　　　
    },
     shim:{
        'underscore' : {
            exports : '_'
        },
        'backbone' : {
            deps : ['underscore','jquery']
            , exports : 'Backbone'
        },
        'jquery': { 
            exports: '$'
        }
    }
});
require(['underscore','jquery', 'backbone','focus'], function(_,$,Backbone) {　　　
     var textWidth = function(text){ 
        var sensor = $('<pre>'+ text +'</pre>').css({display: 'none'});   //因为pre标签,可以保留空格和换行符,
        $('body').append(sensor); 
        var width = sensor.width();
        sensor.remove(); 
        return width;
    };

    var Self = Backbone.Model.extend({
        default: {
            name: '',
            tyrant: [] //包含属性: name:'',content:'xxxxxx<name>xxxx'   name是测试人的名字
        },
        /*
         * 检测tyrant是否含有一样的数据
         */
        detechOver: function(obj) {
            var mark = false;
            this.tyrant.forEach(function(val, index) {
                if (val.name === obj.name) {
                    mark = false;
                    return;
                } else mark = true;
            })
            return mark;
        },
        /*
         * 解析后台传回来的tyrant的信息;
         */
        parseScript: function(name, script) {
            script = script.replace("<name>", this.name); //替换tyrant里面的值
            var obj = {
                name: name,
                script: script
            };
            if (this.detechOver()) {
                this.tyrant.push(obj);
            }
        }
    })　
    var People = Backbone.Collection.extend({
        model: Self
    })
    var IndexView = Backbone.View.extend({
        el: $('.i-index'),
        event:{
            'keydown .i-testname':'limitLength'
        },
        render: function() {
            this.$el.find('.i-testname').inputFocus("输入测试姓名");                             
        },
        show:function(){
            this.render();
        },
        limitLength:function(){
            
        }
    })
    var Router = Backbone.Router.extend({
        routes: {
            '': 'index'
        },
        initialize: function() {
            this.indexView = new IndexView();
        },
        index: function() {
            this.indexView.show();
        }
    })
    var router = new Router;
    Backbone.history.start({pushState:true});
});
