$(function(){
    //默认查询第一页,pageSize为5
    initFileList();

    //初始化时间插件,以及回调函数
    initDateSelect(function () {

    });



});
//初始化页面
var pageNumber = 1;
var pageSize = 5;
function initFileList(data) {
    data = data || {
        "pageNum":pageNumber,
        "pageSize":pageSize
    }
    $.ajax({
        "url":"http://172.168.17.37:8077/api/getIndustryReport/listReport.json",
        "type":"POST",
        "data":data,
        "success":function (res) {
            console.log(res);
            createFileHtml(res.data.list);
            if(!$('#pageTool').html()){
                $('#pageTool').Paging({pagesize:pageSize,count:res.data.total,callback:function (page) {
                    pageNumber = page;
                    initFileList();
                }});
            }
        },
        "error":function (error) {
            console.log("服务端出错,请联系后台")
        }
    });
}
function createFileHtml(arr){
    $(".word-box").html("");
    var html = "";
    for(var i = 0;i<arr.length;i++){
        var item = arr[i];
        var itemHtml = '<div class="row item" id="'+item.id+'">' +
            '<div class="col-md-7">' +
            '<div class="col-md-1"><div class="file-box '+item.fileType+'"></div></div>' +
            '<div class="col-md-11"><h4>'+item.title+'</h4>' +
            '<p class="deepFontGrey over-hidden">'+item.introduct+'</p>' +
            '<p class="lightFontGrey mb0">文件大小：'+item.size+'</p></div></div>' +
            '<div class="col-md-5">' +
            '<div class="col-md-4 text-center linH90">'+item.downloads+'</div>' +
            '<div class="col-md-4 text-center linH90">'+item.browses+'</div>' +
            '<div class="col-md-4 text-center linH90">'+timestampToTime(item.postTime)+'</div>' +
            '</div></div>';
        html += itemHtml;
    }
    $(".word-box").html(html);
}

