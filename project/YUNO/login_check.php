<?php
  session_start();

  $id = $_POST["user_id"];
  $pw = $_POST["user_pass"];

  $sql_host = 'localhost';
  $sql_user = 'yuyeon';
  $sql_pw = '0607';
  $sql_dbName = 'yuno';

  $mysqli = new mysqli($sql_host, $sql_user, $sql_pw, $sql_dbName);

  if($mysqli->connect_error){
    die("fail".$mysqli->connect_error);
  }

  $sql = "select count(*) from user where id='$id' and pw= '$pw'";
  $result = $mysqli->query($sql);
  $row = $result->fetch_array();

  if($row[0] == 1){

    $_SESSION['user_id'] = $id;

    $sql = "select name from user where id='$id' and pw= '$pw'";
    $result = $mysqli->query($sql);
    $row = $result->fetch_array();

    $_SESSION['user_name'] = $row[0];

    $sql = "select wins from user where id='$id' and pw= '$pw'";
    $result = $mysqli->query($sql);
    $row = $result->fetch_array();

    $_SESSION['user_wins'] = $row[0];

    $sql = "select losses from user where id='$id' and pw= '$pw'";
    $result = $mysqli->query($sql);
    $row = $result->fetch_array();

    $_SESSION['user_losses'] = $row[0];

    $sql = "select authority from user where id='$id' and pw= '$pw'";
    $result = $mysqli->query($sql);
    $row = $result->fetch_array();

    $_SESSION['user_authority'] = $row[0];

    ?>
    <meta http-equiv='refresh' content='0;url=main_in.php'>
    <?php
    // header("location:./main_in.php");
  }
  else{
    echo "<script>alert('회원 정보가 일치하지 않습니다.'); location.href='./main.html'; </script>";
  }

  $mysqli->close();

?>
