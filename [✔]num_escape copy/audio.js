/**
 * Created by xsc on 2018/1/14.
 */
function playCollisionSound(){

    // var audio = document.createElement("audio");
    var audio = document.getElementById('collideSound');
    audio.play();

    // 看浏览器支持什么格式
    // if ( audio.canPlayType("audio/ogg") ) {
    //     audio.src = "collision.ogg";
    // } else if ( audio.canPlayType("audio/wav") ) {
    //     audio.src = "collision.wav";
    // } else if ( audio.canPlayType("audio/mp3") ) {
    //     audio.src = "collision.mp3";
    // }

    // 普通浏览器
    // var play = function(){
    //     audio.play();
    //     // document.removeEventListener("touchstart",play, false);
    // };


    // 微信浏览器
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        WeixinJSBridge.invoke('getNetworkType', {}, function (res) {
            // 在这里拿到 e.err_msg, 这里面就包含了所有的网络类型
            // alert(res.err_msg);
            audio.play();
        });
    }

}


