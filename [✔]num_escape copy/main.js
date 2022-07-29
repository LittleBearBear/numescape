/**
 * Created by xsc on 2018/1/10.
 */

$(function(){
    $(':input').labelauty();
});

var LEVEL = 3;

var board = [];
var generatedRanNums = [];
var score = 0;
var time = 0;

var temp = 0; // 测试用
var step = 0;

var gameTimes = 0;

// 帮助记录
var newGameStart = false;
var help = 0;
var count = false;

var urNowScore;
var urTime;

$(document).ready(function () {
    newGame();
});

function newGame(){
    // 初始化棋盘格并在格子中随机生成数字
    init();

}

function init(){

    if( help == 0 ){
        paintInstruction();
    }

    //newGameStart = true;

    gameTimes++;

    // 画按钮位置
    // setStartBtnPos();

    // 1. 画次底层的格子
    // paintGridCell();

    // 2. 生成对应格子数的随机数 必须是可解的
    var ranTimes = 0;
    while(true){
        getNoRepeatNums( ROWS*COLS );
        ranTimes++;
        if(check_random_isValid() || ranTimes > 100){
            break;
        }
    }
    console.log(generatedRanNums);

    // 3. 格子得到随机值
    setBoardRandomValue();

    // 4. 首次画出随机值格子
    paintBoardView();
    checkIfRightPosition();

    // 开始计时 放到帮助开始
    // if( help < 2 ){
        reset();
        start();
    // }

    // 清空步数
    clearStep();

    // for test
    // goToRankPage();

    // 5. 检查是否游戏结束
    youWin();



}

function canMove( direction ){

    var JUDGE;
    // up:1, down:2, left:3, right:4
    //      col0 col1 col2 col3
    // row0 x24  x2   x2   x23
    // row1 x4   *    *    x3
    // row2 x4   *    *    x3
    // row3 x14  x1   x1   x13

    switch ( direction ){
        case "left" :   // col = COLS-1
            JUDGE = COLS-1;
            break;
        case "right" :  // col = COL : 0
            JUDGE = 0;
            break;
        case "up" :     // row = ROWS-1
            JUDGE = ROWS-1;
            break;
        case "down" :   // row = ROW : 0
            JUDGE = 0;
            break;
        default :
            break;
    }

    for(var row = 0; row < ROWS; row++){
        for(var col = 0; col < COLS; col++){
            if( board[row][col] === 0 ){
                // 如果在左右
                if( direction === "left" || direction === "right" ){
                    return col !== JUDGE;
                // 如果在上下
                } else {
                    return row !== JUDGE;
                }
            }
        }
    }

}

function moveLeft(){
    for(var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            if (board[row][col] === 0) {
                // From (row,col+1) : X -> 0)
                //   To (row,col)   : 0 -> X
                // console.log("From : (" + row, col+1 +")");
                // console.log("To : (" + row, col +")");

                board[row][col] = board[row][col+1];
                board[row][col+1] = 0;
                // updateZeroPoint( row, col+1 );
                moveAnimation( row, col+1, row, col );
                moveWithoutAnimation( row, col, row, col+1 );
                updateBoardViewId( row, col+1, row, col );

                return 0;
            }
        }
    }
}

function moveRight(){
    for(var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            if (board[row][col] === 0) {
                // From (row,col-1) : X -> 0
                //   To (row,col)   : 0 -> X
                // console.log("From : (" + row, col-1 +")");
                // console.log("To : (" + row, col +")");

                board[row][col] = board[row][col-1];
                board[row][col-1] = 0;
                // updateZeroPoint( row, col-1 );
                moveAnimation( row, col-1, row, col );
                moveWithoutAnimation( row, col, row, col-1 );
                updateBoardViewId( row, col-1, row, col );
                return 0;
            }
        }
    }
}

function moveUp(){
    for(var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            if (board[row][col] === 0) {
                // From (row+1,col) : X -> 0
                //   To (row,col)   : 0 -> X
                // console.log("From : (" + (row+1), col +")");
                // console.log("To : (" + row, col +")");

                board[row][col] = board[row+1][col];
                board[row+1][col] = 0;
                // updateZeroPoint( row+1, col );
                moveAnimation( row+1, col, row, col );
                moveWithoutAnimation( row, col, row+1, col );
                updateBoardViewId( row+1, col, row, col );
                return 0;
            }
        }
    }
}

function moveDown(){
    for(var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            if (board[row][col] === 0) {
                // From (row-1,col) : X -> 0
                // To   (row  ,col) : 0 -> X
                // console.log("From : (" + (row-1), col +")");
                // console.log("To : (" + row, col +")");

                board[row][col] = board[row-1][col];
                board[row-1][col] = 0;
                // updateZeroPoint( row-1, col );
                moveAnimation( row-1, col, row, col );
                moveWithoutAnimation( row, col, row-1, col );
                updateBoardViewId( row-1, col, row, col );
                return 0;
            }
        }
    }
}

function ifWin(){
    for(var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            // console.log(board[row][col], (arrayDimension2to1(row,col)+1));
            if((arrayDimension2to1(row,col)+1) < COLS*ROWS){
                if( board[row][col] !== (arrayDimension2to1(row,col)+1) ){
                    //changeFontColor(row, col, false);
                    return false;
                } else {
                    //changeFontColor(row, col, true);
                    // console.log("bingo");
                }
            }
        }
    }
    return true;
}

function showStep(){
    $("#step").text(step);
}

function clearStep(){
    $("#step").text(0);
    step = 0;
}

function youWin(){
    if(ifWin()){

        // 禁止滑动
        stopSlide();

        // 向数据库写入记录
        var data = {};
        data["record"] = totalTime.toFixed(2);
        data["step"] = step;
        urTime = parseInt(data["record"]);
        data["level"] = LEVEL;
        writeScore( data );

        // 停止记时
        stop();

        // 显示记录用
        var record = data["record"];

        // 取战胜了%的人
        var search_url = "selectPercentRank.php";
        var dataParam = {
            action: "init_percent_rank",
            level: LEVEL,
            time: data["record"]
        };

        $.ajax({
            type    : 'GET',
            url     : search_url,
            data    : dataParam,
            contentType: 'application/json; charset=utf-8',
            success : function(data){
                var percent = data;
                alert("用时" + record + "秒。\n 恭喜你战胜了该等级" + percent + "的人！");
            },
            error: function(data) {
                alert('服务器开小差了');
            }
        });

        // 去相应等级的排名页
        goToRankPage();
    }
}

function writeScore( data ){
    $.ajax({
        type    : 'POST',
        url     : 'insertRank.php',
        data    : data,
        timeout : 2000,
        dataType: 'json',
        success : function(data){
            console.log("你的成绩为: " + data[score]);
    }});
}