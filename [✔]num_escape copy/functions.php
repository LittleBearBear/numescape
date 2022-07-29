<?php

    /**
     * Created by PhpStorm.
     * User: xsc
     * Date: 2018/1/21
     * Time: 下午4:10
     */

    // 1. 创建连接 - 连接指定数据库
    //     define('DB_HOST','localhost');
    //     define('DB_USER','root');
    //     define('DB_PWD' ,'root');
    //     define('DB_NAME','numEscape');

    define('DB_HOST','bdm261400419.my3w.com');
    define('DB_USER','bdm261400419');
    define('DB_PWD' ,'Pmneed1219');
    define('DB_NAME','bdm261400419_db');

    //    define('DB_HOST','101.132.101.195');
    //    define('DB_USER','root');
    //    define('DB_PWD' ,'xlpU0fN8');
    //    define('DB_NAME','huarongdao');


    /**
     * 获取客户端IP地
     */
    function GetClientIp(){
        $ip = FALSE;
        if(!empty($_SERVER["HTTP_CLIENT_IP"])){
            $ip = $_SERVER["HTTP_CLIENT_IP"];
        }
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
            $ips = explode (", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
            if($ip){
                array_unshift($ips, $ip); $ip = FALSE;
            }
            for($i = 0; $i < count($ips); $i++){
                if (!preg_match("^(10|172\.16|192\.168)\.", $ips[$i])){
                    $ip = $ips[$i];
                    break;
                }
            }
        }
        return($ip ? $ip : $_SERVER['REMOTE_ADDR']);
    }

    /* 路由 */

    function router($action,$level,$time){
        switch($action) {
            case 'init_percent_rank':
                init_percent_rank($level, $time);
                break;
            case 'init_data_list':
                init_data_list($level);
                break;
            case 'init_your_score':
                init_your_score($time, $level);
                break;
            default :
                break;
        }
    }

    // 存入成绩
    function save_score(){
        header( 'content-type:text/html; charset = utf-8' );

        $mysqli = new mysqli(DB_HOST,DB_USER,DB_PWD,DB_NAME);

    //    if( $mysqli -> connect_errno ){
    //        echo "数据库连接失败" . "<br>" . $mysqli -> connect_error . "<br>" ;
    //    } else {
    //        echo "数据库连接成功!" . "<br>" ;
    //    }

        $name = $_SERVER['HTTP_USER_AGENT'] . ' @ ' . GetClientIP();
        $time = $_POST['record'];
        $step = $_POST['step'];
        $level = $_POST['level'];

        // 2. 插入数据
        // $sql = "INSERT INTO rank (name, time, step) VALUES ( '". $name ."'，'". $time ."'，'". $step ."' )";
        $sql = "INSERT INTO rank(name, time, step, level) VALUES ('" . $name . "','" . $time . "','" . $step . "','" . $level . "')";
        // echo "检查语句 " . $sql . "<br>";

        if($mysqli->query($sql) === TRUE){
            echo "成绩提交成功！";
        } else {
            echo "成绩提交失败！" . "<br>" . $mysqli->error;
        }

        mysqli_close($mysqli);
    }


    // 查询前%多少
    function init_percent_rank($level, $time){
        /*
         * 1.
         * */
        //header( 'content-type:application/json; charset = utf-8' );
        // header( 'content-type:text/html; charset = utf-8' );

        $mysqli = new mysqli(DB_HOST,DB_USER,DB_PWD,DB_NAME);

        // 2. 查询数据
        // $sql = "SELECT id, name, time, step, create_time from rank WHERE level = '4' AND time != '0' ORDER BY time ASC LIMIT 10";
        $sql_1 = "SELECT COUNT(*) AS count FROM `rank`  WHERE level = " . $level . " AND time <= ". $time ." AND time != '0'";
        $sql_2 = "SELECT COUNT(*) AS count FROM `rank`  WHERE level = " . $level . " AND time != '0'";

        // echo "检查语句 " . $sql . "<br>";
        $result_1 = $mysqli->query($sql_1);
        $result_2 = $mysqli->query($sql_2);


        // 解析数据
        while($row_1 = $result_1->fetch_array()){
            // print_r($row);
            $data_1 = $row_1[0];
        }
        while($row_2 = $result_2->fetch_array()){
            // print_r($row);
            $data_2 = $row_2[0];
        }
        echo 100 * round(1 - ($data_1 / $data_2),2) . '%';


        mysqli_close($mysqli);
    }


    // 查排行榜
    function init_data_list($level){
        /*
         * 1.
         * */
        //header( 'content-type:application/json; charset = utf-8' );
        // header( 'content-type:text/html; charset = utf-8' );

        $mysqli = new mysqli(DB_HOST,DB_USER,DB_PWD,DB_NAME);

        $name = $_SERVER['HTTP_USER_AGENT'] . ' @ ' . GetClientIP();

        // 2. 查询数据
        $sql = "SELECT id, name, time, step, create_time from rank WHERE level = ". $level . " AND time != '0' ORDER BY time ASC LIMIT 10";
        //echo "检查语句 " . $sql . "<br>";
        $result = $mysqli->query($sql);
        //echo $result;

        // 解析数据
        while($row = $result->fetch_assoc()){
            // print_r($row);
            $data[] = $row;
        }
        $json = json_encode(array(
            "resultCode" => 200,
            "message" => "查询成功！",
            "data" => $data
        ));

        //转换成字符串JSON
        echo($json);

        mysqli_close($mysqli);
    }

    // 查询你的排名
    function init_your_score($time, $level){
        /*
         * 1.
         * */
        //header( 'content-type:application/json; charset = utf-8' );
        // header( 'content-type:text/html; charset = utf-8' );

        $mysqli = new mysqli(DB_HOST,DB_USER,DB_PWD,DB_NAME);

        $name = $_SERVER['HTTP_USER_AGENT'] . ' @ ' . GetClientIP();

        // 2. 查询数据
        // $sql = "SELECT id, name, time, step, create_time FROM rank WHERE level = ". $level ." AND time != '0' ORDER BY create_time DESC LIMIT 1";
        //    $sql = "SELECT id, name, time, step, create_time FROM rank WHERE name = '". $name . "' AND level = ". $level ." AND time != '0' ORDER BY create_time DESC LIMIT 1";
        //
        //    // echo $sql . '<br>';
        //
        //    //echo "检查语句 " . $sql . "<br>";
        //    $result = $mysqli->query($sql);
        //    // echo print_r($result) . '<br>';
        //
        //    // 解析数据
        //    while($row = $result->fetch_assoc()){
        //        // print_r($row);
        //        $data[] = $row;
        //    }
        //    $json = json_encode(array(
        //        "resultCode" => 200,
        //        "message" => "查询成功！",
        //        "data" => $data
        //    ));
        //
        //    echo($json);

        // 批量执行sql测试
        // $sql = "SET @id = 0; SELECT (@id:=@id+1) AS id, name, time, step, create_time from rank WHERE name = '". $name . "' AND time = '". $time . "' AND level = ". $level ." AND time != '0' ORDER BY `create_time` DESC LIMIT 1";
        //$query .= "SELECT (@id:=@id+1) AS id, name, time, step, create_time FROM rank WHERE name = '". $name . "' AND level = '". $level ."' AND time != '0' ORDER BY create_time DESC LIMIT 1";

        $query  = "SET @id = 0;";
        $query .= "SELECT id, name, time, create_time FROM 
                                  (SELECT (@id:=@id+1) AS id, name, time, create_time FROM 
                                      (SELECT id, name, time, step, create_time FROM rank 
                                          WHERE level = '" . $level . "' AND time != '0' ORDER BY time ASC) AS t1) 
                                  AS t2 
                                  WHERE name = '" . $name . "' 
                                  ORDER BY create_time DESC LIMIT 1;";

        /* execute multi query */
        if ($mysqli->multi_query($query)) {
            do {
                /* store first result set */
                if ($result = $mysqli->store_result()) {
                    while ($row = $result->fetch_assoc()) {
                        // printf("%s\n", $row[0]);
                        $data[] = $row;
                    }
                    $result->free();
                }
                /* print divider */
                if ($mysqli->more_results()) {
                    //printf("-----------------\n");
                }
                //$data[] = $result;
            } while ($mysqli->next_result());

            $json = json_encode(array(
                "resultCode" => 200,
                "message" => "查询成功！",
                "data" => $data
            ));
            echo($json);
        }

        //    $json = json_encode(array(
        //        "resultCode" => 200,
        //        "message" => "查询成功！",
        //        "data" => $data
        //    ));
        //
        //    echo($json);

        mysqli_close($mysqli);
    }



?>