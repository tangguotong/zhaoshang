$(function () {
    //icheck的初始化
    $('.icheck').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue '
    });
    //分页初始化
    // $('#pageTool').Paging({pagesize:10,count:100,callback:function(page,size,count){
    //
    // }});
});

//时间插件初始化
function initDateSelect(callback) {
    $(".date-select").daterangepicker({
        maxDate : moment(), //最大时间
        dateLimit : {
            days : 180
        },//起止时间的最大间隔
        opens: 'center',
        format : 'YYYY-MM-DD', //控件中from和to 显示的日期格式
        separator : ' ~ ',
        autoUpdateInput: false,
        buttonClasses: 'btn',
        applyClass: 'btn-blue',
        cancelClass: 'btn-default',
        locale: {
            applyLabel : '确定',
            cancelLabel : '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            customRangeLabel : '自定义',
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月' ],
            firstDay : 1
        }
    }).on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' ~ ' + picker.endDate.format('YYYY-MM-DD'));
        $("input[name=startDate]").val(picker.startDate.format('YYYY-MM-DD'));
        $("input[name=endDate]").val(picker.endDate.format('YYYY-MM-DD'));
        $(this).parents('li').addClass('active').siblings().removeClass('active');


        callback();
    }).on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });

}

//筛选项的点击事件
function headerFilter(callback) {
    $('.search-box').on('click','.item-list li',function () {
        //如果li下面没有input说明不是时间插件
        if($(this).find('input').length == 0){
            $(this).addClass('active').siblings().removeClass('active');
            if($(this).siblings().find('input').length != 0){
                $(this).siblings().find('input').val('');
            }
            callback($(this));
        }
    })
}

//时间戳转时间
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';

    return Y+M+D;
}
