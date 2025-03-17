// script.js
document.getElementById("tempInput").addEventListener("input", convertTemperature);
document.getElementById("unit").addEventListener("change", convertTemperature);

function convertTemperature() {
    let temp = parseFloat(document.getElementById("tempInput").value);
    let unit = document.getElementById("unit").value;
    let result = document.getElementById("result");

    // 如果输入不是数字，显示 "-"
    if (isNaN(temp)) {
        result.textContent = "-";
        return;
    }

    // 摄氏度 -> 华氏度
    if (unit === "C") {
        result.textContent = (temp * 9/5 + 32).toFixed(2) + "°F";
    }
    // 华氏度 -> 摄氏度
    else {
        result.textContent = ((temp - 32) * 5/9).toFixed(2) + "°C";
    }
}