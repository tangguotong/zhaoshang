$(function () {
    //icheck的初始化
    $('.icheck').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue '
    });

    //时间插件初始化
   //
    /**
     * 初始化日期插件
     */
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
        alert(123 )
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' ~ ' + picker.endDate.format('YYYY-MM-DD'));
        $("input[name=startDate]").val(picker.startDate.format('YYYY-MM-DD'));
        $("input[name=endDate]").val(picker.endDate.format('YYYY-MM-DD'));
    }).on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });


    //分页初始化
    $('#pageTool').Paging({pagesize:10,count:100,callback:function(page,size,count){
        // console.log(arguments)
        // alert('当前第 ' +page +'页,每页 '+size+'条,总页数：'+count+'页')
    }});
});
