// script.js
let countdownTimer; // 计时器 ID
let timeLeft = 0;   // 剩余时间
let isPaused = false; // 是否暂停
// 设定全局变量是为了方便在函数之间传导

// 启动倒计时
function startCountdown() {
    clearInterval(countdownTimer); // 避免重复计时

    let inputTime = parseInt(document.getElementById("countdownInput").value);
    let display = document.getElementById("countdownDisplay");

    // 检查输入是否合法
    if (isNaN(inputTime) || inputTime <= 0) {
        display.textContent = "请输入有效的秒数";
        return;
    }

    timeLeft = inputTime; // 记录用户输入时间
    display.textContent = timeLeft;
    isPaused = false; // 确保不是暂停状态

    // 启动倒计时
    countdownTimer = setInterval(updateCountdown, 1000);
}

// 更新倒计时
function updateCountdown() {
    if (!isPaused && timeLeft > 0) {
        timeLeft--; // 每秒递减 1
        document.getElementById("countdownDisplay").textContent = timeLeft;
    }

    if (timeLeft <= 0) {
        clearInterval(countdownTimer);
        document.getElementById("countdownDisplay").textContent = "时间到！";
    }
}

// 暂停倒计时
function pauseCountdown() {
    isPaused = true; // 只暂停计时
    clearInterval(countdownTimer); // 停止当前的 setInterval
}

// 继续倒计时（修正版）
function resumeCountdown() {
    if (isPaused && timeLeft > 0) {
        clearInterval(countdownTimer); // 先清除已有的定时器，防止多次调用
        isPaused = false; // 恢复运行
        countdownTimer = setInterval(updateCountdown, 1000); // 重新启动计时
    }
}

// 重置倒计时
function resetCountdown() {
    clearInterval(countdownTimer); // 停止计时器
    timeLeft = 0; // 清除时间
    isPaused = false; // 取消暂停
    document.getElementById("countdownDisplay").textContent = "-"; // 重置显示
}