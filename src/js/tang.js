$(function () {
    //icheck的初始化
    $('.icheck').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue '
    });

    //时间插件初始化
    $('.date-select').daterangepicker({
        "locale": {
            format: 'YYYY-MM-DD',
            separator: ' ~ ',
            applyLabel: "应用",
            cancelLabel: "取消",
            resetLabel: "重置",
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'
            ],
        }
    },function () {

    });


    //分页初始化
    $('#pageTool').Paging({pagesize:10,count:100,callback:function(page,size,count){
        // console.log(arguments)
        // alert('当前第 ' +page +'页,每页 '+size+'条,总页数：'+count+'页')
    }});
});
