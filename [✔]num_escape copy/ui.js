/**
 * Created by xsc on 2018/1/12.
 */

var ROWS = 3; /* 以后可以做设定 本期写死 */
var COLS = 3;

// html层次的颜色:背景

// 颜色备选
// 粉色～#f19d9b
// 蓝色～#2e87c4
// 移动层 NUMBER_CELL_BK_COLOR
var NUMBER_CELL_BK_COLOR = "#c6f791";

// 次底层 GRID_CELL_BK_COLOR
var GRID_CELL_BK_COLOR = "#ccc0b3";

// 最底层 GRID_CONTAINER_BK_COLOR
var GRID_CONTAINER_BK_COLOR = "#f19d9b";

// font color
// 0
var ZERO_COLOR = "#eee4da";
// 1 ~ ROWS*COLS-1
var MOVABLE_NUM_COLOR = "#1c7264";

var RATIO_OF_SQUARE_AND_GAP = 5;
var r = RATIO_OF_SQUARE_AND_GAP;


// setBoardView
// 拿到屏幕的长和宽 有浏览器兼容问题
var screenHeight = getScreenHeight();
var screenWidth = getScreenWidth();
// console.log("screenHeight: " + screenHeight, "screenWidth: " + screenWidth);

// 这里这个数值还需要调整一下
var RATIO_OF_BOARD_OF_SCREEN = 0.94;
var size = getContainerSize() * RATIO_OF_BOARD_OF_SCREEN;

// 方块和间隙的大小
//
var squareWidth = size / ( COLS + 1/r * COLS + 1/r );
var gapWidth = squareWidth / r;
// console.log( "squareWidth: ", squareWidth, "gapWidth: ", gapWidth );

// 得到屏幕高
function getScreenHeight(){
    var screenHeight;
    if( document.body && document.body.clientHeight !== 0 ){
        screenHeight = document.body.clientHeight;
    } else {
        screenHeight = document.documentElement.clientHeight;
    }
    return screenHeight;
}

// 得到屏幕宽
function getScreenWidth(){
    var screenWidth;
    if( document.body && document.body.clientWidth !== 0 ){
        screenWidth = document.body.clientWidth;
    } else {
        screenWidth = document.documentElement.clientWidth;
    }
    return screenWidth;
}

// 根据屏幕高、宽计算合适的棋盘大小
function getContainerSize(){
    var size = (screenHeight >= screenWidth) ? screenWidth : screenHeight;
    //console.log("size: " + size);
    return size;
}

// 画次底层的格子 gridCell
// function paintGridCell(){
//     for(var row = 0; row < ROWS; row++){
//         for(var col = 0; col < COLS; col++){
//             var gridCell = $("#gridCell_" + row + "_" + col);
//             gridCell.css("top", getPosTop(row, col));
//             gridCell.css("left", getPosLeft(row, col));
//         }
//     }
// }


// 开始新游戏时，需要找到0元素，移除它的 .hidden 样式，
function removeLastZeroHidden(){
    // 去掉之前加的 0 样式
    for(var row = 0; row < ROWS; row++){
        for(var col = 0; col < COLS; col++){
            var zeroIdName = "numberCell_" + row + "_" + col;
            var zeroId = $("#" + zeroIdName);
            //console.log("remove last zero hidden: (", row, ",", col, ")");
            //console.log(zeroId);
            if( zeroId.hasClass('hidden') ){
                zeroId.removeClass('hidden');
            }
        }
    }
}

