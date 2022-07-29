/**
 * Created by xsc on 2018/1/19.
 */
function paintInstruction(){
    var instruction = document.querySelector('#instruction');
    var instructionBK = document.querySelector('#instructionBK');

    $('#instructionBK').show();

    //console.log(document.querySelector('#instruction'));
    document.onclick = function(event){

        help++;

        $('#instructionBK').hide();

    };

    instruction.onclick = function(event){

        help++;

        $('#instructionBK').hide();
        //count = true;
    };

    instructionBK.onclick = function(event){

        help++;

        $('#instructionBK').hide();

        count = true;
        //开始计时 按任何按钮都会
        if(count){
            reset();
            start();
            clearStep();
            count = false;
        }
    };
}