//初始化配置期望排行榜的echart图表
function initConfigExpectRankingEChart(dom, yAxisData, seriesData,result) {
	var size=$("#rankingSize").val();
	if(yAxisData.length>10){
		yAxisData=yAxisData.slice(0,size).reverse();
	}else{
		yAxisData=yAxisData.reverse();
	}
	var lengedData=result.data.ecData.legend;
	var series = [];
	//series.push({ name: 'CPH', data: positiveDatas, type: 'bar', stack: 'emotion' });
	for(var x=lengedData.length-1;x>=0;x--){
		var temp=result.data.ecData.resultData[lengedData[x]];
		//
		if(temp.length>size){
			temp=temp.slice(0,size).reverse();
		}else{
			temp=temp.reverse();
		}
		series.push({name:lengedData[x],type: 'bar',data:temp,barWidth:10,itemStyle:{normal:{'color':'#00d2ff'}}});
	}
	
    var myChart = echarts.init(dom,echartsTheme);
    if (yAxisData.length > 0) {
        myChart.showLoading({
            text: "正在努力的读取数据中..."
        });
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow' | 'cross' | 'none'
                },
                formatter: function (params) {
    	            var tar = params[0][1]+"</br>";
    	            for(var x=params.length-1;x>=0;x--){
    	            	if(x==0){
    	            		tar=tar+params[x][0]+":"+params[x][2];
    	            	}else{
    	            		tar=tar+params[x][0]+":"+params[x][2]+"</br>";
    	            	}
    	            }
    	            return tar;
    	        }
            },
           
            calculable: false,
            grid: {
                x: '18%',
            },
            xAxis: [{
                type: 'value',
                boundaryGap: [0, 0.01],
                axisLine: {
                	show: true,
                	lineStyle: {
                		color: '#f2f2f2',
                		type: 'solid',
                		width: 1
                	}
                },
                splitLine: {
                	show: false
                }
            }],
            legend: {
            	show:true,
                data:lengedData
            },
            yAxis: [{
                type: 'category',
                data: yAxisData,
                axisLine: {
                	show: true,
                	lineStyle: {
                		color: '#f2f2f2',
                		type: 'solid',
                		width: 1
                	}
                },
                splitLine: {
                	show: true,
                	lineStyle: {
                		color: '#f2f2f2',
                	}
                },
                axisTick: {
                	show: false
                },
                axisLabel:{
                	clickable: false
                }
            }],
            series:series
            /* 
            	series [{
                type: 'bar',
                data: seriesData,
                itemStyle: {
                normal: {
                    label : {
                        show: true, 
                    }
                },
                barMaxWidth: 40
            }
            }]*/
        };
        myChart.setOption(option);
        $('.toLoadMore>button').css({'display':'block'});
    } else {
        addNoData3(dom);
        $('.toLoadMore>button').css({'display':'none'});
    }
    cerMyChart = myChart;
    return myChart;
}

//配置期望--按车型分析--配置期望排行榜
function searchConfigExpectRanking() {
    var url = 'configAnalysis/getConfigExpectRankingListByCarModel.do';
    $('#configLevel').val($('#select-configLevel').val());
    var params = $('#formParam').serialize();
    execAjax(url, params, function(result) {
        var yAxisData = result.data.ecData.yAxisData;
        var seriesData = result.data.ecData.seriesData;
        var tableData = result.data.tableData;
        var rankingSize = result.data.rankingSize;
        var total = result.data.ecData.total;
        if(seriesData.length > 0){
        	$('#select-configLevel').css({'display':''});
        	var rankingDisplayType = $('#rankingDisplayType').val();
        	if(rankingDisplayType == '图表'){
        		$('.che-right-tu1-ping').css({'display':''});
            	$('.toLoadMore').css({'display':'block'});
        	}
        	$(".che-right-tu1-table").parent()
        		.find('.active-icon').css({'display' : 'block'});
        	$("#curModel").val(result.data.ecData.legend[0]);
        	configExpectRanking(yAxisData, seriesData,result);
        	$(".che-right-tu1-table").html(tableData);
        	
        	if(total > rankingSize){
        		$('.toLoadMore>button').text('加载更多');
        	}else if(total <= rankingSize && rankingSize != 10){
        		$('.toLoadMore>button').text('收起');
        	}else{
        		var length = yAxisData.length;
        		var dom = document.getElementById('che-right-ranking');
    			//动态调整echarts图表的高度，避免数据过多导致图表显示过于拥挤
    			var echartHeight = 50*length;
                if(echartHeight < 200){
                	echartHeight = 200;
                }else if(echartHeight >= 200 && echartHeight < 300){
                	echartHeight = 280;
                	//$(dom).css('height',echartHeight+"px");
                }
        		$('.toLoadMore>button').css({'display':'none'});
        	}
        }else{
            addNoData3(".che-right-tu1-table");
            addNoData3(".che-right-tu1-ping");
            addNoData($("#articleList"));
            $("#pageContent").css("display", "none");
            $(".che-right-icon>h4").each(function(){
		    	var text = $(this).text();
		    	if(text.indexOf("相关文章")!=-1){
		        	$(this).text("相关文章");
		        }
		    });
            $('.toLoadMore>button').css({'display':'none'});
            $('#select-configLevel').css({'display':'none'});
            $('.che-right-tu1-icon').css({'display':'none'});
        }
        $('#rankingSize').val(rankingSize);

        var tableLength = $("#che-right-big-table>table tr>th").length;
        if(tableLength>11){
            $("#che-right-big-table>table").width(tableLength*80)
        }    
    });   
}

//配置期望--按车型分析--配置期望排行榜
function configExpectRanking(yAxisData, seriesData,result) {
    var dom = document.getElementById('che-right-ranking');
    $(dom).html('');
    var myChart = initConfigExpectRankingEChart(dom, yAxisData, seriesData,result);
    var size=$("#rankingSize").val();
    var text = $('#select-configLevel').val();
    if(yAxisData.length>10){
		yAxisData=yAxisData.slice(0,size).reverse();
		pageIndicator(yAxisData[yAxisData.length-1]);//文章列表的指标参数
	}else{
		yAxisData=yAxisData.reverse();
		pageIndicator(yAxisData[0]);//文章列表的指标参数
	}
    //在当前图表上注册单击事件
    myChart.on(echarts.config.EVENT.CLICK, function(param) {
        //    	var seriesIndex = param.seriesIndex;
        //    	var dataIndex = param.dataIndex;
        //    	var seriesName = param.seriesName;
        //    	var firstIndicator = param.name;
        //    	var data = param.data;
        //    	var value = param.value;
    	$("#curModel").val(param.seriesName);
    	pageIndicator(param.name);//加载文章
    });

    myChart.hideLoading();
}

var cerMyChart = null;