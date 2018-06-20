/**
 * Created by zhangxin on 2018/5/16.
 */
(function (factory) {
    if(typeof define === 'function' && define.amd) {
        define(['jquery', 'regionCity'], factory);
    } else if(typeof exports === 'object') {
        factory(require('jquery'), require('regionCity'));
    }else{
        factory(jQuery, regionCity)
    }
})(function ($, regionCity) {
    if(typeof regionCity === 'undefined') throw new Error('必须导入 "jquery.region_city.data.js" 文件');

    var NAMESPACE = 'regionCity',
        REGION = 'region',
        PROVINCE = 'province',
        CITY = 'city';

    function regionCityPicker (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, regionCityPicker.DEFAULTS, $.isPlainObject(options) && options);
        this.init();
    }
    regionCityPicker.prototype = {
        constructor: regionCityPicker,
        init: function () {
            this.setRegion();
            this.bind();
        },
        setRegion: function () {
            var _this = this,
                regionEle = _this.$element.find('select[name=region]'),
                code = 'daqu';
                regionData = regionCity[code],
                regionOption = '';
            for(var i in regionData){
                regionOption += '<option value="'+ i +'">'+ regionData[i] +'</option>';
            }
            regionEle.empty().append('<option value="">请选择地区</option>').append(regionOption).selectpicker('refresh');
        },
        setProvince: function (code) {
            var _this = this,
                provinceEle = _this.$element.find('select[name=provinces]'),
                code = code;
                provinceData = regionCity[code],
                provinceOption = '';
            for(var i in provinceData){
                provinceOption += '<option value="'+ i +'">'+ provinceData[i] +'</option>';
            }
            provinceEle.empty().append('<option value="">请选择省份</option>').append(provinceOption).selectpicker('refresh');
        },
        setCity: function (code) {
            var _this = this,
                cityEle = _this.$element.find('select[name=city]'),
                code = code;
                cityData = regionCity[code],
                cityOption = '';
            if(typeof cityData === 'string'){
                cityOption = '<option value="'+ code +'">'+ regionCity[code] +'</option>'
            }else{
                for(var i in cityData){
                    cityOption += '<option value="'+ i +'">'+ cityData[i] +'</option>';
                }
            }
            cityEle.empty().append('<option value="">请选择城市</option>').append(cityOption).selectpicker('refresh');
        },
        bind: function () {
            var _this = this,
                regionEle = _this.$element.find('select[name=region]'),
                provinceEle = _this.$element.find('select[name=provinces]'),
                cityEle = _this.$element.find('select[name=city]');
            regionEle.on('changed.bs.select',function () {
                var code = $(this).selectpicker('val');
                _this.setProvince(code);
                cityEle.empty().append('<option value="">请选择城市</option>').selectpicker('refresh');
            });
            provinceEle.on('changed.bs.select',function () {
                var code = $(this).selectpicker('val');
                _this.setCity(code);
            });
        }
    };
    regionCityPicker.DEFAULTS = {
        region: '',
        province: '',
        city: ''
    };

    // Save the other citypicker
    $.fn.regioncitypicker = function (option) {
        // var args = [].slice().call(arguments, 1);
        return this.each(function () {
            var $this = $(this),
                options,
                fn;
            // if(typeof option === 'string' && $.isFunction(fn = data[option])) fn.apply(data, args);
            options = $.extend({}, $this.data(), $.isPlainObject(option) && option);
            $this.data(NAMESPACE, (data = new regionCityPicker(this, options)));
        })
    };
    $(function () {
        $('[data-toggle="regionCityPicker"]').regioncitypicker();
    });
});