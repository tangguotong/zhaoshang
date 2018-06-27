/**
 * create by ayun on 2018/6/27
 */

function isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
}

var data = [
    { name: '延安', value: 38 },
    { name: '山西', value: 39 },
    { name: '清远', value: 39 },
    { name: '中山', value: 39 },
    { name: '昆明', value: 39 },
    { name: '寿光', value: 40 },
    { name: '盘锦', value: 40 },
    { name: '长治', value: 41 },
    { name: '深圳', value: 41 },
    { name: '广东', value: 42 },
    { name: '大连', value: 47 },
    { name: '临汾', value: 47 },
    { name: '吴江', value: 47 },
    { name: '石嘴山', value: 49 },
    { name: '沈阳', value: 50 },
    { name: '苏州', value: 50 },
    { name: '茂名', value: 50 },
    { name: '嘉兴', value: 51 },
    { name: '长春', value: 51 },
    { name: '胶州', value: 52 },
    { name: '银川', value: 52 },
    { name: '张家港', value: 52 },
    { name: '三门峡', value: 53 },
    { name: '陕西', value: 55 },
    { name: '金坛', value: 56 },
    { name: '东营', value: 57 },
    { name: '牡丹江', value: 58 },
    { name: '遵义', value: 59 },
    { name: '绍兴', value: 60 },
    { name: '扬州', value: 61 },
    { name: '常州', value: 62 },
    { name: '潍坊', value: 63 },
    { name: '重庆', value: 64 },
    { name: '台州', value: 65 },
    { name: '渭南', value: 66 },
    { name: '马鞍山', value: 67 },
    { name: '宝鸡', value: 68 },
    { name: '焦作', value: 69 },
    { name: '句容', value: 71 },
    { name: '徐州', value: 72 },
    { name: '衡水', value: 73 },
    { name: '包头', value: 74 },
    { name: '绵阳', value: 75 },
    { name: '乌鲁木齐', value: 76 },
    { name: '兰州', value: 77 },
    { name: '沧州', value: 78 },
    { name: '临沂', value: 79 },
    { name: '宜昌', value: 80 },
    { name: '义乌', value: 81 },
    { name: '丽水', value: 82 },
    { name: '河南', value: 83 },
    { name: '秦皇岛', value: 85 },
    { name: '株洲', value: 86 },
    { name: '石家庄', value: 87 },
    { name: '莱芜', value: 88 },
    { name: '常德', value: 89 },
    { name: '保定', value: 90 },
    { name: '湘潭', value: 91 },
    { name: '金华', value: 92 },
    { name: '岳阳', value: 93 },
    { name: '湖南', value: 94 },
    { name: '衢州', value: 95 },
    { name: '廊坊', value: 96 },
    { name: '菏泽', value: 97 },
    { name: '安徽', value: 98 },
    { name: '湖北', value: 99 },
    { name: '北京', value: 100 }
];
var geoCoordMap = {
    '北京': [116.28, 39.54],
    '青岛': [120.19, 36.04],
    '天津': [117.10, 39.10],
    '河南': [113.42, 34.44],
    '郑州': [113.42, 34.44],
    '石家庄': [114.26, 38.03],
    '河北': [114.26, 38.03],
    '开封': [114.23, 34.52],
    '保定': [115.28, 38.53],
    '洛阳': [112.26, 34.43],
    '唐山': [118.09, 39.37],
    '许昌': [113.48, 34.00],
    '秦皇岛': [119.37, 39.54],
    '新乡': [113.54, 35.18],
    '张家口': [114.55, 40.51],
    '湖北': [114.20, 30.37],
    '武汉': [114.20, 30.37],
    '承德': [117.52, 40.59],
    '宜昌': [111.15, 30.42],
    '山西': [112.33, 37.51],
    '太原': [112.33, 37.51],
    '沙市': [112.17, 30.16],
    '大同': [113.13, 40.07],
    '湖南': [112.55, 28.12],
    '长沙': [112.55, 28.12],
    '临汾': [111.31, 36.05],
    '衡阳': [112.34, 26.55],
    '长治': [113.13, 36.05],
    '湘潭': [112.51, 27.54],
    '内蒙古': [111.38, 40.48],
    '呼和浩特': [111.38, 40.48],
    '常德': [111.39, 29.00],
    '包头': [110.00, 40.35],
    '广东': [113.18, 23.10],
    '广州': [113.18, 23.10],
    '海拉尔': [119.43, 49.14],
    '汕头': [116.40, 23.21],
    '辽宁': [123.23, 41.48],
    '沈阳': [123.23, 41.48],
    '韶关': [113.33, 24.48],
    '大连': [121.38, 38.54],
    '海口': [110.10, 20.03],
    '海南': [110.10, 20.03],
    '鞍山': [123.00, 41.04],
    '南宁': [108.21, 22.47],
    '锦州': [121.09, 41.09],
    '桂林': [110.10, 25.18],
    '吉林': [125.18, 43.55],
    '长春': [125.18, 43.55],
    '柳州': [109.19, 24.20],
    '吉林': [126.36, 43.48],
    '悟州': [111.18, 23.28],
    '黑龙江': [126.38, 45.45],
    '哈尔滨': [126.38, 45.45],
    '四川': [104.04, 30.39],
    '成都': [104.04, 30.39],
    '齐齐哈尔': [123.55, 47.22],
    '重庆': [106.33, 29.33],
    '牡丹江': [129.36, 44.35],
    '内江': [105.03, 29.35],
    '上海': [121.26, 31.12],
    '泸州': [105.27, 28.54],
    '江苏': [118.46, 32.03],
    '南京': [118.46, 32.03],
    '万县': [108.22, 30.48],
    '无锡': [120.18, 31.35],
    '贵州': [106.43, 26.34],
    '贵阳': [106.43, 26.34],
    '苏州': [120.39, 31.20],
    '遵义': [106.53, 27.45],
    '徐州': [117.12, 34.16],
    '云南': [102.42, 25.03],
    '昆明': [102.42, 25.03],
    '杭州': [120.10, 30.15],
    '浙江': [120.10, 30.15],
    '拉萨': [91.02, 29.39],
    '宁波': [121.34, 29.53],
    '日喀则': [88.49, 29.16],
    '温州': [120.38, 28.00],
    '陕西': [108.55, 34.15],
    '西安': [108.55, 34.15],
    '金华': [119.49, 29.10],
    '宝鸡': [107.09, 34.21],
    '安徽': [117.16, 31.51],
    '合肥': [117.16, 31.51],
    '延安': [109.26, 36.35],
    '芜湖': [118.20, 31.21],
    '甘肃': [103.50, 36.03],
    '兰州': [103.50, 36.03],
    '安庆': [117.02, 30.32],
    '天水': [105.33, 34.35],
    '福州': [119.19, 26.02],
    '福建': [119.19, 26.02],
    '酒泉': [98.30, 39.44],
    '厦门': [118.04, 24.26],
    '青海': [101.49, 36.37],
    '西宁': [101.49, 36.37],
    '泉州': [118.37, 24.54],
    '宁夏': [106.13, 38.28],
    '银川': [106.13, 38.28],
    '江西': [115.53, 28.41],
    '南昌': [115.53, 28.41],
    '新疆': [87.36, 43.46],
    '乌鲁木齐': [87.36, 43.46],
    '九江': [115.59, 29.43],
    '哈密': [93.27, 42.50],
    '赣州': [114.56, 25.51],
    '喀什': [75.59, 39.27],
    '山东': [117.02, 36.40],
    '济南': [117.02, 36.40],
    '和田': [79.55, 37.07],
    '烟台': [121.20, 37.33],
    '台湾': [121.31, 25.02],
    '台北': [121.31, 25.02]
};
var convertData = function (data) {
    var res = [];

    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (data[i].value > 500) {
            data[i].value = 500;
        }
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};
/*产业集群热力图*/

