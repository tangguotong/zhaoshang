/**
 * 配置期望页面的公共js文件，存放配置期望页面公共的js函数
 */
function loadConfigExpectWordCloud(cloudConfigLevel, carStyle, wordCloudData) {
    switch (cloudConfigLevel) {
        case "一级配置":
            configurationFirst(carStyle, wordCloudData);
            break;
        case "二级配置":
            configurationSecond(carStyle, wordCloudData);
            break;
        default:
            configurationThird(carStyle, wordCloudData);
    }
}

var stage = null;
//配置期望云图
function configurationThird(carStyle, wordCloudData) {
    //自适应屏幕
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;

    var autoWidth = parseInt((1060 * screenWidth) / 1366);
    var autoHeight = parseInt((730 * screenHeight) / 768);

    $(".canvasConfig").height(autoHeight).width(autoWidth);

    var radius_a = parseInt((screenWidth * 120) / 1366);
    var radius_b = parseInt((screenWidth * 220) / 1366);
    var radius_c = parseInt((screenWidth * 320) / 1366);
    Array.prototype.max = function() {
        return Math.max.apply(Math, this);
    };
    Array.prototype.min = function() {
        return Math.min.apply(Math, this);
    }

    var wordCloudData = sort(wordCloudData);
    var data = {
        name: carStyle,
        value: 40,
        child: wordCloudData,
    }

    var width = $("#canvasConfig").width();
    var height = $("#canvasConfig").height();
    var cenX = width / 2;
    var cenY = height / 2;

    var x = 0,
        y = 0;
    var arrX = [],
        arrY = [],
        arrBx = [],
        arrBy = [];

    var layer = new Konva.Layer;
    drawCentreCircle(layer, data, cenX, cenY);

    if (!containsThirdInd(data)) {
        addNoData($(".konvajs-content"));
        $('#select-cloudConfigLevel').css({ 'display': 'none' });
        $(".che-right-icon").find('.active-icon').css({ 'display': 'none' });
    } else {
        $('#select-cloudConfigLevel').css({ 'display': 'inline-block' });
        $(".che-right-icon").find('.active-icon').css({ 'display': 'inline-block' });
        //一级配置的所有圆
        /*console.log(arrX);
        console.log(radius_a);*/
        drawFirstConfigurations(layer, data, cenX, cenY, arrX, arrY, radius_a);
        
        var dataArr = getTotalSubConfigOfAllFirstConfig(data);
        var sumItem = 0;
        for (var i = 0; i < dataArr.length; i++) {
            sumItem += dataArr[i];
        }
        var secondAngleSum = 0;
        var arrCx = [],
            arrCy = [];
        var thirdAngleSum = 0;
        var item = 0;

        for (var i = 0; i < dataArr.length; i++) {
            var proportion = (dataArr[i] / sumItem).toFixed(2); //计算每个一级配置所占的比重
            var angle_Two = parseInt(360 * proportion);
            var secondDataLength = data['child'][i]['child'].length;
            var secondAngle = parseInt(angle_Two / secondDataLength);
            //二级配置的圆 
            for (var j = 0; j < secondDataLength; j++) {
                secondAngleSum += secondAngle;
                centerCoord(secondAngleSum, radius_b, arrBx, arrBy, cenY, cenX);

                var _points = [arrX[i], arrY[i], arrBx[arrBx.length - 1],
                    arrBy[arrBy.length - 1]
                ];
                //画线      
                if (wordCloudData[i]["child"][j]["value"] != 0) {
                    var line = createLine(0, 0, _points, 1);
                    layer.add(line);
                    line.setZIndex(0);
                }
            }

            //三级圆
            var firstInd = data['child'][i];
            for (var k = 0; k < firstInd['child'].length; k++) {
                var secondInd = firstInd['child'][k];
                var thirdDataLength = secondInd['child'].length;
                item++;

                var thirdAngle = secondAngle / thirdDataLength;
                for (var a = 0; a < thirdDataLength; a++) {
                    thirdAngleSum += thirdAngle;
                    centerCoord(thirdAngleSum, radius_c, arrCx, arrCy, cenY, cenX);
                    var _points = [arrBx[item - 1], arrBy[item - 1],
                        arrCx[arrCx.length - 1], arrCy[arrCy.length - 1]
                    ];
                    //画线
                    if (secondInd["child"][a]["value"] != 0) {
                        var line = createLine(0, 0, _points, 1);
                        layer.add(line);
                    }
                }
            }
        };

        drawSecondConfigurations(layer, arrBx, arrBy, data);
        drawThirdConfigurations(layer, arrCx, arrCy, data);
        layer.draw();
    }
}


