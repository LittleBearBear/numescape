/**
 * Created by xsc on 2018/1/15.
 */

function bodyScroll(event){
    event.preventDefault();
}

//var tempSavedMainHtml = [];

function goToRankPage(){

    // 游戏页移到旁边
    $('header').hide();
    $('#gridContainer').hide();
    $('footer').hide();

    // 禁止底层再滑动了
    //console.log(document.querySelector('#gridContainer'));
    //document.querySelector('#gridContainer').addEventListener('touchmove', bodyScroll, false);

    // 新增排行页外部元素
    var rankPage = document.querySelector('#rank') || '';
    if( rankPage === '' ){
        var divEle = document.createElement('div');
        divEle.id = 'rank';

        document.body.insertBefore(divEle,document.body.childNodes[0]);
        rankPage = document.getElementById('rank');
    }

    // 内部第一部分html元素
    var template1 = '<img class="exitBtn" src="exit@2x.png" alt="" >\
                     <div class="rankHeader">\
                        <h1 class="title">' + LEVEL + 'x' + LEVEL + ' 排行榜</h1>\
                     </div>';

    // 内部循环输出的元素
    var template2 = '<div class="topUsers">\
                        <span>{{order}}</span>\
                        <span>{{name}}</span>\
                        <span>{{score}}</span>\
                    </div>';

    // var template3 = '<div class="topUsers">\
    //                     <span>{{order}}</span>\
    //                     <span>{{name}}</span>\
    //                     <span>{{score}}</span>\
    //                 </div>';
    // 时间数据暂时不要
    //                  <span>{{step}}</span>\
    //                  <span>{{time}}</span>\

    // 汇总
    var html = '';
    //console.log(eleIndex);

    var userName; // 用户的 浏览器+IP唯一信息


    // 需要PHP里的数据
    searchData();

    function searchData() {

        // ajax访问的元素
        var search_url = "selectRank.php";
        // 其实就是 selectRank.php?action=init_data_list

        // url 中问号后面的参数 action，这个对象就是查询的参数
        var dataParam = {
            action: "init_data_list",
            level: LEVEL
        };

        $.ajax({
            type    : 'GET',
            url     : search_url,
            data    : dataParam,
            //dataType : 'json', // 加了这句就报错，真奇葩
            contentType: 'application/json; charset=utf-8',
            success : function(data){



                var jsonData;
                if( data !== '' ) {
                    // console.log(typeof data + '\n');
                    //console.log(data);
                    var index = data.indexOf('[');
                    // console.log(index);
                    if (index !== -1) {
                        data = data.substring(index, data.length - 1);
                        // console.log(data);
                        jsonData = JSON.parse(data);
                        // console.log(jsonData[0]);
                    } else {
                        jsonData = [];
                    }
                } else {
                    jsonData = [];
                }

                // 添加元素进html
                html += template1;

                /*************** your score this time ************/

                    // console.log(LEVEL, urTime);

                    // 取战胜了%的人
                var search_url = "selectYourScore.php";
                var dataParam = {
                    action : "init_your_score",
                    level  : LEVEL,
                    time   : urTime
                };

                var result = '';

                $.ajax({
                    type    : 'GET',
                    url     : search_url,
                    data    : dataParam,
                    async   : false,
                    contentType: 'application/json; charset=utf-8',
                    success : function(data2){

                        // console.log(data2);
                        var jsonData;
                        if( data2 !== '' ) {
                            // console.log(typeof data2 + '\n');
                            //console.log(data2);
                            var index = data2.indexOf('[');
                            // console.log(index);
                            if (index !== -1) {
                                data2 = data2.substring(index, data2.length - 1);
                                // console.log(data2);
                                jsonData = JSON.parse(data2);
                                // console.log(jsonData[0]);
                            } else {
                                jsonData = [];
                            }
                        } else {
                            jsonData = [];
                        }

                        // for( var t in jsonData){
                        //     console.log(jsonData[t]);
                        // }
                        console.log(jsonData);


                        // 添加元素进html
                        for( var i = 0; i < jsonData.length; i++){
                            console.log(jsonData.length);
                            var prefix = '我';
                            userName = jsonData[i]['name'];
                            console.log(userName);
                            // console.log(jsonData[i]);
                            var _html2 = template2
                                .replace('{{order}}', '我上盘排名第' + jsonData[i]['id'])
                                .replace('{{name}}', '')
                                .replace('{{score}}', '用时' + jsonData[i]['time'] + '秒');
                            //  .replace('{{step}}', jsonData[i]['step'] + '步');
                            // .replace('{{time}}', jsonData[i]['create_time']);
                            result += _html2;

                        }
                    },
                    error: function(data) {
                        alert('服务器开小差了');
                    }
                });

                html += result;

                /**********************************************/

                for( var i = 0; i < jsonData.length; i++){
                    var prefix;
                    //console.log(jsonData[i]);
                    if( parseInt(jsonData[i]['id']) < 10 ){
                        prefix = '玩家_0';
                    } else {
                        prefix = '玩家_';
                    }
                    var userNameTemp = prefix + jsonData[i]['id'];
                    var order = i+1;
                    // if( order === 1 ){
                    //     order = '1  冠军';
                    // } else if ( order === 2 ){
                    //     order = '2  亚军';
                    // } else if ( order === 3 ){
                    //     order = '3  季军';
                    // }
                    var namePostfix = '';
                    if( order === 1 ){
                        namePostfix = '(冠军)';
                    } else if ( order === 2 ){
                        namePostfix = '(亚军)';
                    } else if ( order === 3 ){
                        namePostfix = '(季军)';
                    }

                    if( jsonData[i]['name'] === userName ){
                        userNameTemp = "我";
                    }

                    var _html = template2
                        .replace('{{order}}', order)
                        .replace('{{name}}', userNameTemp + namePostfix)
                        .replace('{{score}}', jsonData[i]['time'] + '秒');
                    //  .replace('{{step}}', jsonData[i]['step'] + '步');
                    // .replace('{{time}}', jsonData[i]['create_time']);
                    html += _html;
                }



                // console.log(html);
                // 把html填入
                rankPage.innerHTML = html;

                // 返回按钮与事件绑定
                var backBtn = document.querySelector('.exitBtn');
                //console.log(backBtn);
                backBtn.onclick = goBackToGamePage;

                // if(data.resultCode == 200) {
                //     console.log(data);
                // }

            },
            error: function(data) {
                alert('服务器开小差了');
            }
        });

    }

}

function goBackToGamePage(){

    // 1. 清空排名页
    var rankPage = document.querySelector('#rank');
    document.querySelector('body').removeChild(rankPage);

    // 底层又再滑动了
    // document.querySelector('#gridContainer').removeEventListener('touchmove', bodyScroll, false);

    // 2. 显示游戏主页
    $('header').show();
    $('#gridContainer').show();
    $('footer').show();

}


