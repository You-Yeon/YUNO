<?php
		$uname = $_GET["username"];

		$sql_host = 'localhost';
		$sql_user = 'yuyeon';
		$sql_pw = '0607';
		$sql_dbName = 'yuno';

		$mysqli = new mysqli($sql_host, $sql_user, $sql_pw, $sql_dbName);

		if($mysqli->connect_error){
			die("fail".$mysqli->connect_error);
		}

		$sql = "select count(*) from user where name='$uname'";
		$result = $mysqli->query($sql);
		$row = $result->fetch_array();

		if($row[0] == 1)
		{
?>
	<br><div style='font-family:"malgun gothic"; color:red; margin-left:130px;'><?php echo $uname; ?>는 중복된 닉네임입니다.</div>
  <script>window.opener.document.getElementById('chkname').value="0";</script>

<?php
	}else{
?>
  <br><div style='font-family:"malgun gothic"; margin-left:130px;'><?php echo $uname; ?>는 사용가능한 닉네임입니다.</div>
  <script>window.opener.document.getElementById('chkname').value="1";</script>

<?php
	}
	$mysqli->close();
?>

<button value="닫기" onclick="window.close()" color="#FFF666" style="font-family:DungGeunMo; text-decoration:none; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; text-align:center; width:100px; height:40px; margin:30px 0px 0px 190px; color:#FFF666; font-size:12pt; background-color: #07C830;">닫기</button>
<script>
</script>
