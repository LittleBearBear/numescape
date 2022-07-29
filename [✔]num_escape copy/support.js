/**
 * Created by xsc on 2018/1/10.
 */

// To Do
// 15. 想一下推广的方法： Q群 微信群 ／ 小游戏平台 ／ 护眼平台 ／ 接入广告
// 08. 分享 未解决 等待审核 或者找导
// 19. 整理代码，面向对象化？
// 20. 代码的压缩，防止太容易被窃取？
// 21. SEO的代码
// 22. 1. 微信登录 / 自动登录
// 23. 2. 排行榜调用头像和姓名

// Done
// 25. bug 记时的问题 ok
// 26. 秒数精确到.XX
// 27. 就位就变色 ok
// 11. 规则说明的按钮，新游戏的按钮调整（暂时不搞，可能会引发滑动问题）
// 13. 排行榜要分成3种
// 23. 上层操作下层的bug利用jQuery hide show解决了
// 22. 人群中的排名 ok
// 9. 日排行榜 ok
// 5. 是否有无解的情况，能保证一定有解 已解决，还是有问题 现在已解决 需要群论，没学过。。。 微积分 -> 线性代数 -> 群论...
//      http://mathworld.wolfram.com/15Puzzle.html
//      http://kevingong.com/Math/SixteenPuzzle.html
//      http://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html 这个写的不错
        /* 算法总结
         * 一个状态表示成一维的形式，求出除0之外所有数字的逆序数之和，也就是每个数字前面比它大的数字的个数的和，称为这个状态的逆序。
         */
//      http://blog.csdn.net/lthyxy/article/details/6636174 目前用的这个算法
// 12. 3X3 , 5X5 的选择 ok
// 6. 现在点开始游戏有 visibility的 bug ！！！ 已解决
// 7. 记得加百度统计 ！！！已解决

// 遇到的坑总结
// 1. jQuery $('#' + var) 是对的 $(var) 是错的
// 2. jQuery animate() 不能操控 color & backgroundColor
// 3. id被交换后要重新赋值，而且交换位置别忘了是交换
// 4. display:none 之后js无法操作
// 10. $_ajax的坑
// 14. 外层元素如果有margin，里面的元素就可以通过这个margin滑动，在里高<外高的情况下
// 16. 参考源代码 http://blog.csdn.net/linwh8/article/details/52906319 验证还原错误
// 17. 单页切换的做法现在做的很原始，如何做的更好？
// 18. 虽然用了jquery,但是很多地方对js更熟悉，用的还是js, 代码混合，是好还是不好呢？
// 22. 手机的事件写的不是很懂，想放在一个地方却没做到
// 24. PHP与SQL知识不够，Query不能一次执行多条SQL语句



// (3,3) -> 15 ...
function arrayDimension2to1( row, col ){
    return row * COLS + (col + 1) - 1;
}

/* 检查产生的随机数列是否是合理的，因为有可能出现恢复不到原图的情况 */
function check_random_isValid() {
    if( (COLS%2) === 0 ){
        var count = 0, row;
        for (var i = 0; i < COLS*ROWS; i++) {
            var num = generatedRanNums[i];
            if( num === 0 ){
                row = i/COLS + 1;
                continue;
            }
            for (var j = i+1; j < COLS*ROWS; j++) {
                if ( (generatedRanNums[j] < generatedRanNums[i]) && (generatedRanNums[j] !== 0) ) {
                    count++;
                }
            }
        }
        return !((count + row) % 2);
    } else {
        var sum = 0;
        for (var m = 0; m < COLS*ROWS; m++) {
            var num = generatedRanNums[m];
            if( num === 0 ){ continue; }
            for (var n = m+1; n < COLS*ROWS; n++) {
                if ( (generatedRanNums[n] < generatedRanNums[m]) && (generatedRanNums[n] !== 0) ) {
                    sum++;

                }
            }
        }
        if( (sum % 2) === 0 ){
            console.log("和与奇偶性: ", sum, sum%2);
            return true;
        }
        return false;
        //return (sum % 2);
    }
}

function getNoRepeatNums( num ){
    var initNums = [];

    // 1. 赋值数列 0~length-1初始值 0表示空
    for(var i = 0; i < num; i++){
        initNums[i] = i;
    }

    // console.log(initNums); ️
    // console.log(generatedRanNums);

    // 清空 generatedRandomNums
    generatedRanNums.splice(0,generatedRanNums.length);
    //console.log(generatedRanNums);

    for(i = 0; i < num; i++){

        // 2. 通过随机取到的剩下的index来取随机数,故取到的数字不会重复
        var index = Math.floor(Math.random()*(initNums.length));
        // console.log("index: ", index);
        // console.log("value:", initNums[index]);
        // console.log(initNums);
        // console.log("\n");

        // 3. 取到后添加到新的数组中
        generatedRanNums.push(initNums[index]);

        // 4. 干掉取到的数字
        initNums.splice(index,1);
        //console.log(initNums);

    }

    return generatedRanNums;
}

function setBoardRandomValue(){
    for(var row = 0; row < ROWS; row++){
        board[row] = [];
        for(var col = 0; col < COLS; col++){
            var indexTrans = arrayDimension2to1(row, col);
            // console.log(indexTrans);
            // console.log("generatedRanNums: ",generatedRanNums[indexTrans]);
            board[row][col] = generatedRanNums[indexTrans];

            // 首次需要拿到zero 暂时废弃
            // if(generatedRanNums[indexTrans] === 0){
            //     console.log("0 point: ", row, col);
            //     updateZeroPoint( row, col );
            // }
        }
    }

    temp++;
    // console.log("init board: ", board);
}

function updateBoardViewId( zerox, zeroy, changex, changey ){

    // 拿到元素
    var zeroELement = $('#numberCell_' + zerox + '_' + zeroy);
    var changePointElement = $('#numberCell_' + changex + '_' + changey);

    // 存储原id
    var zeroId = zeroELement.attr('id');
    var changePointId = changePointElement.attr('id');

    // 交换
    zeroELement.attr('id', changePointId);
    changePointElement.attr('id', zeroId);

}

function checkIfRightPosition(){
    var idName;
    var theNumberCell;
    for(var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            //console.log(board[row][col], arrayDimension2to1( row, col ));
            if( board[row][col] === (arrayDimension2to1(row, col)+1)){
                idName = "numberCell_" + row + "_" + col;
                theNumberCell = $("#" + idName);
                theNumberCell.css('background-color', '#76f2bd');
                //console.log("位置 (" + row, col + ") 已就位.");
            } else {
                idName = "numberCell_" + row + "_" + col;
                theNumberCell = $("#" + idName);
                theNumberCell.css('background-color', '#c6f791');
            }
        }
    }
}