var industryMap = echarts.init(document.getElementById('map'), "customed");
var chinaOption = {


    tooltip: {
        // tooltip:{
        //     trigger: "item"
        // },
        show: true,
        formatter: function (data) {
            if (isArray(data.data['value'])) {
                return data.data["name"] + data.data['value'][2];
            } else {
                return data.data["name"] + data.data['value'];
            }

        }
    },

    visualMap: {
        seriesIndex: 0,
        min: 0,
        max: 100,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],        // 文本，默认为数值文本
        calculable: true,
        show: true,
        inRange: {
            color: ['#63ebfb','#3daee4','#227bd0']
        }
    },
    geo: {
        map: 'china',
        zoom: 1.2,
        label: {
            normal: {
                show: false,
                color: '#fff'
            },
            emphasis: {
                show: true,
                color: '#fff'
            }
        },
        itemStyle: {
            emphasis: {
                show: false,
                areaColor: '#fbfbfb',//地图背景图
                borderColor: '#b9b4b7'//选中的边框颜色
            }
        },
        roam: false,
    },
    series: [{
        type: 'map',
        mapType: 'china',
        zoom: 1.25,
        geoIndex: 0,
        label: {
            normal: {
                show: true
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            normal: {
                opacity: 1,
            },
            emphasis: {
                opacity: 1,
                show: false,
                areaColor: '',
                borderColor: ''
            }
        },
        roam: false,
        data: data
    }
    ]
};


industryMap.setOption(chinaOption);

/*前10排名*/
var topChart = echarts.init(document.getElementById("top"),"customed");
var TopOption = {
    color: ["#3ca1ff"],
    grid: {
        top: '0',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLabel: {
            show: false
        },
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'category',
        data: ['北京','上海','广州','深圳','重庆','郑州','海口','张家口','张家界','珠海']
    },
    series: [
        {
            name: '2011年',
            type: 'bar',
            barWidth: 10,
            legendHoverLink: false,
            label: {
                normal: {
                    show: true,
                    color: '#000',
                    position: 'right',
                    distance: 10,
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 10,
                    borderType: "solid",
                    barBorderRadius: [0,2,2,0],
                }
            },
            data: [18203, 23489, 29034, 104970, 131744, 630230,18203, 23489, 29034, 104970].sort(function(a,b){return a-b})
        }
    ]
};
topChart.setOption(TopOption);