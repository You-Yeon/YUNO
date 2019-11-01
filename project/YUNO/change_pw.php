<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <title>YUNO</title>

    <style>

      #jb-container {
        width: 940px;
        margin: 0px auto;
        padding: 20px;
        border: 5px solid #07C830;
        background-color: #DBFED6;
      }
      #jb-header {
        padding: 0px;
        margin-bottom: 20px;
        border: 5px solid #07C830;
        background-color: #2FE652;
      }
      #jb-content {
        width: 490px;
        height: 420px;
        padding: 10px;
        margin-bottom: 20px;
        float: left;
        background-color: #6DE688;
        border: 5px solid #07C830;
      }
      #jb-sidebar {
        width: 390px;
        height: 330px;
        padding: 5px;
        margin-bottom: 20px;
        float: right;
        background-color: #2FE652;
        border: 5px solid #07C830;
      }
      #jb-footer {
        clear: both;
        padding: 5px;
        background-color: #9AEBA9;
        border: 5px solid #07C830;
      }

      .dropdown > ul {
        padding: 0px;
        background-color: #07C830;
        border: 5px solid #07C830;
      }
      .dropdown > ul > li {
        display: inline-block;
        position: relative;
        padding: 20px;
        background-color: #2FE652;
      }
      .dropdown > ul > li > ul {
        position: absolute;
        margin-top: 20px;
        list-style-type: none;
        display: none;
        background-color: #2FE652;
      }
      .dropdown > ul > li > ul > li {
        width: 150px;
        margin: 5px;
        padding: 5px;
        border-bottom: 2px solid #FFF666;
        background-color: #02B343;
      }
      .dropdown > ul > li:hover > ul {
        position: absolute;
        display: block;
        background-color: #02B343;
      }
      .dropdown > ul > li:hover {
        background-color: #02B343;
      }

      img { display: block; margin: 0px auto; }
      a {text-decoration:none; text-shadow: -1.2px 0 black, 0 1.2px black, 1.2px 0 black, 0 -1.2px black;}
      tr {text-decoration:none; text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black; color:#FFF666; font-family:DungGeunMo; }

    </style>
  </head>
  <body>
    <?php

    $id = $_POST["id"];
    $email = $_POST["email"];

    if(!isset($id)){
      echo "<script>alert('잘못된 접근입니다.'); location.href='./main.html'; </script>";
    }
     ?>

    <div id="jb-container">

      <div id="jb-header" onclick="location.href='main.html'">
        <h1 > <img src="images/1.png" alt="My Image"></h1>
      </div>

      <div class="dropdown">
        <ul>
          <li>
            <a href="game_info.html"style="font-family:DungGeunMo;"><font color="#FFF666" size="5">게임 소개</font></a>
          </li>
          <li>
            <a href="game_rule.html"style="font-family:DungGeunMo;"><font color="#FFF666" size="5">게임 방법</font></a>
          </li>
          <li>
            <a style="font-family:DungGeunMo; pointer-events: none; cursor: default;"><font color="#FFF666" size="5">커뮤니티</font></a>
            <ul>
              <li><a href="free_community.php"style="font-family:DungGeunMo;"><font color="#FFF666" size="5">자유게시판</font></a></li>
              <li><a href="Q_and_A.php"style="font-family:DungGeunMo;"><font color="#FFF666" size="5">Q & A</font></a></li>
            </ul>
          </li>
        </ul>
      </div>

      <div id="jb-content">
        <br>
        <h2 align="center"><font style="font-family:DungGeunMo; text-decoration:none; text-shadow: -2.5px 0 black, 0 2.5px black, 2.5px 0 black, 0 -2.5px black;" size="6" color="#FFF666" >비밀번호 변경</font></h2>
        <form name="change_pw_form" method="post" id="change_pw_form" action="update_pw.php">

        <table style="padding:50px 30px 30px 10px;" width ="530" height="100" align = "center" cellspacing = "1">

          <tr>
           <td> <font size="5"/>* 새로운 비밀번호<br><br><br> </td>
           <td> <input type = "password" id="pass" name = "pass" size = "20" placeholder= " 4 ~ 20자리 입력하세요." pattern="[A-Za-z0-9~!@#$]{4,20}" maxlength="20" required pattern/> <br><br><br>
           <input type = "hidden" id = "id" name = "id" value = <?php echo $id; ?>></input>
           <input type = "hidden" id = "email" name = "email" value = <?php echo $email; ?>></input></td>

          </tr>

          <tr>
           <td> <font size="5"/>* 새로운 비밀번호 확인</td>
           <td> <input type = "password" id="che_pass" name = "che_pass" size = "20" placeholder= " 4 ~ 20자리 입력하세요." pattern="[A-Za-z0-9~!@#$]{4,20}" maxlength="20" required/> </td>
          </tr>

         <br/>
        </table>
        <h2 align="center">
          <input type = "submit" value = "비밀번호 변경" style="font-family:DungGeunMo; text-decoration:none; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; text-align:center; width:200px; height:40px; margin:5px; color:#FFF666; font-size:15pt; background-color: #07C830;"/>
        </h2>
      </form>
      </div>

      <div id="jb-sidebar">

        <h2>
          <form name="login_form" method="post" action="login_check.php">
            <fieldset style="border:3px solid #07C830; padding-left:20px; padding-right:10px; padding-bottom:20px; background-color: #6DE688;">

              <legend align="center"><font style="font-family:Dotspitch; text-decoration:none; text-shadow: -2.5px 0 black, 0 2.5px black, 2.5px 0 black, 0 -2.5px black;" size="7" color="#FFE165" >LOGIN</font></legend>
               <font style="font-family:Dotspitch; text-decoration:none; text-shadow: -1.2px 0 black, 0 1.2px black, 1.2px 0 black, 0 -1.2px black; padding:5px;" size="5" color="#FFF666"> ID : </font><input type="text" name="user_id" size="20" required/><br>
               <font style="font-family:Dotspitch; text-decoration:none; text-shadow: -1.2px 0 black, 0 1.2px black, 1.2px 0 black, 0 -1.2px black;" size="5" color="#FFF666" > PW : </font><input type="password" name="user_pass" size="20" required/>
              <input type="submit" value="LOGIN" style="text-align:center; width:100px; height:30px; margin:5px; color:#FFF666; font-size:12pt; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; background-color: #07C830;"/><br>
              <a href="register.html"style="font-family:DungGeunMo; margin-left:10px;"><font size="3" color="#FFF666" >회원가입 |</font></a>
              <a href="find_id.html"style="font-family:DungGeunMo;"><font size="3" color="#FF0F666" >아이디 찾기 |</font></a>
              <a href="find_pw.html"style="font-family:DungGeunMo;"><font size="3" color="#FFF666" >비밀번호 찾기</font></a>

           </fieldset>
         </form>
        </h2>

        <form name="game_start_form">
            <input type="button" onclick="off_start_click();" name="btn1" value="GAME START" color="#FFF666" style="font-family:Dotspitch; text-decoration:none; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black; text-align:center; width:380px; height:80px; margin:5px; color:#FFF666; font-size:35pt; background-color: #07C830;" >
        </form>

      </div>

      <div id="jb-footer">

        <p align="right" style="margin: 40px 15px 2px 0px; font-size:15px; color:#666666;">(주)유연한게임 대표이사 최유연 서울특별시 동작구 사당동 전화: 0000-0000 팩스:0000-000-0000 </p>
        <p align="right" style=" margin: 0px 15px 2px 0px; font-size:15px; color:#666666;">  E-mail: 000000000@naver.com 사업자등록번호 : 000-00-000000 </p>
        <p align="right" style=" margin: 0px 15px 10px 0px; font-size:15px; color:#666666;">ⓒ 2019 YUNO Corporation All Rights Reserved.</p>

      </div>
    </div>

    <script type="text/javascript">

    window.onload=function(){
     document.getElementById('change_pw_form').onsubmit=function(){
      var pass=document.getElementById('pass').value;
      var passCheck=document.getElementById('pass-check').value;

      if(pass!=passCheck){
       alert('비밀번호가 일치하지 않습니다.');
       document.getElementById('pass').value = "";
       document.getElementById('pass-check').value = "";

       return false;
      }
     }
    }

    function off_start_click() {
      alert("로그인을 한 후에 게임을 시작해주세요.");
    }

    </script>


  </body>
</html>
