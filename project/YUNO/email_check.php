<?php

  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $charactersLength = strlen($characters);
  $randomString = '';
  for ($i = 0; $i < 20; $i++) {
      $randomString .= $characters[rand(0, $charactersLength - 1)];
  }

	$email = $_GET["email"];

  require_once("PHPMailer/PHPMailerAutoload.php");

  $mail=new PHPMailer(true);
  $mail->IsSMTP();
  try {
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;
    $mail->Port = 465;
    $mail->SMTPSecure = "ssl";
    $mail->Username = "yuno20000607@gmail.com";
    $mail->Password = "0607yuno";

    $mail->CharSet = "utf-8";
    $mail->SetFrom("yuno20000607@gmail.com","YUNO");
    $mail->AddAddress($email);
    $mail->Subject = "인증 메일입니다.";
    $mail->MsgHTML("인증 번호는 " . $randomString);
    $mail->Send();
  } catch (phpmailerException $e) {

    echo $e->errorMessage();

  } catch (Exception $e) {

    echo $e->getMessage();

  }

?>

<br><div style='font-family:"malgun gothic"; margin-left:150px;'>메일이 발송되었습니다.</div></br>

<input type = "text" name = "text" id = "text" style=" margin-left:80px; "size = "30" placeholder= " 인증 번호를 입력해 주세요." maxlength="20"/>
<input type = "button" style=" margin-left:20px; " value = "인증확인" onclick = "Chk()"/>
<div id="temp" style="margin-top: 10px; margin-left:80px; width: 400px; height: 5px;"></div></br>

<button value="닫기" onclick="window.close()" color="#FFF666" style="font-family:DungGeunMo; text-decoration:none; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; text-align:center; width:100px; height:40px; margin:10px 0px 0px 190px; color:#FFF666; font-size:12pt; background-color: #07C830;">닫기</button>

<script>

  function Chk(){
    var text = document.getElementById("text").value;
    var value = "<?= $randomString; ?>";

    if(text == value){

      document.getElementById("temp").innerHTML = "<b><font color='blue' size='2pt'> 이메일 인증이 완료되었습니다. </font></b>"
      window.opener.document.getElementById('chkemail').value="1";
    }
    else{

      document.getElementById("temp").innerHTML = "<b><font color='red' size='2pt'> 인증번호가 일치하지 않습니다. </font></b>"
      window.opener.document.getElementById('chkemail').value="0";
    }
  }

</script>
