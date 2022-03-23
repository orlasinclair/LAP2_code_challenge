const myForm = document.querySelector("#post");
const fill = document.querySelector("#toBeFilled");

myForm.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    const postData = {
        title: e.target.title.value,
        name: e.target.author.value,
        body: e.target.body.value 
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
                newList.textContent = `Title: ${element.title} + Author: ${element.name} + Content: ${element.body}`;
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
