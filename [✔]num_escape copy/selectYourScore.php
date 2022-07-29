<?php

    // version mysql 5.1.73 2018-1-20

    require_once("functions.php");

    // 做个路由 action为url中的参数
    $action = $_GET['action'];
    $time = $_GET['time'];
    $level = $_GET['level'];
    //echo print_r($_GET['level']) . '<br>';

    // url参数对应执行的函数
//    switch($action) {
//        case 'init_your_score':
//            init_your_score($time, $level);
//            break;
//    }
    router($action,$level,$time);

    // 单独测试用
    // 查你上盘的分数
    // init_your_score($time, $level);





?>