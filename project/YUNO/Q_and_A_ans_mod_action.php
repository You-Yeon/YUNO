<?php

  $title = $_POST["title"];
  $content = $_POST["content"];
  $date = date("Y-m-d H:i:s");
  $number = $_POST["number"];
  $id = $_POST["id"];

  $sql_host = 'localhost';
  $sql_user = 'yuyeon';
  $sql_pw = '0607';
  $sql_dbName = 'yuno';
  $mysqli = new mysqli($sql_host, $sql_user, $sql_pw, $sql_dbName);

  if($mysqli->connect_error){
    die("fail".$mysqli->connect_error);
  }

  $sql = "update answer set title = '$title', content = '$content', lastDate = '$date' where num = '$number' and id = '$id'";

  if($mysqli->query($sql)){
    echo "<script>alert('답변이 수정되었습니다.'); location.href='./Q_and_A_view_in.php?border_number= $number'; </script>";
  }

  $mysqli->close();
?>
