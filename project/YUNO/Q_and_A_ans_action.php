<?php
  $name = $_POST["name"];
  $title = $_POST["title"];
  $content = $_POST["content"];
  $date = date("Y-m-d H:i:s");
  $bor_number = $_POST["number"];

  $sql_host = 'localhost';
  $sql_user = 'yuyeon';
  $sql_pw = '0607';
  $sql_dbName = 'yuno';
  $mysqli = new mysqli($sql_host, $sql_user, $sql_pw, $sql_dbName);

  if($mysqli->connect_error){
    die("fail".$mysqli->connect_error);
  }

  $sql =  "insert into answer (num, name, title, content, firstDate, lastDate) values ('$bor_number', '$name', '$title', '$content', '$date', '$date')";

   if($mysqli->query($sql)){
     $sql = "update q_and_a set answer = 1 where num = '$bor_number'";
     if($mysqli->query($sql)){
       echo "<script>alert('답변 되었습니다.'); location.href='./Q_and_A_view_in.php?border_number=$bor_number'; </script>";
     }
   }

  $mysqli->close();
?>
