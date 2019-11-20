<?php session_start(); ?>

<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <title>YUNO</title>

    <style>

    .view_table {
    border: 1px solid #444444;
    margin-top: 30px;
    }
    .view_title {
    height: 50px;
    font-size:20pt;
    text-align: center;
    background-color: #07C830;
    color: white;
    width: 1000px;
    }
    .view_id {
    text-align: center;
    background-color: #EEEEEE;
    width: 30px;
    }
    .view_id2 {
    background-color: white;
    width: 60px;
    }
    .view_hit {
    background-color: #EEEEEE;
    width: 30px;
    text-align: center;
    }
    .view_hit2 {
    background-color: white;
    width: 60px;
    }
    .view_content {
    padding: 20px;
    border-top: 1px solid #444444;
    height: 350px;
    }
    .view_btn {
    width: 980px;
    height: 70px;
    text-align: right;
    margin: auto;
    margin-top: 20px;
    }
    .view_btn1 {
    height: 50px;
    width: 120px;
    margin: 5px;
    font-size: 18pt;
    text-align: center;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    border: 1px solid black;
    font-family:DungGeunMo;
    color:#FFF666;
    background-color: #07C830;
    }
    .view_btn2 {
    height: 30px;
    width: 100px;
    margin: 5px;
    font-size: 10pt;
    text-align: center;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    border: 1px solid black;
    font-family:DungGeunMo;
    color:#FFF666;
    background-color: #07C830;
    }
    .view_comment_input {
    border-top: 1px solid #444444;
    width: 970px;
    height: 150px;
    text-align: center;
    margin: 5px;
    }
    .view_text3 {
    font-weight: bold;
    float: left;
    margin-left: 20px;
    }
    .view_com_id {
    width: 100px;
    }
    .view_comment {
    width: 500px;
    }

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
        height: 1500px;
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
        <h2 align="center"><font style="font-family:DungGeunMo; text-decoration:none; text-shadow: -2.5px 0 black, 0 2.5px black, 2.5px 0 black, 0 -2.5px black;" size="6" color="#FFF666" >자유게시판</font></h2>

            <?php
              $connect = mysqli_connect('localhost', 'yuyeon', '0607', 'yuno') or die ("connect fail");
              $number = $_GET['border_number'];

              $views = "update free_board set views =views+1 where num = $number";
              $connect->query($views);

              $query = "select title, content, Lastdate, views, name from free_board where num =$number";
              $result = $connect->query($query);
              $rows = mysqli_fetch_assoc($result);
            ?>

              <table class="view_table" align=center style="margin:10px;">
              <tr>
                      <td colspan="4" class="view_title"><?php echo $rows['title']?></td>
              </tr>
              <tr>
                      <td class="view_id">작성자</td>
                      <td class="view_id2"><?php echo $rows['name']?></td>
                      <td class="view_hit">조회수</td>
                      <td class="view_hit2"><?php echo $rows['views']?></td>
              </tr>

              <tr>
                      <td colspan="4" class="view_content" valign="top" bgcolor=#C4F9B8>
                      <?php echo $rows['content']?></td>
              </tr>
              </table>

              <div class="view_btn">
                <button class="view_btn1" onclick="location.href='./free_community_in.php'">목록으로</button>

                <?php if($rows['name'] == $user_name) {?>
                  <button class="view_btn1" onclick="location.href='./free_community_mod.php?border_number=<?php echo $number?>'">수정</button>
                <?php } ?>

                <?php if($rows['name'] == $user_name || $user_authority == 1 ) {?>
                  <button class="view_btn1" onclick="location.href='./free_community_del.php?border_number=<?php echo $number?>'">삭제</button>
                <?php } ?>

              </div>

              <table class="view_comment_input" align=center style="margin:10px;">
              <tr>
                  <td><textarea id= "com_content" name = content cols=80 rows=4 style="width:750px; height:80px;" placeholder="댓글을 입력하세요."></textarea></td>
                  <td><input type="button" onclick= "com_input()" value="SEND" color="#FFF666" style="font-family:Dotspitch; text-decoration:none; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black; text-align:center; width:200px; height:80px; color:#FFF666; font-size:22pt; background-color: #07C830;"> </td>
              </tr>
              </table>

              <table id= "com_table" align=center border="1" style="border-collapse:collapse; border:1px black; ">

                  <?php

                  $query ="select * from comment where num =$number order by id desc";
                  $result = $connect->query($query);
                  $total = mysqli_num_rows($result);

                  while($rows = mysqli_fetch_assoc($result)){ //DB에 저장된 데이터 수 (열 기준)
                    ?>

                    <tr id= <?php echo $total?> >
                    <td style="padding:5px;"width = "50" align = "center"><?php echo $total?></td>
                    <td width = "100" align = "center"><?php echo $rows['name']?></td>
                    <td id= "com_<?php echo $total?>" width = "500" align = "center"><?php echo $rows['content']?></td>
                    <td width = "180" align = "center"><?php echo $rows['lastDate']?></td>
                    <td width = "100" align = "center">
                      <input type ="hidden" id= "com_mod_bool_<?php echo $total?>" name= "com_mod_bool" value="0">
                      <input type ="hidden" id= "com_id_<?php echo $total?>" name= "com_id" value=<?php echo $rows['id']?>>
                      <?php if($rows['name'] == $user_name) {?>
                        <button class="view_btn2" onclick="add_mod(<?php echo $total?>)">수정</button>
                      <?php } ?>
                      <?php if($rows['name'] == $user_name || $user_authority == 1 ) {?>
                        <button class="view_btn2" onclick="location.href='./free_community_com_del.php?border_number=<?php echo $number?>&comment_num=<?php echo $rows['id']?>'">삭제</button>
                      <?php } ?>
                    </td>
                    </tr>

                <?php
                      $total--;
                  }
                ?>

              </table>

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

        <form name="game_start_form" action="http://localhost:9877/" method="post">
          <input type= "hidden" name="name" value = "<?php echo $user_name; ?>">
          <input type= "hidden" name="win" value = "<?php echo $user_wins; ?>">
          <input type= "hidden" name="lose" value = "<?php echo $user_losses; ?>">
          <input type="submit" name="btn1" value="GAME START" color="#FFF666" style="font-family:Dotspitch; text-decoration:none; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black; text-align:center; width:360px; height:80px; margin:5px; color:#FFF666; font-size:35pt; background-color: #07C830;" >
        </form>

      </div>

      <div id="jb-footer">

        <p align="right" style="margin: 40px 15px 2px 0px; font-size:15px; color:#666666;">(주)유연한게임 대표이사 최유연 서울특별시 동작구 사당동 전화: 0000-0000 팩스:0000-000-0000 </p>
        <p align="right" style=" margin: 0px 15px 2px 0px; font-size:15px; color:#666666;">  E-mail: 000000000@naver.com 사업자등록번호 : 000-00-000000 </p>
        <p align="right" style=" margin: 0px 15px 10px 0px; font-size:15px; color:#666666;">ⓒ 2019 YUNO Corporation All Rights Reserved.</p>

      </div>
    </div>


    <script>

        // function on_start_click() {
        //    alert("게임 시작");
        //  }

        function com_input(){
          var com_content = document.getElementById("com_content").value;
          location.href="./free_community_com_put.php?border_number=<?php echo $number?>&name=<?php echo $user_name?>&content=" + com_content;
        }

        function com_mod_input(x){
          var com_content = document.getElementById("com_mod_content_"+x).value;
          location.href="./free_community_com_mod.php?border_number=<?php echo $number?>&id="+document.getElementById("com_id_"+x).value +"&content=" + com_content;
        }

        function add_mod(x){
          var table = document.getElementById("com_table");
          var y = document.getElementById(x);

          if(document.getElementById("com_mod_bool_"+x).value == "0")
          {

            var new_row = table.insertRow(y.rowIndex+1);
            var cell1 = new_row.insertCell(0);
            var cell2 = new_row.insertCell(1);
            var cell3 = new_row.insertCell(2);

            var com_value = document.getElementById("com_"+x).innerText;
            document.getElementById("com_mod_bool_"+x).value = "1";

            cell1.innerHTML = '수정';
            cell1.style.cssText="padding-left:15px; text-allign:center;";
            cell2.innerHTML = '<textarea id= "com_mod_content_'+x+'" name = content cols=80 rows=4 style="width:750px; height:80px;" placeholder="댓글을 입력하세요.">'+com_value+'</textarea>';

            cell2.style.cssText="padding:15px; text-allign:center;";
            cell2.colSpan = 3;

            cell3.innerHTML = '<button class="view_btn2" onclick="com_mod_input('+x+')">완료</button><br> <button class="view_btn2" onclick="del_mod('+x+')">취소</button>';

          }
        }

        function del_mod(x){
          var table = document.getElementById("com_table");
          var y = document.getElementById(x);

          table.deleteRow(y.rowIndex+1);
          document.getElementById("com_mod_bool_"+x).value = "0";

        }

    </script>

  </body>
</html>
