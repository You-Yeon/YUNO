<?php

  $title = $_POST["title"];
  $content = $_POST["content"];
  $date = date("Y-m-d H:i:s");
  $number = $_POST["number"];

  $sql_host = 'localhost';
  $sql_user = 'yuyeon';
  $sql_pw = '0607';
  $sql_dbName = 'yuno';
  $mysqli = new mysqli($sql_host, $sql_user, $sql_pw, $sql_dbName);

  if($mysqli->connect_error){
    die("fail".$mysqli->connect_error);
  }

  $sql = "update free_board set title = '$title', content = '$content', lastDate = '$date' where num = '$number'";

  if($mysqli->query($sql)){
    echo "<script>alert('게시글이 수정되었습니다.'); location.href='./free_community_view_in.php?border_number= $number'; </script>";
  }

  $mysqli->close();
?>
