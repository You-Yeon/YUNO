<?php

  $connect = mysqli_connect('localhost', 'yuyeon', '0607', 'yuno') or die ("connect fail");
  $bor_number = $_GET['border_number'];
  $com_number = $_GET['comment_num'];

  $query = "delete from comment where id = $com_number";
  $connect->query($query);

  echo "<script>alert('댓글이 삭제되었습니다.'); location.href='./free_community_view_in.php?border_number=$bor_number'; </script>";

?>
