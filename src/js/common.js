/**
 * createby to ayun 2018/6/29
 */

/* 公共js */

/**
 * 初始化选择框
 */
$(function(){
    $('input[type=checkbox]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        increaseArea: '20%'
    });
});
/*tab切换*/
$(".toggle-btn-box").on("click",">.btn",function(){
    $(this).removeClass("btn-default").addClass("btn-blue").siblings().removeClass("btn-blue").addClass("btn-default");
});