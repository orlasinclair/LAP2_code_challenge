const fill = document.querySelector('#toBeFilled');
const postForm = document.querySelector('#sectionForm')

//On load, render the post form
window.addEventListener('load',renderPostForm);
//If the hash changes, call update content
window.addEventListener('hashchange', updateContent);

//Fields variable storing array of tags and attributes we're going ot use to create the form
const fields =
[
    { tag: 'input', attributes: { type: 'text', name:"title", id:"title", placeholder:"Title" }},
    { tag: 'input', attributes: { type: 'text', name:"name", id:"name", placeholder:"Author" }},
    { tag: 'textarea', attributes: { type: 'text', rows:"4", cols:"50", name:"body", placeholder:"Your Story..." }},
    { tag: 'input', attributes: { type:"submit", id:"publish", value:"Publish"}}
]

//Renders the post form on the screen after clearning the post Div of any content (if any)
async function renderPostForm() {
    postForm.innerHTML = "";

    // creates the form element and loops through fields array, creating elements based on tag and adding their attributes as per their entries
    const form = document.createElement('form');
        fields.forEach(f => {
                const field = document.createElement(f.tag);
                Object.entries(f.attributes).forEach(([a, v]) => field.setAttribute(a, v))
                form.appendChild(field);
        })

            
    //Add our form to the formDiv
    postForm.appendChild(form);

    //Set the onsubmit attribute to the form to call create post
    form.onsubmit = submitForm;
}


async function renderPost(id) {
    fill.innerHTML = "";
    let response = "";
    try {
        response = await getPostById(id);
    } catch (err) {
        console.warn(err);
    }
    
    let newList = document.createElement('li');
    newList.textContent = `Title: ${response.postId.title} 
                        + Author: ${response.postId.name} 
                        + Current Date: ${response.postId.posting_date}
                        + Content: ${response.postId.body}`;
    fill.append(newList);
}


function updateContent() {
    // var hash = window.location.href.split('#')[1] || '';
    let hash = window.location.hash.substring(1);
    console.log(hash);
    renderPost(hash);
}

