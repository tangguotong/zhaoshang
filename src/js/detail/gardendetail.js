/*
* creat by ayun to 2018/7/3
*
* */

/*园区评价*/


$(function(){
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
       if($(e.target).text() == "园区情报"){
           showecharts()
       }

    });
});

var sourceData = [{
    name: '马山县',
    sales: 7.89,
    services: 11.47
}, {
    name: '上林县',
    sales: 5.55,
    services: 10.45
}, {
    name: '隆安县',
    sales: 3.18,
    services: 10.61
}, {
    name: '宾阳县',
    sales: 6.81,
    services: 11.28
}, {
    name: '邕宁区',
    sales: 7.27,
    services: 13.12
}];

var seriesData = sourceData.map(function(item, index, array) {
    return {
        name: item['name'],
        value: [item['sales'], item['services']]
    }
});

var computeServicesAvgLine = function() {
    var sum = 0;
    sourceData.forEach(function(item) {
        sum += item['services']
    });
    return sum / sourceData.length
};

var computeSalesAvgLine = function() {
    var sum = 0;
    sourceData.forEach(function(item) {
        sum += item['sales']
    });
    return sum / sourceData.length
};
var avg = {
    servicesAvgLine: computeServicesAvgLine(),
    salesAvgLine: computeSalesAvgLine()
};
function showecharts(){
    var scatter=echarts.init(document.getElementById("scatter"));

    var option = {

        grid: {
            bottom: '10%',
            top:"5%"
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {
                show: true,
                type: 'cross',
                lineStyle: {
                    type: 'dashed',
                    width: 1
                },
            },
            formatter: function(obj) {
                if (obj.componentType == "series") {
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                        obj.name +
                        '</div>' +
                        '<span>' +
                        '新办率' +
                        '</span>' +
                        ' : ' + obj.data.value[1] + '%' +
                        '<br/>' +
                        '<span>' +
                        '注销率' +
                        '</span>' +
                        ' : ' + obj.data.value[0] + '%'
                }
            }
        },
        label: {
            normal: {
                show: true,
                position: 'bottom',
                formatter: function(params) {
                    return params.name
                }
            },
            emphasis: {
                show: true,
                position: 'bottom'
            }
        },
        yAxis: {

            min: 8,
            type: 'value',
            scale: true,
            axisLabel: {
                formatter: '{value} %'
            },

            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#000'
                }
            }
        },
        xAxis: {

            type: 'value',
            name: '社会评价声量',
            nameLocation: 'middle',
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#000'
                }
            }
        },

        series: [{
            type: 'scatter',
            data: seriesData,
            symbolSize: 10,
            itemStyle: {
                normal: {
                    color: "#367ce4",
                }
            },
            label: {
                normal: {
                    show: true,
                    color: '#367ce4',
                    formatter: function(sourceData) {
                        return sourceData.name;
                    },
                    position: 'right'
                }
            },
            markLine: {
                label: {
                    normal: {

                    }
                },
                lineStyle: {
                    normal: {
                        color: "#367ce4",
                        type: 'solid',
                        width: 1
                    },
                    emphasis: {
                        color: "#d9def7"
                    }
                },
                data: [{
                    xAxis: avg.salesAvgLine,

                    itemStyle: {
                        normal: {
                            color: "#b84a58",
                        }
                    }
                }, {
                    yAxis: avg.servicesAvgLine,

                    itemStyle: {
                        normal: {
                            color: "#b84a58",
                        }
                    }
                }]
            }
        }]
    };
    scatter.setOption(option);
}

