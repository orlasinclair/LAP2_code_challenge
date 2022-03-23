const myForm = document.querySelector("#post");
const fill = document.querySelector("#toBeFilled");

myForm.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var currentdate = new Date();
    let author = e.target.author.value;
    var datetime = `${currentdate.getDate()}/${(currentdate.getMonth() + 1)}/${currentdate.getFullYear()}`;
    // " - " +
    // currentdate.getHours() +
    // ":" +
    // currentdate.getMinutes() +
    // ":" +
    // currentdate.getSeconds();

    const postData = {
        title: e.target.title.value,
        name: author,
        body: e.target.body.value,
        posting_date: datetime
    }

    console.log(postData);

    const options = {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch("http://localhost:3000/posts", options)
        .then(res => res.json())
        .catch(console.warn);
    
    changeHash()
}

function navigate(id) {
    var current = window.location.href;
    window.location.href = current.replace(/#(.*)$/, '') + '#' + id;
}

function changeHash() {
    
    fetch(`http://localhost:3000/posts/`)
    .then(res => res.json())
    .then(res => {
        const id = res.posts.length + 1;
        navigate(id);
        setTimeout(200);
    })
    .catch(console.warn)
    
    // Extracting the hash from the entire URL
    // var hash = window.location.hash.substring(1);
    var hash = window.location.href.split('#')[1] || '';

    fill.innerHTML = "";
    fetch(`http://localhost:3000/posts/${hash}`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            console.log("This is the title: " + res.postid.title);
            let newList = document.createElement('li');
            newList.textContent = `Title: ${res.postid.title} + Author: ${res.postid.name}  Current Date: ${res.postid.posting_date}
                                             Content: ${res.postid.body}`;
            fill.append(newList);

        })
        .catch(console.warn)
}
