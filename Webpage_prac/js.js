const my_title = document.querySelector('#my_title');
const my_text = document.querySelector('#my_text');
const my_id = document.querySelector('#my_id');

const my_list = document.querySelector('.list');
const my_btn = document.querySelector('.my_btn');
const my_del = document.querySelector('.my_del');

const nav_btns = document.querySelector('.nav');

let post_id = 0;

const nav = () => {
    l = nav_btns.children;
    for (let i = 0; i < 7; i++) {
        l[i].style.fontWeight = "bold";
        l[i].style.color = "white";
        l[i].addEventListener('click', () => {
            fetch('nav' + i, {
                method: "GET"
            }).then( res => {
                console.log(res.json())
            })
        })
    }
}
nav();

const load_post = () => {

    fetch('/load', {
        method: "GET",
    }).then(res => {
        return res.json();
    }).then(data => {
        // 지우고
        while (my_list.children.length) {
            my_list.lastElementChild.remove();
        }

        // 출력
        for (let i = data.length - 1; i >= 0; i--) {
            let post = document.createElement('p');
            post.setAttribute('class', `post_id_${post_id++}`);
            post.innerText = `[${data[i].title}]\n${data[i].content}\nwritten by ${data[i].id}.`; // [제목] 내용 by 아이디.
            my_list.appendChild(post);
        }
    });

}

const btn_clicked = function () {
    const obj = {
        'id': my_id.value,
        'title': my_title.value,
        'content': my_text.value
    }

    for (let i of [my_id, my_title, my_text])
        i.value = "";

    let json = JSON.stringify(obj);

    fetch('/posting', {
        method: "POST",
        body: json,
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        load_post();
    })

}

const delete_post = () => {
    fetch('/del', {
        method: "GET",
    }).then(res => {
        return res.json();
    }).then(data => {
        load_post();
    });
}

my_btn.addEventListener('click', btn_clicked);
my_del.addEventListener('click', delete_post);

load_post();