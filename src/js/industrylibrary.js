$(function(){
    //默认查询第一页,pageSize为5
    var pageNumber = 1;
    var pageSize = 5;

    //初始化时间插件,以及回调函数
    initDateSelect(function () {
        alert(123);
    });

});
//初始化页面
function initPage() {
    $.ajax({
        "url":"http://localhost:8077/api/getIndustryReport/listReport.json",
        "type":"GET",
        "data":{
            "pageNum":pageNumber,
            "pageSize":pageSize
        },
        "success":function (res) {
            console.log(res)
        },
        "error":function (error) {
            console.log("服务端出错,请联系后台")
        }
    });
}
function createFileHtml(arr) {
    var html = "";
    var fileTyle;
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
            '<div class="col-md-4 text-center linH90">'+item.postTime+'</div>' +
            '</div></div>';
        html += itemHtml;
    }
}

