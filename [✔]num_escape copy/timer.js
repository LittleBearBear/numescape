/**
 * Created by xsc on 2018/1/12.
 */
var hour,minute,second; //时 分 秒
hour = minute = second = 0; //初始化
var millisecond = 0; //毫秒
var totalTime = 0.0;
var int;

// 重置
function reset() {
    window.clearInterval(int);
    millisecond = hour = minute = second = 0;
    //document.getElementById('timetext').value = '00:00:00:000';
    $('#timetext').text = ('00:00');
    totalTime = 0.0; // 记得总时间要清0
}

// 开始
function start() {
    int = setInterval(timer,50);
}

// 计时
function timer() {
    millisecond = millisecond + 50;
    totalTime += 50/1000;

    if(millisecond >= 1000) {
        millisecond = 0;
        second = second + 1;
    }
    if(second >= 60) {
        second = 0;
        minute = minute + 1;
    }

    if(minute >= 60) {
        minute = 0;
        hour = hour + 1;
    }

    var showSecond = oneDigitCheck(second);
    var showMinute = oneDigitCheck(minute);
    //console.log(second);
    $('#timetext').text(showMinute + ':' + showSecond);
    // $('#timetext').text(hour + ':' + minute + ':' + second + ':' + millisecond);

}

function oneDigitCheck(sec) {
    // 如果返回值是一位的，前面加个0
    return (sec.toString().length === 1) ? ("0" + sec.toString()) : sec;
}

// 暂停
function stop()
{
    window.clearInterval(int);
    totalTime = 0.0; // 这个时候清0已晚
}