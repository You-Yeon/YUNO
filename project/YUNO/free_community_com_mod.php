<?php

  $connect = mysqli_connect('localhost', 'yuyeon', '0607', 'yuno') or die ("connect fail");
  $bor_number = $_GET['border_number'];
  $id = $_GET['id'];
  $content = $_GET['content'];
  $date = date("Y-m-d H:i:s");

  echo $bor_number;
  echo $name;
  echo $id;
  echo $content;
  echo $date;


  $query = "update comment set content = '$content', lastDate = '$date' where id = '$id'";
  $connect->query($query);

  header("Location:./free_community_view_in.php?border_number=$bor_number");

?>
