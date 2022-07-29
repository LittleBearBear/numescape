<?php
    /**
     * Created by PhpStorm.
     * User: xsc
     * Date: 2018/1/15
     * Time: 上午12:48
     */

     /* MAMP 数据库通过terminal操作步骤
      * 1. 启动 MAMP
      * 2. 打开terminal
      * 3. 输入 /Applications/MAMP/Library/bin/mysql -uroot -p 密码root 进入数据库
      * 4. mysql> CREATE DATABASE numEscape DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
      * 5. mysql> USE numEscape;
      * 6. CREATE TABLE `rank` (
            `id`   INT(11)          NOT NULL AUTO_INCREMENT,
            `name` VARCHAR(255)              DEFAULT NULL,
            `time` INT(20)          NOT NULL DEFAULT '0',
            `step` SMALLINT(6)      NOT NULL DEFAULT '0',
            `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
             PRIMARY KEY (`id`)
           ) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8; SET FOREIGN_KEY_CHECKS=1;
      *
      * 7. 清空数据表，id重置 TRUNCATE TABLE rank;
      * */


    require_once("functions.php");

    // 存入成绩
    save_score();


?>