const db = require('../dbConfig');

class Post {
    constructor(data){
    this.id = data.id
    this.title = data.title
    this.name = data.name
    this.body = data.body
    this.posting_date = data.posting_date
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

    static create({ title, name, body, posting_date}){
        return new Promise(async (res, rej) =>{
            try{
            const newPostData = await db.query(`INSERT INTO posts (title, name, body, posting_date) VALUES ($1, $2, $3, $4) RETURNING *;`
                                            , [ title, name, body, posting_date ])
            const newPost = new Post(newPostData.rows[0])
            res(newPost)
        }catch (err){
            rej ("Error creating post")
        }
    }
    )
    }

    static findById(id){
        return new Promise (async (res, rej)=>{
            try{
                let postData = await db.query('SELECT * FROM posts WHERE posts.id = $1;', [id]);
                let post = new Post(postData.rows[0]);
                res(post)
            } catch (err){
                rej('Error finding post')
            }
        })
    }


}

module.exports=Post;
