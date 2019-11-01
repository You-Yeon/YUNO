<?php

  $name = $_POST["name"];
  $title = $_POST["title"];
  $content = $_POST["content"];
  $date = date("Y-m-d H:i:s");

  $sql_host = 'localhost';
  $sql_user = 'yuyeon';
  $sql_pw = '0607';
  $sql_dbName = 'yuno';
  $mysqli = new mysqli($sql_host, $sql_user, $sql_pw, $sql_dbName);

  if($mysqli->connect_error){
    die("fail".$mysqli->connect_error);
  }

  $sql = "insert into q_and_a (title, content, name, answer, firstDate, lastDate) values ('$title','$content','$name',0,'$date','$date')";

  if($mysqli->query($sql)){
    echo "<script>alert('게시글이 작성되었습니다.'); location.href='./Q_and_A_in.php'; </script>";
  }

  $mysqli->close();
 ?>
