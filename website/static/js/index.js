$(document).ready(function () {
    show_comment();
/*공민영 css 변경*/
/*버튼을 눌러서 class이름 바꾸기*/
/*toggleClass 잇음 지우고 없음 채우고,,?*/
/*슬라이드를 앞뒤로 보내는 것*/
//처음부터 지정되어있는 class를 가져오지않고 랜덤으로 보여줌
let teamclass = document.querySelector("#bodymain"); //id값이 bodymain인
let nowclass = document.querySelector("#bodymain").classList //현재 class를 nowclass에 저장
let classes = ['bodymain1','bodymain2','bodymain3','bodymain4','bodymain5','bodymain6','bodymain7'] //클래스 안에 클래스명들을 넣고

let randomClass = classes[Math.floor(Math.random() * classes.length)]; //랜덤돌리고
   teamclass.classList.remove(...teamclass.classList); //클래스들을 다 지우고
   teamclass.classList.add(randomClass); //랜덤으로 생성된 클래스의 인덱스값을 가져옴

     $('#btn_home').on('click',function() { //클릭시 발생
        
         let teamclass = document.querySelector("#bodymain"); //id값이 bodymain인
         let nowclass = document.querySelector("#bodymain").classList //현재 class를 nowclass에 저장
         let classes = ['bodymain1','bodymain2','bodymain3','bodymain4','bodymain5','bodymain6','bodymain7'] //클래스 안에 클래스명들을 넣고
         
         let randomClass = classes[Math.floor(Math.random() * classes.length)]; //랜덤돌리고
         while (randomClass==nowclass) { //똑같은지 확인하고 똑같으면
            randomClass = classes[Math.floor(Math.random() * classes.length)]; //다시 랜덤돌리고 while로 가서 반복(조건에 맞지 않을때까지)

         }  
            teamclass.classList.remove(...teamclass.classList); //클래스들을 다 지우고
            teamclass.classList.add(randomClass); //랜덤으로 생성된 클래스의 인덱스값을 가져옴
            console.log(randomClass);
         

         })
});


//스크롤이벤트가 나타날때마다 함수를 호출하겠다
window.addEventListener("scroll", function () {
    //index.html의 teamcontents/ 일치하는 요소를 들고와라
    let backteam = document.querySelector(".teamcontents"); //팀목표,팀약속,팀규칙
    let backhello = document.querySelector("#teammain"); //welcome
    let showteam = document.querySelector(".team"); //소개합니다
    //스크롤의 높이를 가져오는것
    let value = window.scrollY;
    console.log("scrollY", value);
    //스크롤 높이에 따라 애니메이션이벤트 발생
    //forwards 한번가면 안돌아옴

    if(value > 280 && value < 550) {
        showteam.style.animation = "showtext 3s ease-out"; //소개합니다가 나타남
    } else {
        showteam.style.animation = "hidetext 2s ease-out forwards"; //소개합니다가 사라짐
    }
    if (value > 1100 || value < 300) {
        backteam.style.animation = "backslide 1s ease-out forwards" //팀규칙 등이 옆으로 사라짐
    } else if(value > 410) {
        backteam.style.animation = "slide 2s ease-out"; //팀규칙 등이 옆에서 나타남
    }
    if(value > 200) {
        backhello.style.animation = "uphello 2s ease-out forwards"; //welcome이 위로 올라가면서 사라짐
    } else  {
        backhello.style.animation = "downhello 2s ease-out"; //welcome이 아래로 내려오면서 나타남
    }
})




/*---양예린---*/
function checkResult1() {
    var button = document.getElementById("like-button1");
    if (button.innerHTML === "👍좋아요") {
        button.innerHTML = "🤍";
        $('#like-button1').css('background-color', 'rgb(219,53,69)')
        $('#like-button1').css('color', 'white')
        $('#like-button1').css('width', '50px')
    } else {
        button.innerHTML = "🤍";
        $('#like-button1').css('background-color', 'rgb(219,53,69)')
        $('#like-button1').css('color', 'white')
        $('#like-button1').css('width', '50px')
    }
    let like = 'user1'

    let formData = new FormData()
    formData.append("like1_give", like)

    fetch('/like', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        alert(data['msg'])
        show_like()
    })
    
}


function show_like() {
    fetch('/like').then((res) => res.json()).then((data) => {
        let result = data['result']
        
        result.forEach((a) => {
            let like = a['count']
            let user = a['user']
            if(user=='user1'){
                $('#likeCount1').text(like)
            }else if(user=='user2'){
                $('#likeCount2').text(like)
            }else{
                $('#likeCount3').text(like)
            }

        })
    })
        
}

