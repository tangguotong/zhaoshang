$(function () {
    //第一个echart
    createEchartOption(document.getElementById('echart1'));
    createEchartOption(document.getElementById('echart2'));
    createEchartOption(document.getElementById('echart3'));
    initQuadrantCoordinateChart(document.getElementById('echart4'));


});
//绘制柱状图
function createEchartOption(dom,map) {
    echart = echarts.init(dom);
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['园区1', '园区2', '园区3'],
            right:0,
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 35,
            borderRadius:5
        },
        grid: {
            left: 20,
            top: '10%',
            right: 20,
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['最低工资标准',
                '中级管理人员',
                '普通工人',
                '高层管理人员',
                '泽普县',
                '岳普湖县',
            ],
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#999999",
                    width: 1,
                    type: "solid"
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
            },
        }],
        yAxis: [{
            type: 'value',
            name:'用电成本',
            nameTextStyle:{
                color:'#333'
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#999999",
                    width: 1,
                    type: "solid"
                },
            },
            splitLine: {
                show:false,
                lineStyle: {
                    color: "#063374",
                }
            }
        }],
        series: [{
            name: '园区1',
            type: 'bar',
            data: [20, 50, 80, 58, 83, 68],
            barWidth: 10, //柱子宽度
            barGap: 1, //柱子之间间距
            itemStyle: {
                normal: {
                    color:'#28b7f3',
                    opacity: 1,
                }
            }
        }, {
            name: '园区2',
            type: 'bar',
            data: [50, 70, 60, 61, 75, 87],
            barWidth: 10,
            barGap: 1,
            itemStyle: {
                normal: {
                    color:'#2896f3',
                    opacity: 1,
                }
            }
        }, {
            name: '园区3',
            type: 'bar',
            data: [70, 48, 73, 68, 53, 47],
            barWidth: 10,
            barGap: 1,
            itemStyle: {
                normal: {
                    color: '#ff9c00',
                    opacity: 1,
                }
            }
        }]
    };
    echart.setOption(option);
}

//生成散点图
function initQuadrantCoordinateChart(dom, data, averageSatisfaction) {
    data = [[8, 21, "中国（广东）自由贸易试验区广州南沙新区"],[6, 71, "江苏经济技术开发区"],[2, 60, "东营经济技术开发区"]];
    var data2 = [[6, 10, "中国（广东）自由贸易试验区广州南沙新区"],[7, 71, "江苏经济技术开发区"],[5, 60, "东营经济技术开发区"]];
    averageSatisfaction = 0.14;
    var myChart = echarts.init(dom);

    myChart.showLoading({
        text: "正在努力的读取数据中..."
    });
    var option = {
        grid: {
            left: 20,
            top: '10%',
            right: 20,
            bottom: '3%',
            containLabel: true
        },
        tooltip: {
            showDelay: 0,
            formatter: function(params) {
                if (params.value.length > 1) {
                    return params.value[2] + ' <br/>值1: ' + params.value[0] + ' <br/>值2: ' + params.value[1];
                } else {
                    return params.name + ' : ' + params.value;
                }
            },
            axisPointer: {
                show: true,
                type: 'cross',
                lineStyle: {
                    width: 1
                }
            }
        },
        xAxis: [{
            nameGap: 25,
            type: 'value',
            scale: true,
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#999999",
                    width: 1,
                    type: "solid"
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
            },
            splitLine:{
                show:false
            }
        }],
        yAxis: [{
            // nameLocation: 'middle',
            type: 'value',
            scale: true,
            min: 0,
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#999999",
                    width: 1,
                    type: "solid"
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
            },
            splitLine:{
                show:false
            }
        }],
        series: [
            {
                    // name: '声量&满意度',
                    type: 'scatter',
                    data: data,
                    symbolSize: 15,
                    itemStyle: {
                        normal: {
                            /*  color: '#67d8a9',*/
                            color:"#367ce4",
                            label: {
                                show: true,
                                position: 'right',
                                formatter: function(params) {
                                    return params.value[2];
                                }
                            }
                        }
                    }
            },

            {
                name: '声量&满意度',
                type: 'scatter',
                data: data2,
                symbolSize: 15,
                itemStyle: {
                    normal: {
                        /*  color: '#67d8a9',*/
                        color:"#ff9c00",
                        label: {
                            show: true,
                            position: 'right',
                            formatter: function(params) {
                                return params.value[2];
                            }
                        }
                    }
                }
            },
        ]
    };
    myChart.setOption(option);
    myChart.hideLoading();
    // return myChart;
}

//生成单个横向柱形图
function createOneItemBar(color,value,max) {
    var width = value/max *200;
    var left = width + 15;
    var html = '<div class="item-bar">' +
        '<span class="rect" style="width:'+width+'px;background-color: '+color+'"></span>' +
        '<span class="num" style="left:'+left+'px">'+value+'</span></div>';
    return html;
}