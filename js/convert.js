$(function () {
    $("#inputNumber")[0].focus();
});

function convertNumber(number) {
    if (0 <= number && number <= 9) {
        //零、壹、贰、叁、肆、伍、陆、柒、捌、玖
        switch (number) {
            case 0:
                return "零";
            case 1:
                return "壹";
            case 2:
                return "貳";
            case 3:
                return "叁";
            case 4:
                return "肆";
            case 5:
                return "伍";
            case 6:
                return "陸";
            case 7:
                return "柒";
            case 8:
                return "捌";
            case 9:
                return "玖";
        }
    } else {
        console.log("input number error:" + number);
        return 0;
    }
}

function getCounting(number) {
    //拾 伯 仟 万 亿
    var numberStr = "" + number;
    var pointPos = numberStr.indexOf(".");
    var integerPart = "";
    var result = "";
    var yuan = "";
    if (pointPos != -1) {
        //001.00
        //0.34
        yuan = "元";
        integerPart = parseInt(numberStr.substring(0, pointPos));
        var decimalPart = numberStr.substring(pointPos + 1);
        var resultDec = "";
        var resultInteger = "";
        if (integerPart && integerPart != 0) {
            resultInteger = parseIntPart(integerPart);
        }
        if (parseInt(decimalPart)) {
            resultDec = parseDecimalPart(decimalPart);
        }
        result = resultInteger + yuan + resultDec;
        console.log(result);
        if (result == "") {
            result = "零元整";
        }
        return result;
    } else {
        integerPart = parseInt(number);
        yuan = "元整";
        result = parseIntPart(integerPart);
        result = result + yuan;
        console.log(result);
        return result;
    }
}
//0
function parseIntPart(int) {
    if (int == 0) {
        return "零";
    }
    var unit = ["", "拾", "佰", "仟"]; //四位一级
    var unit2 = ["", "万", "亿", "兆"];
    var number = int;
    var numStr = "" + int;
    var numParts = [];
    while (numStr != "") {
        var len = numStr.length;
        if (len > 4) {
            //四位一级，从低位到高位
            numParts.push(numStr.substring(len - 4));
            numStr = numStr.substring(0, len - 4)
        } else {
            numParts.push(numStr);
            numStr = "";
        }
    }
    var result = "";
    var index = 0;
    //var parts = [];
    // 从低位开始分解
    for (var i = 0; i < numParts.length; i++) {
        var part = "";
        var theUnit2 = unit2[i]; //个 万 亿 兆
        var thePart = numParts[i];//分解四位的
        // 四位 1000 100 10 取模 10 ？
        var partLen = thePart.length;
        var isZero = true; // 处理末尾的零
        var hasMidZero = false;//处理中间的零
        //末位开始拆分
        for (var j = partLen - 1; j >= 0; j--) {
            var theUnit = unit[partLen - 1 - j];
            var singleNum = parseInt(thePart.charAt(j)); //拆分个单个数字
            var theNumber = convertNumber(singleNum); //某一位数字
            if (singleNum == 0) {
                // 末尾的0直接舍去
                // 中间的0
                if (!isZero) {
                    if (!hasMidZero) {
                        part = theNumber + part; //0 后面不带单位
                    }
                    hasMidZero = true;
                }
            } else {
                part = theNumber + theUnit + part;
                isZero = false;
            }
        }
        result = part + theUnit2 + result;
    }
    // result.replace(/零仟/g, "零");
    // result.replace(/零百/g, "零");
    //1 2345 0400
    //壹亿貳仟万叁伯万肆拾万伍万 零仟零伯零拾零   元  整
    //一亿两千三百四十五万元整
    console.log("integerPart:" + result);
    return result;
}

function parseDecimalPart(decimal) {
    var unit = ["角", "分"];
    var result = "";
    //从高位开始
    for (var j = 0; j < decimal.length; j++) {
        var singleNum = parseInt(decimal.charAt(j)); //拆分个单个数字
        var theNumber = convertNumber(singleNum);//某一位数字
        var theUnit = unit[j];
        if(singleNum == 0){
            result = result + theNumber; 
        }else{
            result = result + theNumber + theUnit; 
        }
        
    }
    return result;
}