function configurationSecond(carStyle, wordCloudData) {
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;

    var autoWidth = parseInt((1060 * screenWidth) / 1366);
    var autoHeight = parseInt((730 * screenHeight) / 768);

    $(".canvasConfig").height(autoHeight).width(autoWidth);

    var radius_a = parseInt((screenWidth * 120) / 1366);
    var radius_b = parseInt((screenWidth * 220) / 1366);
    var radius_c = parseInt((screenWidth * 320) / 1366);
    Array.prototype.max = function() {
        return Math.max.apply(Math, this);
    };
    Array.prototype.min = function() {
        return Math.min.apply(Math, this);
    }
    var data = {
        name: carStyle,
        value: 40,
        child: wordCloudData
    }
    var width = $("#canvasConfig").width();
    var height = $("#canvasConfig").height();
    var cenX = width / 2;
    var cenY = height / 2;
    var arrX = [],
        arrY = [];
    var arrBx = [],
        arrBy = [];

    var layer = new Konva.Layer;
    drawCentreCircle(layer, data, cenX, cenY);

    var data_B_sum = 0;
    if (!containsSecondInd(data)) {
        addNoData($(".konvajs-content"));
        $('#select-cloudConfigLevel').css({ 'display': 'none' });
    } else {
        
        $('#select-cloudConfigLevel').css({ 'display': 'inline-block' }); 
        drawFirstConfigurations(layer, data, cenX, cenY, arrX, arrY,radius_a);
        drawFirstConfigurationLine(layer, arrBx, arrBy, data, cenX, cenY, arrX, arrY);
        drawSecondConfigurations(layer, arrBx, arrBy, data);
        layer.draw();
    }
}

function configurationFirst(carStyle, wordCloudData) {
     var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;

    var autoWidth = parseInt((1060 * screenWidth) / 1366);
    var autoHeight = parseInt((730 * screenHeight) / 768);

    $(".canvasConfig").height(autoHeight).width(autoWidth);

    var radius_a = parseInt((screenWidth * 120) / 1366);
    var radius_b = parseInt((screenWidth * 220) / 1366);
    var radius_c = parseInt((screenWidth * 320) / 1366);
    var data = {
        name: carStyle,
        value: 40,
        child: wordCloudData,
    }
    if (!containsSecondInd(data)) {
        //如果一级配置下面没有包含二级配置，那么一级配置显示"暂无数据"
        addNoData3($(".konvajs-content"));
        $('#select-cloudConfigLevel').css({ 'display': 'none' });
    } else {
        $('#select-cloudConfigLevel').css({ 'display': '' });
        var width = $("#canvasConfig").width();
        var height = $("#canvasConfig").height();
        var cenX = width / 2;
        var cenY = height / 2;
        var arrX = [],
            arrY = [];

        var layer = new Konva.Layer;
        drawCentreCircle(layer, data, cenX, cenY);
        console.log(arrX); 
        drawFirstConfigurations(layer, data, cenX, cenY, arrX, arrY,radius_a);
        layer.draw();
    }
}

// 计算圆心坐标的数组
function centerCoord(sumAngle, radius, arrX, arrY, cenY, cenX) {
    if (sumAngle >= 0 && sumAngle <= 90) {
        angleY = parseInt(Math.sin(sumAngle * Math.PI / 180) * radius);
        y = cenY - angleY;
        angleX = parseInt(Math.cos(sumAngle * Math.PI / 180) * radius);
        x = cenX - angleX;
    } else if (sumAngle > 90 && sumAngle <= 180) {
        sumAngle = 180 - sumAngle;
        angleY = parseInt(Math.sin(sumAngle * Math.PI / 180) * radius);
        y = cenY - angleY;

        angleX = parseInt(Math.cos(sumAngle * Math.PI / 180) * radius);
        x = cenX + angleX;
    } else if (sumAngle > 180 && sumAngle <= 270) {
        sumAngle -= 180;
        angleY = parseInt(Math.sin(sumAngle * Math.PI / 180) * radius);
        y = cenY + angleY;

        angleX = parseInt(Math.cos(sumAngle * Math.PI / 180) * radius);
        x = cenX + angleX;
    } else {
        sumAngle -= 270;
        angleX = parseInt(Math.sin(sumAngle * Math.PI / 180) * radius);
        x = cenX - angleX;

        angleY = parseInt(Math.cos(sumAngle * Math.PI / 180) * radius);
        y = cenY + angleY;
    }
    arrY.push(y);
    arrX.push(x);
}

