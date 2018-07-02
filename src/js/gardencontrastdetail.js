$(function () {
    //第一个echart
    createEchartOption(document.getElementById('echart1'))
    createEchartOption(document.getElementById('echart2'))
    createEchartOption(document.getElementById('echart3'))

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