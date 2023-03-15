$(document).ready(function () {
    btn_background();
    show_comment();

});

/*공민영*/
function btn_background() {
    fetch("/")
        .then((res) => res.json())
        .then((data) => {

            let rows = ['../img/star.png', '../img/sea.png', '../img/tree.png']
            rows.forEach((a) => {
                let temp_html = `<div id="btn_img" src="${a}"></div>`
                $("#btn_img").append(temp_html);
            });

            console.log(data);
            alert("버튼을 눌렀습니다");
        });
}


/*---양예린---*/
function checkResult1() {
    let likeCount1 = parseInt(document.getElementById("likeCount1").textContent);

    var button = document.getElementById("like-button1");
    if (button.innerHTML === "👍좋아요") {
        button.innerHTML = "😢좋아요 취소";
        $('#like-button1').css('background-color', 'rgb(219,53,69)')
        $('#like-button1').css('color', 'white')
        $('#like-button1').css('width', '110px')
        likeCount1++;
        document.getElementById("likeCount1").textContent = likeCount1.toString();
    } else {
        button.innerHTML = "👍좋아요";
        $('#like-button1').css('background-color', 'white')
        $('#like-button1').css('color', 'rgb(219,53,69)')
        $('#like-button1').css('width', '100px')
        likeCount1--;
        document.getElementById("likeCount1").textContent = likeCount1.toString();
    }
}
function checkResult2() {
    let likeCount2 = parseInt(document.getElementById("likeCount2").textContent);

    var button = document.getElementById("like-button2");
    if (button.innerHTML === "👍좋아요") {
        button.innerHTML = "😢좋아요 취소";
        $('#like-button2').css('background-color', 'rgb(219,53,69)')
        $('#like-button2').css('color', 'white')
        $('#like-button2').css('width', '110px')
        likeCount2++;
        document.getElementById("likeCount2").textContent = likeCount2.toString();
    } else {
        button.innerHTML = "👍좋아요";
        $('#like-button2').css('background-color', 'white')
        $('#like-button2').css('color', 'rgb(219,53,69)')
        $('#like-button2').css('width', '100px')
        likeCount2--;
        document.getElementById("likeCount2").textContent = likeCount2.toString();
    }
}
function checkResult3() {
    let likeCount3 = parseInt(document.getElementById("likeCount3").textContent);

    var button = document.getElementById("like-button3");
    if (button.innerHTML === "👍좋아요") {
        button.innerHTML = "😢좋아요 취소";
        $('#like-button3').css('background-color', 'rgb(219,53,69)')
        $('#like-button3').css('color', 'white')
        $('#like-button3').css('width', '110px')
        likeCount3++;
        document.getElementById("likeCount3").textContent = likeCount3.toString();
    } else {
        button.innerHTML = "👍좋아요";
        $('#like-button3').css('background-color', 'white')
        $('#like-button3').css('color', 'rgb(219,53,69)')
        $('#like-button3').css('width', '100px')
        likeCount3--;
        document.getElementById("likeCount3").textContent = likeCount3.toString();
    }
}
function checkResult4() {
    let likeCount4 = parseInt(document.getElementById("likeCount4").textContent);

    var button = document.getElementById("like-button4");
    if (button.innerHTML === "👍좋아요") {
        button.innerHTML = "😢좋아요 취소";
        $('#like-button4').css('background-color', 'rgb(219,53,69)')
        $('#like-button4').css('color', 'white')
        $('#like-button4').css('width', '110px')
        likeCount1++;
        document.getElementById("likeCount4").textContent = likeCount4.toString();
    } else {
        button.innerHTML = "👍좋아요";
        $('#like-button4').css('background-color', 'white')
        $('#like-button4').css('color', 'rgb(219,53,69)')
        $('#like-button4').css('width', '100px')
        likeCount1--;
        document.getElementById("likeCount4").textContent = likeCount4.toString();
    }
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

