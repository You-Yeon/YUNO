
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <title>YUNO</title>

    <style>
          table{
                  border-top: 1px solid #444444;
                  border-collapse: collapse;
          }
          tr{
                  border-bottom: 1px solid #444444;
                  padding: 10px;
          }
          td{
                  border-bottom: 1px solid #444444;
                  padding: 10px;
          }
          table .even{
                  background: #57E66A;
          }
          .text{
                  font-size: 15pt;
                  text-align:center;
                  padding-top:20px;
                  color:#000000;
          }
          a:link {font-size:18pt; color : #FFF666; text-decoration:none;}
          a:visited {font-size:18pt; color : #FFF666; text-decoration:none;}


      #jb-container {
        width: 1440px;
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
        width: 990px;
        height: 1000px;
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

    </style>
  </head>
  <body>

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
        <h2 align="center"><font style="font-family:DungGeunMo; text-decoration:none; text-shadow: -2.5px 0 black, 0 2.5px black, 2.5px 0 black, 0 -2.5px black;" size="6" color="#FFF666" >자유게시판</font></h2>

        <?php
          $connect = mysqli_connect('localhost', 'yuyeon', '0607', 'yuno') or die ("connect fail");
          $query ="select * from free_board order by num desc";
          $result = $connect->query($query);
          $total = mysqli_num_rows($result);

        ?>

        <table align = center>
        <thead align = "center">
        <tr>
        <td width = "50" align="center">번호</td>
        <td width = "500" align = "center">제목</td>
        <td width = "100" align = "center">작성자</td>
        <td width = "200" align = "center">날짜</td>
        <td width = "50" align = "center">조회수</td>
        </tr>
        </thead>

        <tbody>
        <?php
          while($rows = mysqli_fetch_assoc($result)){ //DB에 저장된 데이터 수 (열 기준)
            $cnt_com = "select * from comment where num = " .$rows['num'];
            $cnt_result = $connect->query($cnt_com);
            $cnt_rows = mysqli_num_rows($cnt_result);

            if($total%2==0){
        ?>          <tr class = "even">
        <?php   }
            else{
        ?>           <tr>
        <?php } ?>

            <td width = "50" align = "center"><?php echo $total?></td>
            <td width = "500" align = "center">
            <a href = "free_community_view.php?border_number=<?php echo $rows['num']?>">
            <?php echo $rows['title']?>
            <?php if($cnt_rows > 0){  ?>
                       <font color=#FF6B19 size=5>(<?php echo $cnt_rows?>)</font>
            <?php   } ?> </a></td>

            <td width = "100" align = "center"><?php echo $rows['name']?></td>
            <td width = "200" align = "center"><?php echo $rows['lastDate']?></td>
            <td width = "50" align = "center"><?php echo $rows['views']?></td>
            </tr>
        <?php
              $total--;
          }
        ?>
        </tbody>
        </table>


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


    <script>

         function off_start_click() {
            alert("로그인을 한 후에 게임을 시작해주세요.");
          }

    </script>

  </body>
</html>
