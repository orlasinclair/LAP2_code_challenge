const myForm = document.querySelector("#post");
const fill = document.querySelector("#toBeFilled");

myForm.addEventListener("submit", submitForm);

async function submitForm(e) {
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
        console.log('update')
    try{
        const options = {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch("http://localhost:3000/posts", options);
        let data = await response.json;
        console.log(data)
        console.log(data.id)

        if(data.err){
            throw Error(data.err)
        }
        else(
            window.location.hash = `#${data.id}`
        );
        // changeHash();
    } catch (err) {
        console.warn(err)
    }
}
// Extracting the hash from the entire URL
// var hash = window.location.hash.substring(1);


// function navigate(id) {
//     var current = window.location.href;
//     window.location.href = current.replace(/#(.*)$/, '') + '#' + id;
// }



// async function changeHash() {

//     fetch(`http://localhost:3000/posts/`)
//         .then(res => res.json())
//         .then(res => {
//             const id = res.posts.id;
//             navigate(id);
//         })
//         .catch(console.warn)

//     var hash = window.location.href.split('#')[1] || '';
//     console.log("this is hash: " + hash);

// async function getPostById(id){

//     fill.innerHTML = "";
//     try{

//           const response = await fetch(`http://localhost:3000/posts/${id}`)
//           let data = await response.json;
//           console.log(data)
//           return data
//         }
//     catch(err){console.warn(err)}
// }


// let newList = document.createElement('li');
//             newList.textContent = `Title: ${res.postid.title} + Author: ${res.postid.name} + Current Date: ${res.postid.posting_date}
//                                             + Content: ${res.postid.body}`;
//             fill.append(newList);
