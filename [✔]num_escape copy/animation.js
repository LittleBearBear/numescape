/**
 * Created by xsc on 2018/1/10.
 */
function moveAnimation(fromx, fromy, tox, toy){

    var numberCell = $("#numberCell_" + fromx + "_" + fromy);
    // console.log("Element: ", numberCell);
    // console.log("go From: top: ", numberCell.css("top"), "left: ", numberCell.css("left"));
    numberCell.animate({
        top : getPosTop(tox, toy),
        left : getPosLeft( tox, toy)
    }, 200);

}

function moveWithoutAnimation(fromx, fromy, tox, toy){

    var numberCell = $("#numberCell_" + fromx + "_" + fromy);
    numberCell.css("top", getPosTop(tox, toy));
    numberCell.css("left", getPosLeft( tox, toy));

}
