/**
 * Created by xsc on 2018/1/14.
 */

// var param = '?reqUrl=' + encodeURIComponent(location.href);
// var url = 'http://101.132.101.195/weixin/signature/?data={"reqUrl":"' + encodeURIComponent(location.href) + "}";

var url = 'http://101.132.101.195/weixin/signature/?data=' + JSON.stringify({
        reqUrl: encodeURIComponent(location.href)
    });

$.ajax({
    type    : 'GET',
    url     : url,
    // data    : param,
    success : function(res){

        var resJson = JSON.parse(res);
        // console.log(JSON.parse(res));
        // console.log(resJson.data[0].timestamp);
        // console.log(resJson.data[0].noncestr);
        // console.log(resJson.data[0].signature);
        // alert('大家好啊')
        wx.config({
            debug: false,
            appId: 'wxd769270d8dab717d',
            timestamp: resJson.data[0].timestamp,
            nonceStr: resJson.data[0].noncestr,
            signature: resJson.data[0].signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ'
            ]
        });

        wx.ready(function () {

            // 分享到朋友圈
            wx.onMenuShareTimeline({
                title: '数字华容道_最强大脑第一关', // 分享标题
                link: 'http://www.pmneed.com/selfstudy/numescape/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://www.pmneed.com/selfstudy/numescape/share.jpg', // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    wx.config({
                        debug: false,
                        appId: 'wxd769270d8dab717d',
                        timestamp: '',
                        nonceStr: '',
                        signature: '',
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ'
                        ]
                    });
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            // 分享给朋友
            wx.onMenuShareAppMessage({
                title: '数字华容道_最强大脑第一关', // 分享标题
                desc: '最强大脑们最快20秒就完成了，你呢？', // 分享描述
                link: 'http://www.pmneed.com/selfstudy/numescape/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://www.pmneed.com/selfstudy/numescape/share.jpg', // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数

                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            // QQ
            wx.onMenuShareQQ({
                title: '数字华容道_最强大脑第一关', // 分享标题
                desc: '最强大脑们最快20秒就完成了，你呢？', // 分享描述
                link: 'http://www.pmneed.com/selfstudy/numescape/', // 分享链接
                imgUrl: 'http://www.pmneed.com/selfstudy/numescape/share.jpg', // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });

    },
    error: function(data) {
        alert('服务器开小差了');
    }
});