function checkResult2() {
    var button = document.getElementById("like-button2");
    if (button.innerHTML === "👍좋아요") {
        button.innerHTML = "🤍";
        $('#like-button2').css('background-color', 'rgb(219,53,69)')
        $('#like-button2').css('color', 'white')
        $('#like-button2').css('width', '50px')
    } else {
        button.innerHTML = "🤍";
        $('#like-button2').css('background-color', 'rgb(219,53,69)')
        $('#like-button2').css('color', 'white')
        $('#like-button2').css('width', '50px')
    }
    let like = 'user2'

    let formData = new FormData()
    formData.append("like1_give", like)
    
    fetch('/like', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        alert(data['msg'])
        show_like()
    })
}
function checkResult3() {
    var button = document.getElementById("like-button3");
    if (button.innerHTML === "👍좋아요") {
        button.innerHTML = "🤍";
        $('#like-button3').css('background-color', 'rgb(219,53,69)')
        $('#like-button3').css('color', 'white')
        $('#like-button3').css('width', '50px')
    } else {
        button.innerHTML = "🤍";
        $('#like-button3').css('background-color', 'rgb(219,53,69)')
        $('#like-button3').css('color', 'white')
        $('#like-button3').css('width', '50px')
    }
    let like = 'user3'

    let formData = new FormData()
    formData.append("like1_give", like)
    
    fetch('/like', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        alert(data['msg'])
        show_like()
    })
}





function unlike1(){
    let hate = 'user1'

    let formData = new FormData()
    formData.append("hate_give", hate)

    fetch('/unlike', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        alert(data['msg'])
        show_like()
    })
}
function unlike2(){
    let hate = 'user2'

    let formData = new FormData()
    formData.append("hate_give", hate)

    fetch('/unlike', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        alert(data['msg'])
        show_like()
    })
}
function unlike3(){
    let hate = 'user3'

    let formData = new FormData()
    formData.append("hate_give", hate)

    fetch('/unlike', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        alert(data['msg'])
        show_like()
    })
}


// let a = "😢좋아요 취소"
// let b = "👍좋아요"
// $('#like-button').text(a)
// $('#like-button').css('background-color', 'rgb(219,53,69)')
// $('#like-button').css('color', 'white')


/*정승호*/
function show_comment() {
    fetch('/comment').then((res) => res.json()).then((data) => {
        let result = data['result']
        result.forEach((a) => {
            let id = a['id']
            let comment = a['comment']
            let index = a['index']

            let temp_html = `<tr>
                                <td>${index}</td>
                                <td>${id}</td>
                                <td><div class="cmt_data">${comment}</div></td>
                                <td class="control_wrap"><input class="chk_pw" class="form-control form-control-sm" type="password" placeholder="비밀번호"
                                aria-label=".form-control-sm example"><input type="button" class="control_btn" id="delete" onclick="delete_comment(this)" value="삭제"><input type="button" class="control_btn" id="edit_comment" onclick="edit_chk(this)" value="수정"></td>
                            </tr>`
            $('#comment_table>tbody').append(temp_html)
        })
    })
    
}

function submit() {
    let id = $('#id').val()
    let pw = $('#pw').val()
    let comment = $('#comment_detail>textarea').val()

    let check = (id == '' || pw == '' || comment == "") ? alert('입력칸에 빈칸이 있으면 안됩니다') : save_comment()
    return check
}

function save_comment() {
    let id = $('#id').val()
    let pw = $('#pw').val()
    let comment = $('#comment_detail>textarea').val()

    let formData = new FormData()
    formData.append("id_give", id)
    formData.append("pw_give", pw)
    formData.append("comment_give", comment)

    fetch('/comment', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        alert(data["msg"])
        window.location.reload()
    })
}


function delete_comment(btn) {
    let tr = btn.closest('tr');
    let index = tr.querySelector('td:first-child').textContent;
    let pwd = tr.querySelector('.chk_pw').value
    let formData = new FormData()
    formData.append("index_give", index)
    formData.append('pw_give', pwd)
    fetch('/comment2', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        alert(data["msg"])
        window.location.reload()
    })
}

function edit_chk(btn) {
    let tr = btn.closest('tr');
    let index = tr.querySelector('td:first-child').textContent;
    let pwd = tr.querySelector('.chk_pw').value

    let formData = new FormData()
    formData.append("index_give", index)
    formData.append('pw_give', pwd)
    fetch('/comment3', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        if (data["msg"] == '수정 실패!') {
            alert(data["msg"])
        }
        else {
            let temp_html = `<input type="button" class="control_btn" id="edit_comment" onclick="edit_confirm(this)" value="확인">`
            tr.querySelector('#edit_comment').remove()
            tr.querySelector('.control_btn').insertAdjacentHTML('afterend', temp_html)

            cmt_data = tr.querySelector('.cmt_data').innerText
            let temp_textarea = `<textarea class="form-control comment_edit" placeholder="코멘트를 남겨주세요" id="floatingTextarea">${cmt_data}</textarea>`
            tr.querySelector('.cmt_data').innerHTML = temp_textarea
            tr.querySelector('.chk_pw').setAttribute('readonly', 'readonly')
        }
    })

}

function edit_confirm(btn) {
    let tr = btn.closest('tr');
    let index = tr.querySelector('td:first-child').textContent
    let edit_data = tr.querySelector('.comment_edit').value
    let pwd = tr.querySelector('.chk_pw').value

    if (edit_data == '') {
        alert('문자를 입력해주세요!')
    }
    else {
        let formData = new FormData()
        formData.append("index_give", index)
        formData.append('edit_give', edit_data)
        formData.append('pw_give', pwd)
        fetch('/comment_edit', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
            alert(data["msg"])
            window.location.reload()
        })
    }
}
