const myForm = document.querySelector("#post");

myForm.addEventListener("submit", submitForm)

function submitForm(e) {
    e.preventDefault();

    const postData = {
        title: e.target.title.value,
        author: e.target.author.value,
        content: e.target.content.value 
    }

    console.log(postData);

    const options = {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            "Content-Type" : "application/json"
        }
    }

    fetch(url, options)
        .then(res => res.json())
        .catch(console.warn)
};

async function getPost(title, time, id){
    try {
        const response = await fetch(url);
        const data = await response.json()
        return data;
    } catch (err) {
        console.warn(err);
    }
}



// async function submitForm(e) {
//     e.preventDefault();
//     try {
//         const postData = {
//             title: e.target.title.value,
//             author: e.target.author.value,
//             content: e.target.content.value 
//         }

//         console.log(postData);

//         const options = {
//             method: 'POST',
//             body: JSON.stringify(postData),
//             headers: {
//                 "Content-Type" : "application/json"
//             }
//         }

//         const response = await fetch(url, options);
//         const data = await response.json();
//         return data;
        
//     } catch(err) {
//         console.warn(err);
//     }
// };


