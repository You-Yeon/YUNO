<?php

  $connect = mysqli_connect('localhost', 'yuyeon', '0607', 'yuno') or die ("connect fail");
  $bor_number = $_GET['border_number'];
  $ans_number = $_GET['answer_number'];

  $query = "delete from answer where id = $ans_number";
  $connect->query($query);

  $query = "update q_and_a set answer = 0 where num = '$bor_number'";
  $connect->query($query);

  echo "<script>alert('답변이 삭제되었습니다.'); location.href='./Q_and_A_view_in.php?border_number=$bor_number'; </script>";

?>
