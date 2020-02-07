YUNO
=============
> 온라인 카드 보드게임입니다.

📝 Introduction
------------
YUNO는 1971년에 나온 우노(UNO)를 모티브한 카드게임입니다.  
2~4명이 즐길 수 있는 온라인 카드게임입니다.  
*( 모든 assets은 직접 그렸습니다. )*

:computer: Developerment skill
------------
- 웹 서버 : Apache v2.4.41
- 라이브러리 : Socket.IO
- 언어 : HTML, CSS, PHP, JavaScript
- 데이터베이스 : MySQL v5.7.28
- 프로토콜 : WebSocket, HTTP
- 게임 엔진 : Phaser v3.17.0 
- IDE : Visual Studio Code  

:black_joker: Description
-----------
* ### 카드 게임  
  
    *( 이미지를 클릭하면 유튜브로 넘어갑니다. )*
      [![Yuno_capture](https://user-images.githubusercontent.com/44610250/69263797-5d6ec180-0c09-11ea-81e9-5572e6349435.png)](https://www.youtube.com/watch?v=Te5AyJLj8OY&feature=youtu.be)  
      
  - 게임 시작을 누르면 게임 방으로 이동합니다.   
    게임 방은 자동으로 생성이 되고 랜덤으로 유저가 게임방에 입장합니다.   
    유저가 입장하면 채팅창에 유저가 입장했다고 알립니다.  
    
      ![image](https://user-images.githubusercontent.com/44610250/69238210-c854d400-0bda-11ea-9b56-ef224ebd6e8e.png)  
      
  - 처음 입장한 사람이 host가 되고 host가 나가면 다음으로 입장한 유저가 host가 됩니다.  
    모든 유저가 ready를 해야 host는 게임을 실행할 수 있습니다.  
    ( 같은 브라우저는 쿠키 값을 공유하기 때문에 각각 다른 브라우저에서 테스트를 했습니다. )
    
      ![in_game](https://user-images.githubusercontent.com/44610250/69238932-74e38580-0bdc-11ea-891f-2388e50a478e.gif)  
      
  - 보드판에 대하여 설명하겠습니다.  
    + 보드판은 인원수에 따라 형태가 달라집니다.  
      그리고 해당 차례인 플레이어의 번호의 테두리가 노란색으로 변합니다. ( 아래의 그림에서는 플레이어 1이 턴 )  
      보드판에 있는 번호는 게임 방에 있었던 플레이어 번호입니다.  
      보드판에 있는 동그라미 화살표는 현재 게임 방향을 알려줍니다.  
      오른쪽 상단에 플레이어 번호와 플레이어 이름의 정보를 알려줍니다.   
  - 플레이어 카드에 마우스 커서를 올려두면 필드에 낼 수 있는 카드만 튀어나옵니다.  
    그럼 카드를 골라서 필드에 내면 됩니다.  
    
      ![image](https://user-images.githubusercontent.com/44610250/69239475-a7da4900-0bdd-11ea-9197-bb5fae9927e6.png)  
  - 게임 진행 순서는 호스트가 첫번째이고 그 다음은 플레이어 번호 순서대로 정렬됩니다.  
  
  - 게임은 처음엔 반시계방향으로 진행됩니다.  
  
  - 필드에 낼 수 있는 카드의 경우  
    +  숫자카드는 같은 색상이나 같은 숫자 카드인 경우에만 낼 수 있다.  
       스킾 카드는 같은 색상이나 같은 스킾 카드인 경우에만 낼 수 있다.  
       방향 카드는 같은 색상이나 같은 방향 카드인 경우에만 낼 수 있다.  
       2+ 폭탄 카드는 같은 색상이나 같은 폭탄 카드인 경우에만 낼 수 있다.  
       4+ 폭탄 카드나 색상 변경 카드는 어느때나 낼 수 있다.  
       ( 단 폭탄 카운트가 시작될 경우에는 폭탄 카드만 낼 수 있다. 아니면 더미 카드를 클릭하여 폭탄을 받는다. )  
       
       ![image](https://user-images.githubusercontent.com/44610250/69240416-c5101700-0bdf-11ea-9e45-8e56a269ee3f.png)

  - 폭탄 효과
    + 폭탄 카드를 내면 더미카드위에 폭탄 모양과 폭탄 카운트가 새겨집니다.  
      그리고 폭탄 모양이 그려진 더미카드를 누르게 되면 폭탄을 맞게되어 폭탄 카운트만큼 카드를 얻게됩니다.  
      
      ![bomb](https://user-images.githubusercontent.com/44610250/69240352-a01ba400-0bdf-11ea-948c-550e30654c68.gif)
      
  - 스킵 효과
    + 스킵 카드를 내면 다음 차례를 건너뛰게 됩니다.   
      2명이 플레이할 경우에는 상대방이 한명이기에 다시 본인차례로 돌아옵니다.  
      
      ![skip](https://user-images.githubusercontent.com/44610250/69240779-8fb7f900-0be0-11ea-9247-eab12c1d531a.gif)
      
  - 방향 바꾸기
    + 방향 카드를 내면 게임 진행 방향을 반대로 바꿉니다.  
      필드에 있는 동그라미 화살표가 시계방향으로 변합니다.  
      
      ![arrow](https://user-images.githubusercontent.com/44610250/69240973-0523c980-0be1-11ea-8eff-b590fc94d324.gif)
      
  - 색깔 바꾸기
    + 색깔 바꾸는 카드를 내면 색상을 고를 수 있는 보드가 나옵니다.  
      그럼 원하는 색상을 내면 다음 차례는 해당 색상으로 카드를 내야합니다.  
      ( 색상을 고르는 동안은 YUNO 버튼을 못누릅니다. )  
      
      ![color](https://user-images.githubusercontent.com/44610250/69241192-98f59580-0be1-11ea-849e-6ebbad6d88f8.gif)  
      
  - YUNO 버튼 
    + YUNO 버튼은 YUNO를 외친다고 생각하시면 됩니다.  
      YUNO를 외치면 어떤 플레이어가 외쳤는지 플레이어 번호에서 확인 가능합니다.  
      원카드라는 카드게임처럼 상대방이 한장이 남았을 때 원카드를 외치면 카드를 먹고,  
      본인이 한장이 남았을 때 원카드를 외치면 상대방이 원카드를 못외치는 것과 같습니다.  
      
    + 즉, YUNO를 외쳤을 때  
      상대방이 한장 남았으면 상대방이 카드를 두장 먹고,  
      본인이 한장 남았으면 쉴드 효과가 생깁니다.  
      둘 중 아무것도 아니라면 ( 실수라고 간주함. )  외친사람이 카드 두장을 먹습니다.  
      *( YUNO는 턴당 한번만 외칠 수 있습니다. )*  
      
      ![yuno_1](https://user-images.githubusercontent.com/44610250/69241816-ede5db80-0be2-11ea-8c31-80f3776ad7c1.gif)
      
  - 쉴드 효과
    + 쉴드 효과가 나타나면 상대방이 YUNO를 외쳐도 카드를 먹지 않습니다.  
      하지만 2장 이상으로 변하면 쉴드를 사라집니다.  
      
      ![yuno_2](https://user-images.githubusercontent.com/44610250/69242369-10c4bf80-0be4-11ea-93aa-d7b55c0cc451.gif)
      
  - 어택 효과
    + 어택 효과는 상대방이 카드를 두장 먹는 것을 말합니다.  
    
      ![yuno_3](https://user-images.githubusercontent.com/44610250/69242366-10c4bf80-0be4-11ea-99c8-d969f1fde648.gif)
      
  - 쉴드와 어택 중 선택하는 경우
    + 상대방도 한장이고 본인도 한장인 경우에는   
      쉴드 효과를 쓸 것인지, 어택 효과를 쓸 것인지 고를 수 있습니다.  
      
      ![yuno_4](https://user-images.githubusercontent.com/44610250/69242680-b5470180-0be4-11ea-9560-b0cd38935c47.gif)
      
  - 승패 처리
    + 플레이어의 카드가 0장이 되면 승리가 된다.  
      다른 플레이어는 패배가 된다.  
      그리고 오른쪽에 카드 점수 순서대로 랭크가 나온다.
      *(같은 점수면 같은 등수로 처리한다.)*
      
      ![end_1](https://user-images.githubusercontent.com/44610250/69256899-825d3780-0bfd-11ea-9d0c-17c3c29d3177.gif)
    
    + 점수 처리하는 방법은 숫자카드는 숫자대로 점수를 더하고 그 외의 카드는 20점을 추가한다.  
     
    + 만약 게임 플레이 도중 플레이어가 나가게 된다면,  
      카드를 점수로 처리해서 점수가 적은 순서로 랭크를 매기고 승패를 처리한다.  
      
      ![image](https://user-images.githubusercontent.com/44610250/69257818-0663ef00-0bff-11ea-9ac4-e3ef689a2fe1.png)
      
    + 나간 플레이어는 오른쪽 상단 플레이어들 정보에서 빨간색으로 이름이 표시되고 (disconnect)가 붙는다.  
    
    + 게임 플레이 도중 플레이어가 나가는 경우에는 공동 우승이 발생할 수 있다.  
    
      ![image](https://user-images.githubusercontent.com/44610250/69258199-95710700-0bff-11ea-8d3a-e500f1627e2a.png)
    
    +  승패가 결정되는 순간 서버단에서 DB에 승리 카운트나 패배 카운트를 1씩 update한다.  
      
  - 그 외 처리
    + 더미의 카드를 다 사용하면 필드에 쌓인 카드가 섞인 후, 더미카드 밑에 쌓인다.
    + 두 플레이어가 카드를 내지않고 계속 더미의 카드를 먹는 경우에는 필드에 쌓인 카드가 없기때문에 더미의 카드가 사라진다.
      그 이후에 카드를 내게되면 필드에 카드가 쌓이게 되므로 더미의 카드가 생긴다.
    + 쉴드와 어택 중 고르는 보드가 생성될 경우, 선택하기 전까지는 모든 플레이어가 YUNO 버튼, 카드, 더미를 낼 수 없다.  
    
      
<hr/>

* ### 게임 웹사이트
  - 로그인
    + 웹사이트 내에서 로그인이 가능합니다.  
    
      ![image](https://user-images.githubusercontent.com/44610250/69234241-05689880-0bd2-11ea-9511-5a78da6acd9e.png)  
    
  - 회원가입
    + 웹사이트 내에서 회원가입이 가능합니다.  
    
      ![image](https://user-images.githubusercontent.com/44610250/69234433-75771e80-0bd2-11ea-8e24-249bfbc65899.png)
    + 이메일 인증이 가능합니다. YUNO의 Gmail 계정에서 메일을 전송합니다. 
    
      ![image](https://user-images.githubusercontent.com/44610250/69234537-bf600480-0bd2-11ea-9a46-e0c929a6e4ab.png)

  - 아이디 찾기
    + 아이디를 잊어버렸을 경우 아이디 찾기가 가능합니다.  
    
      ![image](https://user-images.githubusercontent.com/44610250/69234595-e1f21d80-0bd2-11ea-8196-5856395c9841.png)
    
  - 비밀번호 찾기
    + 비밀번호를 잊어버렸을 경우 비밀번호 찾기를 통해 비밀번호 변경이 가능합니다. 
      이메일을 인증하고 비밀번호 변경으로 넘어갑니다.
    
      ![image](https://user-images.githubusercontent.com/44610250/69234696-1d8ce780-0bd3-11ea-943f-29592dd01958.png)
  - 비밀번호 변경
    + 새로운 비밀번호로 변경할 수 있습니다.  
    
      ![image](https://user-images.githubusercontent.com/44610250/69234800-604ebf80-0bd3-11ea-8841-bb7289b1a59d.png)

  - 자유게시판 
    + 로그인한 유저는 자유게시판에 게시글을 작성할 수 있습니다.  
    
      ![image](https://user-images.githubusercontent.com/44610250/69234932-a7d54b80-0bd3-11ea-90a2-b671ac0483fb.png)
    
    + 자신의 게시글에는 수정 및 삭제가 가능합니다.   
      그리고 댓글도 작성할 수 있고, 게시글과 마찬가지로 자신이 작성한 댓글만 수정 및 삭제가 가능합니다.  
      
      ![image](https://user-images.githubusercontent.com/44610250/69235040-e23ee880-0bd3-11ea-89e2-ea8a842716c1.png)

  - Q&A
    + 로그인한 유저는 Q&A에도 질문을 작성할 수 있습니다.  
      
      ![image](https://user-images.githubusercontent.com/44610250/69235248-4c578d80-0bd4-11ea-94e2-744ee7a58272.png)
    
    + 질문의 답변은 관리자만 답변을 할 수 있습니다. 관리자는 DB에서 원하는 유저의 권리를 설정합니다.  
      질문의 답변이 올라오기 전까지, 유저는 질문의 내용을 수정 및 삭제가 가능하지만, 관리자가 답변하면 수정 및 삭제가 불가능합니다.  
      관리자는 Q&A뿐만 아니라 자유게시판의 게시글, 댓글까지 모두 삭제 가능합니다.   
      ( 유저 aaaa가 관리자 권한을 가지고 있습니다. )  
      
      ![image](https://user-images.githubusercontent.com/44610250/69235398-ad7f6100-0bd4-11ea-96e5-91950d39ba70.png)
      
    + 유저 DB입니다.  
    
      ![image](https://user-images.githubusercontent.com/44610250/69235558-0818bd00-0bd5-11ea-9169-5bb4b51ff8d2.png)
