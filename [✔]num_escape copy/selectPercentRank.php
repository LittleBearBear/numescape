<?php

    require_once("functions.php");

    // 做个路由 action为url中的参数
    $action = $_GET['action'];
    $level = $_GET['level'];
    $time = $_GET['time'];
    //echo $action;

    // url参数对应执行的函数
//    switch($action) {
//        case 'init_percent_rank':
//            init_percent_rank($level, $time);
//            break;
//    }
    router($action,$level,$time);

    // 单独测试用
    // 查战胜了%多少的玩家
    //init_percent_rank();



?>