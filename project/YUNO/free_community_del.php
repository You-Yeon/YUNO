<?php

  $connect = mysqli_connect('localhost', 'yuyeon', '0607', 'yuno') or die ("connect fail");
  $number = $_GET['border_number'];

  $query = "delete from comment where num = $number";
  $connect->query($query);

  $query = "delete from free_board where num = $number";
  $connect->query($query);

  echo "<script>alert('게시글이 삭제되었습니다.'); location.href='./free_community_in.php'; </script>";

?>
