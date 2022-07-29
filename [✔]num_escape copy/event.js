/**
 * Created by xsc on 2018/1/12.
 */

var that = this;
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

// 屏蔽默认的touchmove事件,在touchstart内记录手指的初始位置,在move事件内计算在y轴上的位移,再用代码控制窗口变动即可
// 在css内设置body的overflow-x为hidden.
document.addEventListener('touchstart', function(e){
    that.initY = e.targetTouches[0].pageY;
});

document.addEventListener('touchmove', function(e){
    e.preventDefault();
    // window.console.log(that.initY)
    var change = that.initY - e.targetTouches[0].pageY;
    if (change !== 0) {
        document.body.scrollTop += change;
    }
});

$('#goToRankPage').onclick = function () {
    console.log("here");
    goToRankPage( LEVEL );
}

function stopSlide(){
    $("body").on("touchmove",function(event){
        event.preventDefault();
    }, false);
}

$(document).keydown(function(event){

    switch( event.keyCode ){
        case 37: // left 当可以向左移动的时候，向左移动
            event.preventDefault();
            if( canMove( "left" ) ){
                step++;
                showStep();
                moveLeft();
                playCollisionSound();
                checkIfRightPosition();
                youWin();
            }
            // console.log(temp++);
            // console.log(board);
            break;
        case 38: // up
            event.preventDefault();
            if( canMove( "up" ) ){
                step++;
                showStep();
                moveUp();
                playCollisionSound();
                checkIfRightPosition();
                youWin();
            }
            break;
        case 39: // right
            event.preventDefault();
            if( canMove( "right" ) ){
                step++;
                showStep();
                moveRight();
                playCollisionSound();
                checkIfRightPosition();
                youWin();
            }
            // console.log(temp++);
            // console.log(board);
            break;
        case 40: // down
            event.preventDefault();
            if( canMove( "down" ) ){
                step++;
                showStep();
                moveDown();
                playCollisionSound();
                checkIfRightPosition();
                youWin();
            }
            break;
        default:
            break;
    }
});

// console.log(document);
// console.log(document.getElementById('#newGameBtn'));
// document.getElementById('newGameBtn').addEventListener('click', function(){
//     newGame();
// },false);

document.addEventListener('touchstart',function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    var RATIO_OF_DISTANCE = 0.05;
    var r = RATIO_OF_DISTANCE;

    if( Math.abs( deltax ) < r * screenWidth && Math.abs( deltay ) < r * screenWidth ){
        return;
    }


    if( Math.abs( deltax ) >= Math.abs( deltay ) ){

        if( deltax > 0 ){
            //move right
            if( canMove( "right" ) ){
                step++;
                playCollisionSound();
                showStep();
                moveRight();
                checkIfRightPosition();
                youWin();
            }
        }
        else{
            //move left
            if( canMove( "left" ) ){
                step++;
                playCollisionSound();
                showStep();
                moveLeft();
                checkIfRightPosition();
                youWin();

            }
        }
    }
    else{
        if( deltay > 0 ){
            //move down
            if( canMove( "down" ) ){
                step++;
                playCollisionSound();
                showStep();
                moveDown();
                checkIfRightPosition();
                youWin();
            }
        }
        else{
            //move up
            if( canMove( "up" ) ){
                step++;
                playCollisionSound();
                showStep();
                moveUp();
                checkIfRightPosition();
                youWin();
            }
        }
    }
});