/**
 * 判断data中是否包含三级指标
 * @param data
 */
function containsThirdInd(data) {
    var flag = false;
    if (data) {
        var firstIndArray = data.child;
        for (var i = 0; i < firstIndArray.length; i++) {
            var firstInd = firstIndArray[i];
            var secondIndArray = firstInd.child;
            if (secondIndArray) {
                for (var j = 0; j < secondIndArray.length; j++) {
                    var secondInd = secondIndArray[j];
                    var thirdIndArray = secondInd.child;
                    if (thirdIndArray) {
                        for (var k = 0; k < thirdIndArray.length; k++) {
                            if (thirdIndArray[k].name != '暂无数据') {
                                flag = true;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    return flag;
}

/**
 * 判断data中是否包含二级指标
 * @param data
 */
function containsSecondInd(data) {
    var flag = false;
    if (data) {
        var firstIndArray = data.child;
        for (var i = 0; i < firstIndArray.length; i++) {
            var firstInd = firstIndArray[i];
            var secondIndArray = firstInd.child;
            if (secondIndArray) {
                for (var j = 0; j < secondIndArray.length; j++) {
                    if (secondIndArray[j].name != '暂无数据') {
                        flag = true;
                        break;
                    }
                }
            }
        }
    }
    return flag;
}

/**
 * 创建云图需要的场景对象
 * @returns {Konva.Stage}
 */
function createStage() {
    var stage = new Konva.Stage({
        container: 'canvasConfig',
        width: $("#canvasConfig").width(),
        height: $("#canvasConfig").height()
    });

    return stage;
}

/**
 * 创建云图需要的圆
 * @param _x
 * @param _y
 * @param _radius
 * @param _fillColor
 * @returns {Konva.Circle}
 */
function createCircle(_x, _y, _radius, _fillColor, val, text) {
    var circle = new Konva.Circle({
        x: _x,
        y: _y,
        radius: _radius,
        fill: _fillColor,
    }).on("mouseenter", function() {
        $(".canvasConfig_span").text(text + " : " + val).css({
            display: "block",
            left: this.attrs.x + 15,
            top: this.attrs.y - 10
        })
    }).on("mouseleave", function() {
        $(".canvasConfig_span").css({
            display: "none"
        })
    })

    return circle;
}

/**
 * 创建Text对象
 * @param _x
 * @param _y
 * @param _align
 * @param _text
 * @param _fillColor
 * @param _width
 * @returns {Konva.Text}
 */
function createText(_x, _y, _align, _text, _fillColor, _width) {
    var txt = new Konva.Text({
        x: _x,
        y: _y,
        align: _align,
        text: _text,
        fontSize: 12,
        fill: _fillColor,
        fontFamily: 'Microsoft Yahei',
        width: _width,
    });

    return txt;
}

/**
 * 创建Line对象
 * @param _x
 * @param _y
 * @param _points
 * @param _tension
 * @returns {Konva.Line}
 */
function createLine(_x, _y, _points, _tension) {
    var line = new Konva.Line({
        x: _x,
        y: _y,
        points: _points,
        tension: _tension,
        stroke: '#e8e8e8',
        strokeWidth: 1
    });
    return line;
}

/**
 * 绘制云图的中心圆
 * @param layer
 * @param data
 * @param cenX
 * @param cenY
 */
function drawCentreCircle(layer, data, cenX, cenY) {
    stage = createStage();
    stage.add(layer);
    // var circle = createCircle(cenX, cenY, 50, '#517ac2');
    var circle = new Konva.Circle({
        x: cenX,
        y: cenY,
        radius: 50,
        fill: "#82b3f7",
    })
    for (var i in data) {
        var _x = cenX - 50;
        var _y = cenY - 5;
        var _width = circle.radius() * 2;
        var text = createText(_x, _y, 'center', data['name'], '#fff', _width);
    }
    layer.add(text);
    layer.add(circle);
    text.setZIndex(1);
    circle.setZIndex(0);
}

/**
 * 绘制一级配置的圆和文字
 * 
 * @param layer
 * @param data
 * @param cenX
 * @param cenY
 * @param arrX
 * @param arrY
 */
function drawFirstConfigurations(layer, data, cenX, cenY, arrX, arrY, radius_a) {

    var arr_val_one = [],
        arr_text_one = [];
    var angle = parseInt(360 / 10);
    var sumAngle = null;
    for (var i = 1; i <= 10; i++) {
        var firstConfig = data["child"][i - 1];
        if (firstConfig != null) {
            arr_val_one.push(firstConfig["indValue"]);
            arr_text_one.push(firstConfig["name"]);
            sumAngle = angle * i;
            /*console.log(arrX);        
            console.log(radius_a); */
            centerCoord(sumAngle, radius_a, arrX, arrY, cenY, cenX);
            //console.log(arrX);
        }
    }
    //var first_name = null;
    for (var j = 0; j < data['child'].length; j++) {
        var firstInd = data['child'][j];
        //console.log(arrX[j]);
        var circle = createCircle(arrX[j], arrY[j], firstInd.value, '#4ba7e8', arr_val_one[j], arr_text_one[j]);
        var _x = arrX[j] - firstInd.value;
        //console.log(_x);
        var _y = arrY[j] - 5;
        var _width = firstInd.value * 2;
        first_name = firstInd.name;
        /*if(firstInd.name.length>4){ 
            first_name = firstInd.name.slice(0, 1)+"..."+firstInd.name.slice(firstInd.name.length-1);
        }  */
        var text = createText(_x, _y, 'center', first_name, '#fff', _width);
        layer.add(circle);
        layer.add(text);
        circle.setZIndex(1);
    }
}

/**
 * 绘制二级配置的圆和文字
 * @param layer
 * @param arrBx
 * @param arrBy
 * @param data
 */
function drawSecondConfigurations(layer, arrBx, arrBy, data) {
    Array.prototype.max = function() {
        return Math.max.apply(Math, this);
    };
    Array.prototype.min = function() {
        return Math.min.apply(Math, this);
    }
    var arrB_Val = [],
        arrB_Text = [],
        arrB_val_two = [];
    for (var i = 0; i < data['child'].length; i++) {
        var firstInd = data['child'][i];
        for (var k = 0; k < firstInd['child'].length; k++) {
            var secondInd = firstInd['child'][k];
            arrB_Val.push(secondInd['value']);
            arrB_Text.push(secondInd['name']);
            arrB_val_two.push(secondInd["indValue"]);
        }
    }
    var arrBy_max = 0,
        arrBy_min = 0;
    for (var i = 0; i < arrBy.length; i++) {
        if (arrBy.max() === arrBy[i]) {
            arrBy_max = i;
        } else if (arrBy.min() === arrBy[i]) {
            arrBy_min = i;
        }
    }
    for (var i = 0; i < arrBx.length; i++) {
        var circle = createCircle(arrBx[i], arrBy[i], arrB_Val[i], '#5ac773', arrB_val_two[i], arrB_Text[i]);
        if (arrBx[i] === arrBx[arrBy_max]) {
            var _x = arrBx[i];
            var _y = arrBy[i] + arrB_Val[i] + 10;
        } else if (arrBx[i] < arrBx[arrBy_min]) {
            var _x = arrBx[i] - arrB_Text[i].length * 12 - 30;
            var _y = arrBy[i] - 5;
        } else if (arrBx[i] == arrBx[arrBy_min]) {
            var _x = arrBx[i];
            var _y = arrBy[i] - arrB_Val[i] - 15;
        } else if (arrBx[i] > arrBx[arrBy_min]) {
            var _x = arrBx[i] + arrB_Text[i].length + 20;
            var _y = arrBy[i] - 5;
        }

        var _width = arrB_Text[i].length * 12;
        if (arrB_Text[i] != "暂无数据") {
            var text = createText(_x, _y, 'center', arrB_Text[i], '#373636', _width);
            layer.add(circle);
            layer.add(text);
            circle.setZIndex(100);
            text.setZIndex(101);
        }
    }
}

/**
 * 绘制一级配置到二级配置的连线
 * @param layer
 * @param arrBx
 * @param arrBy
 * @param data
 * @param cenX
 * @param cenY
 * @param arrX
 * @param arrY
 */
function drawFirstConfigurationLine(layer, arrBx, arrBy, data,
    cenX, cenY, arrX, arrY) {
    var dataArr = [];
    for (var j = 0; j < data['child'].length; j++) {
        var firstInd = data['child'][j];
        dataArr.push(firstInd['child'].length);
    }
    var sumItem = 0;
    for (var i = 0; i < dataArr.length; i++) {
        sumItem += dataArr[i];
    }
    var secondAngleSum = 0;

    for (var i = 0; i < dataArr.length; i++) {
        var proportion = (dataArr[i] / sumItem).toFixed(2);
        var angle_Two = parseInt(360 * proportion);
        var secondDataLength = data['child'][i]['child'].length;
        var secondAngle = parseInt(angle_Two / secondDataLength);

        for (var j = 0; j < secondDataLength; j++) {
            secondAngleSum += secondAngle;
            centerCoord(secondAngleSum, 250, arrBx, arrBy, cenY, cenX);

            var _points = [arrX[i], arrY[i], arrBx[arrBx.length - 1],
                arrBy[arrBy.length - 1]
            ];

            if (data["child"][i]["child"][j]["value"] != 0) {
                var line = createLine(0, 0, _points, 0);
                layer.add(line);
                line.setZIndex(0);
            }
        }
    };
}

/**
 * 绘制三级配置的圆和文字
 * @param layer
 * @param arrCx
 * @param arrCy
 * @param data
 */
function drawThirdConfigurations(layer, arrCx, arrCy, data) {
    var arrCxMin = null,
        arrCxMax = null;
    var arrCxMin_2 = null,
        arrCxMax_2 = null,
        arrCxMax_3 = null,
        arrCxMin_2_right = null;
    var arr_val_three = [];
    for (var i = 0; i < arrCy.length; i++) {
        if (arrCy[i] == arrCy.max()) {
            arrCxMax = i;
            arrCxMax_2 = i + 1;
            arrCxMax_3 = i + 2;
            arrCxMin_2_right = i - 1;
        } else if (arrCy[i] == arrCy.min()) {
            arrCxMin = i;
            arrCxMin_2 = i - 1;
        }
    }

    var arrC_Val = [],
        arrC_Text = [];
    for (var i = 0; i < data['child'].length; i++) {
        var firstInd = data['child'][i];
        for (var k = 0; k < firstInd['child'].length; k++) {
            var secondInd = firstInd['child'][k];
            for (var n = 0; n < secondInd['child'].length; n++) {
                var thirdInd = secondInd['child'][n];
                arrC_Val.push(thirdInd['value']);
                arrC_Text.push(thirdInd['name']);
                arr_val_three.push(thirdInd['indValue'])
            }
        }
    }
    for (var i = 0; i < arrCy.length; i++) {
        var circle = createCircle(arrCx[i], arrCy[i], arrC_Val[i], '#ffb94b', arr_val_three[i], arrC_Text[i]);
        layer.add(circle);
        var text = null;
        var fillColor = '#000';
        if (arrC_Text[i] !== "暂无数据") {
            if (arrCx[i] == arrCx[arrCxMin_2]) {
                var _x = arrCx[i] - 12 * arrC_Text[i].length;
                var _y = arrCy[i] - 35;
                var _width = 12 * arrC_Text[i].length;
                text = createText(_x, _y, 'right', arrC_Text[i], fillColor, _width);
            } else if (arrCx[i] == arrCx[arrCxMin]) {
                var _x = arrCx[i];
                var _y = arrCy[i] - 40;
                var _width = 12 * arrC_Text[i].length;
                text = createText(_x, _y, 'left', arrC_Text[i], fillColor, _width);
            } else if (arrCx[i] == arrCx[arrCxMax_3]) {
                var _x = arrCx[i] - arrC_Text[i].length * 11;
                var _y = arrCy[i] + 15;
                var _width = 12 * arrC_Text[i].length;
                text = createText(_x, _y, 'left', arrC_Text[i], fillColor, _width);
            } else if (arrCx[i] == arrCx[arrCxMin_2_right]) {
                var _x = arrCx[i];
                var _y = arrCy[i] + 15;
                var _width = 12 * arrC_Text[i].length;
                text = createText(_x, _y, 'left', arrC_Text[i], fillColor, _width);
            } else if (arrCx[i] == arrCx[arrCxMax_2]) {
                var _x = arrCx[i] - 10 * arrC_Text[i].length;
                var _y = arrCy[i] + 20;
                var _width = 12 * arrC_Text[i].length;
                text = createText(_x, _y, 'left', arrC_Text[i], fillColor, _width);
            } else if (arrCx[i] < arrCx[arrCxMax]) {
                var _x = arrCx[i] - 12 * arrC_Text[i].length - 20;
                var _y = arrCy[i] - 6;
                var _width = 12 * arrC_Text[i].length;
                text = createText(_x, _y, 'right', arrC_Text[i], fillColor, _width);
            } else if (arrCx[i] == arrCx[arrCxMax]) {
                var _x = arrCx[i] - arrC_Text[i].length * 8;
                var _y = arrCy[i] + 20;
                var _width = 12 * arrC_Text[i].length;
                text = createText(_x, _y, 'left', arrC_Text[i], fillColor, _width);
            } else {
                var _x = arrCx[i] + 25;
                var _y = arrCy[i] - 5;
                var _width = 12 * arrC_Text[i].length;
                text = createText(_x, _y, 'left', arrC_Text[i], fillColor, _width);
            }
            layer.add(text);
        }
    }
}

/**
 * 获取所有的一级配置下每个一级配置下的子配置（包含二级配置和三级配置）的数量
 * @param data
 * @returns {Array}
 */
function getTotalSubConfigOfAllFirstConfig(data) {
    var dataArr = [];
    var data_A = 0,
        data_B = 0;
    var dataSum = 0;
    for (var j = 0; j < data['child'].length; j++) {
        var firstInd = data['child'][j];

        data_A = firstInd['child'].length; //指定一级配置下的二级配置的个数
        var numbre_B = 0; //指定一级配置下的所有三级配置的总数
        for (var k = 0; k < firstInd['child'].length; k++) {
            data_B = firstInd['child'][k]['child'].length; //获取指定二级配置下的三级配置的个数
            numbre_B += data_B;
        }
        dataSum = data_A + numbre_B;
        dataArr.push(dataSum);
    }

    return dataArr;
}

function drawSecondConfigurationLine(layer, firstInd, item, thirdAngleSum,
    secondAngle, arrBx, arrBy, arrCx, arrCy, cenX, cenY) {
    for (var k = 0; k < firstInd['child'].length; k++) {
        var secondInd = firstInd['child'][k];
        var thirdDataLength = secondInd['child'].length;
        item++;

        var thirdAngle = secondAngle / thirdDataLength;
        for (var a = 0; a < thirdDataLength; a++) {
            thirdAngleSum += thirdAngle;
            centerCoord(thirdAngleSum, 350, arrCx, arrCy, cenY, cenX);
            var _points = [arrBx[item - 1], arrBy[item - 1],
                arrCx[arrCx.length - 1], arrCy[arrCy.length - 1]
            ];
            var line = createLine(0, 0, _points, 1);
            layer.add(line);
        }
    }
}

//排序
function sort(data) {
    var sum = 0;
    var sum_one = 0;
    var arr = [];
    var arrEnd = [];
    for (var i = 0; i < data.length; i++) {
        sum_one = data[i]["child"].length;
        var sum_two = 0;
        for (var j = 0; j < data[i]["child"].length; j++) {
            sum_two += data[i]["child"][j]["child"].length;
        }
        sum = (sum_one + sum_two);
        arr.push(sum)
    }

    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                var tmpdata = data[j];
                data[j] = data[j + 1];
                data[j + 1] = tmpdata;
            }
        }
    }
    var num = Math.ceil(data.length / 2);
    var arrOne = [],
        arrTwo = [];
    for (var i = 0; i < num; i++) {
        arrOne.push(data[i]);
    }
    for (var i = num; i < data.length; i++) {
        arrTwo.push(data[i])
    }

    for (var i = 0; i < data.length; i++) {
        if (i % 2 === 0) {
            arrEnd[i] = arrOne[i / 2]
        } else {
            arrEnd[i] = arrTwo[arrTwo.length - Math.ceil(i / 2)]
        }
    }

    return arrEnd;
}