// 画board
function paintBoardView(){

    // 移除上一局0元素位置上的 .hidden 样式
    removeLastZeroHidden();

    var gridContainer = $("#gridContainer");

    // 由于用了绝对位置，棋盘不能盖住header 棋盘的起始Y = header高度
    var header = $('header');
    var headerHeight = header.css('height');
    // console.log(headerHeight);
    gridContainer.css("top", headerHeight);

    // 非移动端需要重新设置这几个数值
    var NOT_MOBILE_SIZE = 500;
    if( screenWidth > NOT_MOBILE_SIZE ){
        size = NOT_MOBILE_SIZE;
        squareWidth = size / ( COLS + 1/r * COLS + 1/r );
        gapWidth = squareWidth / r;
        var width = NOT_MOBILE_SIZE;
        var height = NOT_MOBILE_SIZE/COLS*ROWS;

        gridContainer.css('width', width + 'px');
        gridContainer.css('height', height + 'px');

        //重设帮助页
        var instruction = document.querySelector('#instruction');
        instruction.style.height = screenHeight + 'px';
        instruction.style.width = screenHeight/737*454 + 'px';
        console.log(header.css('left'));
        instruction.style.left = (screenWidth - width)/2 + 'px';

    }

    // 赋值外层grid container 大小
    // gridContainer.css('width', size);
    // gridContainer.css('height', size);
    gridContainer.css('width', COLS * squareWidth + (COLS + 1) * gapWidth);
    gridContainer.css('height', ROWS * squareWidth + (ROWS + 1) * gapWidth);
    gridContainer.css('padding', 0);

    // console.log("gridContainer: ", gridContainer);
    console.log("gridContainer Width: ", gridContainer.css('width'));
    console.log("gridContainer Height: ",gridContainer.css('height'));

    for(row = 0; row < ROWS; row++){
        for(col = 0; col < COLS; col++){

            // 1. 添加div
            gridContainer.append("<div class='numberCell'></div>");

            // 2. 给div赋id名字
            var idName = "numberCell_" + row + "_" + col;
            var numberCell = $(".numberCell:last");
            numberCell.attr('id', idName);
            var theNumberCell = $("#" + idName);

            //document.getElementById('"numberCell_" + row + "_" + col');
            var ele = document.getElementById(idName);
            //console.log(ele);
            ele.style.zIndex = 999;

            // 算出来的小正方形边长
            var tempW = squareWidth + 'px';
            // 算出来字的大小，并设置
            var fontSize = squareWidth * 0.6 + 'px';
            theNumberCell.css('font-size', fontSize);
            // theNumberCell.css('visibility', 'display');

            // 0 不显示动画
            if(board[row][col] === 0){
                // position
                theNumberCell.css('top',getPosTop(row,col));
                theNumberCell.css('left',getPosLeft(row,col));
                // style
                // console.log("squareWidth: ", tempW );
                theNumberCell.css('width',tempW );
                theNumberCell.css('height',tempW );
                // theNumberCell.css('background-color', GRID_CONTAINER_BK_COLOR);
                // theNumberCell.css('color', GRID_CONTAINER_BK_COLOR);

                // 为了让0不显示
                theNumberCell.addClass('hidden');
                // content
                theNumberCell.text(board[row][col]);
            // 其他数字显示
            } else {
                // position, animation start point
                theNumberCell.css('top',getPosTop(row,col) + squareWidth/2 );
                theNumberCell.css('left',getPosLeft(row,col) + squareWidth/2 );
                // style, animation start point
                theNumberCell.css('width', "0px" );
                theNumberCell.css('height', "0px" );
                theNumberCell.css('background-color',getNumberBackgroundColor( board[row][col] ));
                theNumberCell.css('color',getNumberColor( board[row][col] ));
                theNumberCell.css('line-height', tempW);
                // animation, animation end point
                theNumberCell.animate({
                    width: tempW ,
                    height: tempW ,
                    top: getPosTop(row, col),
                    left: getPosLeft(row, col)
                }, 160);
                // content
                theNumberCell.text(board[row][col]);
            }
        }
    }

    // 分配footer的位置
    // y(棋盘下面)ok x(居中) height(根据内容定义)
    var footer = document.querySelector('footer');
    // console.log(footer,goToRank);

    // y
    var gridHeight = parseInt(gridContainer.css('height'));
    var gridY = parseInt(gridContainer.css('top'));

    // 棋盘和排行榜按钮之间的差距
    var marginGap = 20;
    footer.style.top = gridHeight + gridY + marginGap + 'px';
    // console.log(gridHeight,gridY);
    // console.log(footer.style.top);

    // 为了使"排行榜"按钮居中的代码，现已通过CSS实现故可删去
    // var goToRank = document.getElementById('goToRankPage');
    // var goToRankWidth = goToRank.offsetWidth;
    // var goToRankLeft = (screenWidth - goToRankWidth)/2;
    // goToRank.style.left = goToRankLeft + 'px';
    // console.log(goToRankWidth, goToRankLeft, goToRank.style.left);

    // 3X3
    document.querySelector('#level1').onclick = function (event) {
        console.log("3X3");
        LEVEL = 3;
        //console.log(this);
        //if(this.value)

        // 清楚之前的元素
        for(row = 0; row < ROWS; row++){
            for(col = 0; col < COLS; col++){
                var id = "numberCell_" + row + "_" + col;
                var numCell = $(".numberCell:last");
                numCell.attr('id', id);
                var theNumCell = $("#" + id);
                // console.log(theNumCell);
                theNumCell.remove();
            }
        }
        // 重设参数与开始

        COLS = 3;
        ROWS = 3;
        size = getContainerSize() * RATIO_OF_BOARD_OF_SCREEN;
        squareWidth = size / ( COLS + 1/r * COLS + 1/r );
        gapWidth = squareWidth / r;
        newGame();
    };

    // 4X4
    document.querySelector('#level2').onclick = function (event) {
        console.log("4X4");
        LEVEL = 4;
        //console.log(this);
        //if(this.value)

        // 清楚之前的元素
        for(row = 0; row < ROWS; row++){
            for(col = 0; col < COLS; col++){
                var id = "numberCell_" + row + "_" + col;
                var numCell = $(".numberCell:last");
                numCell.attr('id', id);
                var theNumCell = $("#" + id);
                // console.log(theNumCell);
                theNumCell.remove();
            }
        }
        // 重设参数与开始
        COLS = 4;
        ROWS = 4;
        size = getContainerSize() * RATIO_OF_BOARD_OF_SCREEN;
        squareWidth = size / ( COLS + 1/r * COLS + 1/r );
        gapWidth = squareWidth / r;
        newGame();
    };

    // 5X5
    document.querySelector('#level3').onclick = function (event) {
        console.log("5X5");
        LEVEL = 5;
        //console.log(this);
        //if(this.value)

        // 清楚之前的元素
        for(row = 0; row < ROWS; row++){
            for(col = 0; col < COLS; col++){
                var id = "numberCell_" + row + "_" + col;
                var numCell = $(".numberCell:last");
                numCell.attr('id', id);
                var theNumCell = $("#" + id);
                // template2console.log(theNumCell);
                theNumCell.remove();
            }
        }
        // 重设参数与开始
        COLS = 5;
        ROWS = 5;
        size = getContainerSize() * RATIO_OF_BOARD_OF_SCREEN;
        squareWidth = size / ( COLS + 1/r * COLS + 1/r );
        gapWidth = squareWidth / r;
        newGame();
    };
}



// 先不做这个变色功能
// function changeFontColor( row, col, bool ) {
//     var color = (bool === true) ? "red" : MOVABLE_NUM_COLOR;
//     console.log(row, col, bool, color);
//     var idName = "numberCell_" + row + "_" + col;
//     var theNumberCell = $("#" + idName);
//     theNumberCell.css('color', color);
// }

function getPosTop( row, col ){
    var top = gapWidth + row * (gapWidth + squareWidth);
    //console.log("top: ", top);
    return top;
}

function getPosLeft( row, col ){
    var left = gapWidth + col * (gapWidth + squareWidth);
    //console.log("left: ", left);
    return left;
}

function getNumberBackgroundColor( number ){
    if( number >= 1 && number < COLS*ROWS ){
        return NUMBER_CELL_BK_COLOR;
    }
    return GRID_CONTAINER_BK_COLOR;
}

function getNumberColor( number ){
    if( number === 0 ) {
        return GRID_CONTAINER_BK_COLOR;
    }
    return MOVABLE_NUM_COLOR;
}