<?php

  $id = $_POST["id"];
  $email = $_POST["email"];

  $sql_host = 'localhost';
  $sql_user = 'yuyeon';
  $sql_pw = '0607';
  $sql_dbName = 'yuno';

  $mysqli = new mysqli($sql_host, $sql_user, $sql_pw, $sql_dbName);

  if($mysqli->connect_error){
    die("fail".$mysqli->connect_error);
  }

  $sql = "select count(*) from user where id='$id' and email= '$email'";
  $result = $mysqli->query($sql);
  $row = $result->fetch_array();

  if($row[0] == 1){
    echo "<form name='temp' method='post' action='./change_pw.php'>\n";
    echo "<input type='hidden' name='id' value='$id'>\n";
    echo "<input type='hidden' name='email' value='$email'>\n";
    echo "</form>\n";
    ?>
    <script>document.temp.submit();</script>
    <?php
  }
  else{
    echo "<script>alert('회원 정보가 일치하지 않습니다.'); location.href='./find_pw.html'; </script>";
  }

  $mysqli->close();

?>
