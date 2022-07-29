<?php

    require_once("functions.php");

    // 做个路由 action为url中的参数
    $action = $_GET['action'];
    $level = $_GET['level'];
    $time = '';
    //echo $action;

    // url参数对应执行的函数
//    switch($action) {
//        case 'init_data_list':
//            init_data_list($level);
//            break;
//    }

    router($action,$level,$time);

    // 单独测试用
    // 查排行榜
    // init_data_list();






?>