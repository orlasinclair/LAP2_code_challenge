const myForm = document.querySelector("#post");
const fill = document.querySelector("#toBeFilled");

myForm.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var currentdate = new Date();
    let author = e.target.author.value;
    var datetime =`${currentdate.getDate()}/${(currentdate.getMonth() + 1)}/${currentdate.getFullYear()}`;
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
            "Content-Type" : "application/json"
        }
    }

    fetch("http://localhost:3000/posts", options)
    .then(res => res.json())
    .catch(console.warn);
    
    
    fill.innerHTML = "";
    fetch("http://localhost:3000/posts") 
    .then(res => res.json())
    .then(
        res => {
        console.log(res)
            res.posts.forEach(element => {
                let newList = document.createElement('li');
                newList.textContent = `Title: ${element.title} + Author: ${element.name} + Current Date: ${element.posting_date}
                                             + Content: ${element.body}`;
                fill.append(newList);
            });
    })
    .catch(console.warn)
}

async function getPost(title, time, id){
    try {
        const response = await fetch(url);
        const data = await response.json()
        return data;
    } catch (err) {
        console.warn(err);
    }
}
