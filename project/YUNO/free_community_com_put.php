<?php

  $connect = mysqli_connect('localhost', 'yuyeon', '0607', 'yuno') or die ("connect fail");
  $bor_number = $_GET['border_number'];
  $name = $_GET['name'];
  $content = $_GET['content'];
  $date = date("Y-m-d H:i:s");

  $query = "insert into comment (num, name, content, firstDate, lastDate) values ('$bor_number', '$name', '$content', '$date', '$date')";
  $connect->query($query);

  header("Location:./free_community_view_in.php?border_number=$bor_number");

?>
