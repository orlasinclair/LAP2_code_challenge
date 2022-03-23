const db = require('../dbConfig');

class Post {
    constructor(data){
    this.id = data.id
    this.title = data.title
    this.name = data.name
    this.body = data.body
}

    static get all(){
        return new Promise(async (res,rej) =>{
            try{
                const postData = await db.query(`SELECT * FROM posts;`)
                const posts = postData.rows.map(p => new Post(p))
                res(posts)
            }catch (err) {
                rej ("Error recieving posts")
            }
        }
        )
    }

    static create(title, name, body){
        return new Promise(async (res, rej) =>{
            try{
            const newPostData = await db.query(`INSERT INTO posts (title, name, body) VALUES ($1, $2, $3) RETURNING *;`, [ title, name, body])
            const newPost = new Post(newPostData.rows[0])
            res(newPost)
        }catch (err){
            rej ("Error creating post")
        }
    }
    )
    }


}

module.exports=Post;
