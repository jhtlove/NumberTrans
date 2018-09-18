var checkedNum;

function checkNumber(elem) {
    //jquery对象?
    var element = $(elem);
    var text = element.val();
    var parsedNumber = parseFloat(text); //00.300 => 0.3   1.3a3 => 1.3
    // isNaN("1.3a3") //true
    // isNaN("1.") //false
    //0 在if 中会转换为 false
    if (isNaN(text)) {
        //substring() 不接受负的参数
        if (text.length >= 1) {
            var subString = text.substring(0, text.length - 1);
            var parsedSub = parseFloat(subString);
            if (!isNaN(subString)) {
                element.val(text.substring(0, text.length - 1)); //return [start,end)
                console.log("checked number:" + parsedSub);
                checkedNum = parsedSub;
                $("#output").val(getCounting(parsedNumber));
                return parsedSub;
            } else {
                element.val("");
                console.log("checked number is empty str");
                checkedNum = "";
                return "";
            }

        } else {
            element.val("");
            console.log("checked number is empty str");
            checkedNum = "";
            return "";
        }
    } else {
        console.log("checked number:" + parsedNumber);
        checkedNum = parsedNumber;
        $("#output").val(getCounting(parsedNumber));
        return parsedNumber;
    }
}

function checkNumberWithReg(elem) {
    var element = $(elem);
    var text = element.val();
    var reg1 = /^(\+|-)?[1-9]\d*$/; //非0整数
    var reg2 = /[0-9]\d*\.\d{0,3}$/; //alow 1. 只到角 分 厘   带小数
    var reg3 = /^0\.\d*$/; //allow 0. or 0.00000              纯小数
    var reg4 = /^0+$/; //allow 000                             零
    if (reg1.test(text)) {

    } else if (reg2.test(text)) {

    } else if (reg3.test(text)) {

    } else if (reg4.test(text)) {

    } else {

    }
}