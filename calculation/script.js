// script.js
function calculate(operator) {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
    let result = document.getElementById("calcResult");

    // 如果输入为空或者不是数字，则提醒用户
    if (isNaN(num1) || isNaN(num2)) {
        result.textContent = "请输入有效数字";
        return;
    }

    let calcResult;
    switch (operator) {
        case '+': 
            calcResult = num1 + num2; 
            break;
        case '-': 
            calcResult = num1 - num2; 
            break;
        case '*': 
            calcResult = num1 * num2; 
            break;
        case '/': 
            if (num2 === 0) {
                result.textContent = "不能除以 0";
                return;
            }
            calcResult = num1 / num2; 
            break;
        default:
            result.textContent = "未知错误";
            return;
    }

    // 显示计算结果（保留 2 位小数）
    result.textContent = calcResult.toFixed(2);
}


// html的onclick属性会自动把运算符号传递给JS的函数作为参数，而不用刻意指定。