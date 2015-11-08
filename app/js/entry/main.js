require.config({　　
    baseUrl: "js/lib",
    paths: {　　　　　　
        "jquery": "jquery.min", //都不加后缀.js
        'zepto': 'zepto',
        'zepto-custom': 'zepto-custom',
        'los': "localStorage", //加载localStorage文件,使数据存储在本地
        "underscore": "underscore.min",
        "backbone": "backbone",
        'focus': "../entry/modules/input-focus",
        'deferred': 'deferred',
        'touch':'touch',
        'event':'event'
    },
    map: {
        '*': {
            'zepto': 'zepto-custom'
        },
        'zepto-custom': {
            'zepto': 'zepto'
        }
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'zepto'],
            exports: 'Backbone'
        },
        'zepto': {
            exports: '$'
        },
        'deferred': {
            exports: '$',
            deps: ['zepto']
        },
        'touch':{
            exports:'$',
            deps:['zepto']
        },
        'event':{
            exports:'$',
            deps:['zepto']
        }
    }
});
require(['underscore', 'zepto', 'backbone', 'focus','event', 'deferred','touch'], function(_, $, Backbone) {　　　
    var textWidth = function(text) {
        var sensor = $('<pre>' + text + '</pre>').css({
            display: 'none'
        }); //因为pre标签,可以保留空格和换行符,
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
        events: {            
            'keydown .i-testname': 'limitLength',
            'tap #i-confirm-btn':'jumpTo'

        },
        render: function() {          
            var _this = this;
            this.$el.show();  
            this.$el.find('.i-testname').inputFocus("输入测试姓名");
            setTimeout(function(){_this.setAnimation();},10);
        },
        hide:function(){
            this.$el.hide();
        },
        limitLength: function(e) {
            var text = this.$el.find('#i-testname').val(),
                len = textWidth(text);
                console.log(len);
            if(len>73){
                //超出输入的长度，做出提示
                this.isValidate(false);                
            }else{
                this.isValidate(true);
            }
        },
        setAnimation:function(){
            var ele = this.$el.find('.logo-mayun,.logo-liuQD,.logo-liJC,.logo-Bill,.logo-wangSC,.i-words');
            ele.addClass('now');
            console.log('get');
        },
        isValidate:function(sign){
            return sign;
        },
        jumpTo:function(){
            if(this.isValidate()){
                router.navigate("/#test", {trigger: true, replace: true}); 
            }
        }
    })

    var LoadingView = Backbone.View.extend({
        el: $('.l-loading'),
        initialize: function() {
            this.render();
        },
        hide:function(){
            this.$el.hide();
        },
        render: function() {
              var imgs = ['img/index/words.png',
                'img/index/logo-sa2f6d8bbee.png',
                'img/index/confirm.png'
            ]; //设置图片路径
            this.preload(imgs);
        },
        preload: function(imgs) {
            var len = imgs.length,
                mark = 0,
                arr = new Array(),
                _this = this;
            for (i = 0; i < len; i++) { //这里调用传入的参数
                arr[i] = new Image()
                arr[i].onload = function() {
                    mark++;
                    if (mark <= len) {
                        $('.l-cover').width(Number(mark / len).toFixed(4) + '%');
                        if(mark===len){
                            setTimeout(function(){
                                _this.hide();
                                index.render();
                                _this.isFinish(true);
                            },1000);
                        }
                    }
                }
                arr[i].src = imgs[i];
            }
        },
        isFinish:function(sign){
            if(sign===null||sign==''){
                return false
            }else return sign;            
        }
    });
    var loading = new LoadingView,
        index = new IndexView;
    var Router = Backbone.Router.extend({
        routes: {
            '': 'loading',
            'test': 'test'
        },
        initialize: function() {
            // this.indexView = new IndexView();
        },
        loading: function() {
            if(loading.isFinish()){
                loading.hide();
                index.render();
            }else{
                loading.render();
            }
        },
        test:function(){

        }
    })
    var router = new Router;
    Backbone.history.start({
        pushState: true
    });
});
