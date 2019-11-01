<?php

  $id = $_POST["id"];
  $pw = $_POST["pass"];
  $email = $_POST["email"];
  $name = $_POST["name"];
  $date = date("Y-m-d H:i:s");

  $sql_host = 'localhost';
  $sql_user = 'yuyeon';
  $sql_pw = '0607';
  $sql_dbName = 'yuno';
  $mysqli = new mysqli($sql_host, $sql_user, $sql_pw, $sql_dbName);

  if($mysqli->connect_error){
    die("fail".$mysqli->connect_error);
  }

  $sql = "insert into user (id, pw, name, email, wins, losses, authority, firstDate, lastDate) values ('$id','$pw','$name','$email',0,0,0,'$date','$date')";

  if($mysqli->query($sql)){
    echo "<script>alert('회원가입이 완료되었습니다.'); location.href='./main.html'; </script>";
  }

  $mysqli->close();
 ?>
