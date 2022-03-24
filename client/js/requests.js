async function submitForm(e) {
    e.preventDefault();

    var currentDate = new Date();
    var dateTime = `${currentDate.getDate()}/${(currentDate.getMonth() + 1)}/${currentDate.getFullYear()}`;
    // " - " +
    // currentDate.getHours() +
    // ":" +
    // currentDate.getMinutes() +
    // ":" +
    // currentDate.getSeconds();
    
    // Reads input from the form entries created in layout
    let post = Object.fromEntries(new FormData(e.target));
    post.posting_date = dateTime;

    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                "Content-Type" : "application/json"
            }
        }

        const response = await fetch("http://localhost:3000/posts", options);
        let data = await response.json();

        if (data.err) {
            throw Error(data.err);
        }
        else (
            // var current = window.location.href;
            // window.location.href = current.replace(/#(.*)$/, '') + '#' + id;
            window.location.hash = `#${data.id}`
        )
    } catch (err) {
        alert(`Failed to get posts for reason:  ${err}`);
        console.log(`failed to get posts, reason: ${err}`);
    }
}

async function getPostById(id) {
    try {
        const response = await fetch(`http://localhost:3000/posts/${id}`)
        let data = await response.json();
        console.log(data);
        return data;
    }
    catch (err) { 
        alert(`Failed to get post: ${err}`);
        console.log(`Failed to get post, reason: ${err}`);
    };
}