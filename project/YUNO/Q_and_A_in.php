<?php session_start(); ?>

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
                  cursor: pointer;
                  font-family:DungGeunMo;
                  text-decoration:none;
                  text-shadow: -2.5px 0 black, 0 2.5px black, 2.5px 0 black, 0 -2.5px black;
                  font-size: 18pt;
                  text-align:center;
                  padding-top:20px;
                  color:#FFF666;
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
    <?php
      if(empty($_SESSION['user_id'])){
        echo "<script>alert('잘못된 접근입니다.'); location.href='./main.html'; </script>";
        exit;
      }

      $user_id = $_SESSION['user_id'];
      $user_name = $_SESSION['user_name'];
      $user_wins = $_SESSION['user_wins'];
      $user_losses = $_SESSION['user_losses'];
      $user_authority = $_SESSION['user_authority'];
    ?>
    <div id="jb-container">

      <div id="jb-header" onclick="location.href='main_in.php'">
        <h1 > <img src="images/1.png" alt="My Image"></h1>
      </div>

      <div class="dropdown">
        <ul>
          <li>
            <a href="game_info_in.php"style="font-family:DungGeunMo;"><font color="#FFF666" size="5">게임 소개</font></a>
          </li>
          <li>
            <a href="game_rule_in.php"style="font-family:DungGeunMo;"><font color="#FFF666" size="5">게임 방법</font></a>
          </li>
          <li>
            <a style="font-family:DungGeunMo; pointer-events: none; cursor: default;"><font color="#FFF666" size="5">커뮤니티</font></a>
            <ul>
              <li><a href="free_community_in.php"style="font-family:DungGeunMo;"><font color="#FFF666" size="5">자유게시판</font></a></li>
              <li><a href="Q_and_A_in.php"style="font-family:DungGeunMo;"><font color="#FFF666" size="5">Q & A</font></a></li>
            </ul>
          </li>
        </ul>
      </div>

      <div id="jb-content">
        <br>
        <h2 align="center"><font style="font-family:Dotspitch; text-decoration:none; text-shadow: -2.5px 0 black, 0 2.5px black, 2.5px 0 black, 0 -2.5px black;" size="6" color="#FFF666" >Q & A</font></h2>

        <?php
          $connect = mysqli_connect('localhost', 'yuyeon', '0607', 'yuno') or die ("connect fail");
          $query ="select * from q_and_a order by num desc";
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
        <td width = "60" align = "center">조회수</td>
        <td width = "50" align = "center">답변</td>
        </tr>
        </thead>

        <tbody>
        <?php
          while($rows = mysqli_fetch_assoc($result)){ //DB에 저장된 데이터 수 (열 기준)
            if($total%2==0){
        ?>          <tr class = "even">
        <?php   }
            else{
        ?>           <tr>
        <?php } ?>

            <td width = "50" align = "center"><?php echo $total?></td>
            <td width = "500" align = "center">
            <a href = "Q_and_A_view_in.php?border_number=<?php echo $rows['num']?>">
            <?php echo $rows['title']?></a></td>
            <td width = "100" align = "center"><?php echo $rows['name']?></td>
            <td width = "200" align = "center"><?php echo $rows['lastDate']?></td>
            <td width = "50" align = "center"><?php echo $rows['views']?></td>
            <td width = "50" align = "center">
              <?php if($rows['answer'] == 1 ) {?>
                <font style="font-family:Dotspitch; text-decoration:none; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;" size="3" color="#2EE81C " >[ Y ]</font>
              <?php } ?>
              <?php if($rows['answer'] == 0 ) {?>
                <font style="font-family:Dotspitch; text-decoration:none; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;" size="3" color="#EB3729" >[ N ]</font>
              <?php } ?>
            </td>
            </tr>
        <?php
              $total--;
          }
        ?>
        </tbody>
        </table>

        <div class = text>
        <font style="cursor: hand " onClick="location.href='./Q_and_A_write.php'">글쓰기</font>
        </div>

      </div>

      <div id="jb-sidebar">

        <h2>

            <fieldset style="border:3px solid #07C830; padding-left:20px; padding-right:10px; padding-bottom:20px; padding-bottom: 10px; background-color: #6DE688;">
              <legend align="center"><font style="font-family:Dotspitch; text-decoration:none; text-shadow: -2.5px 0 black, 0 2.5px black, 2.5px 0 black, 0 -2.5px black;" size="7" color="#FFE165" >WELCOME</font></legend>
              <font style="font-family:DungGeunMo; text-decoration:none; text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black; padding:2px;" size="5" color="#FFF666"> 닉네임: <?php echo $user_name; ?></font><br>
              <font style="font-family:DungGeunMo; text-decoration:none; text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black; padding:2px;" size="5" color="#FFF666" >전적 : <?php echo $user_wins; ?>승, <?php echo $user_losses; ?>패</font><br>
               <input type="button" onclick="location.href='./logout.php'" value="LOGOUT" color="#FFF666" style="font-family:Dotspitch; text-decoration:none; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black; text-align:center; width:100px; height:40px; margin:10px 0px 0px 250px; color:#FFF666; font-size:12pt; background-color: #07C830;" >
           </fieldset>

        </h2>

        <form name="game_start_form">
            <input type="button" onclick="on_start_click();" name="btn1" value="GAME START" color="#FFF666" style="font-family:Dotspitch; text-decoration:none; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black; text-align:center; width:380px; height:80px; margin:5px; color:#FFF666; font-size:35pt; background-color: #07C830;" >
        </form>

      </div>

      <div id="jb-footer">

        <p align="right" style="margin: 40px 15px 2px 0px; font-size:15px; color:#666666;">(주)유연한게임 대표이사 최유연 서울특별시 동작구 사당동 전화: 0000-0000 팩스:0000-000-0000 </p>
        <p align="right" style=" margin: 0px 15px 2px 0px; font-size:15px; color:#666666;">  E-mail: 000000000@naver.com 사업자등록번호 : 000-00-000000 </p>
        <p align="right" style=" margin: 0px 15px 10px 0px; font-size:15px; color:#666666;">ⓒ 2019 YUNO Corporation All Rights Reserved.</p>

      </div>
    </div>

    <script>

    function on_start_click() {
       alert("게임 시작");
     }

    </script>

  </body>
</html>
