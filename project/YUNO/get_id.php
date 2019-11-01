<?php

  $name = $_POST["name"];
  $email = $_POST["email"];

  $sql_host = 'localhost';
  $sql_user = 'yuyeon';
  $sql_pw = '0607';
  $sql_dbName = 'yuno';

  $mysqli = new mysqli($sql_host, $sql_user, $sql_pw, $sql_dbName);

  if($mysqli->connect_error){
    die("fail".$mysqli->connect_error);
  }

  $sql = "select count(*) from user where name='$name' and email= '$email'";
  $result = $mysqli->query($sql);
  $row = $result->fetch_array();

  if($row[0] == 1){
    $sql = "select id from user where name='$name' and email= '$email'";
    $result = $mysqli->query($sql);
    $row = $result->fetch_array();
    echo "<script>alert('회원의 아이디는 $row[0] 입니다.'); location.href='./find_id.html'; </script>";
  }
  else{
    echo "<script>alert('회원 정보가 일치하지 않습니다.'); location.href='./find_id.html'; </script>";
  }

  $mysqli->close();

?>
