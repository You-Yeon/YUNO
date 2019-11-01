<?php

  $id = $_POST["id"];
  $email = $_POST["email"];
  $pass = $_POST["pass"];
  $date = date("Y-m-d H:i:s");

  $sql_host = 'localhost';
  $sql_user = 'yuyeon';
  $sql_pw = '0607';
  $sql_dbName = 'yuno';

  $mysqli = new mysqli($sql_host, $sql_user, $sql_pw, $sql_dbName);

  if($mysqli->connect_error){
    die("fail".$mysqli->connect_error);
  }

  $sql = "update user set pw = '$pass' where id='$id' and email= '$email'";

  if($mysqli->query($sql)){
    $sql = "update user set lastDate = '$date' where id='$id' and email= '$email'";
    if($mysqli->query($sql)){
          echo "<script>alert('비밀번호가 변경되었습니다.'); location.href='./main.html'; </script>";
    }
  }

  $mysqli->close();

?>
