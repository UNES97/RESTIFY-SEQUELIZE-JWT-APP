const e = require("cors");
const db        = require("../models");
const Post      = db.post; 

exports.createPost = async(req, res) => {
    const {title , content , status , userId} = req.body;
    try {
        const post = await Post.create({title , content , status , userId});

        res.status(201);
        res.json(post);

    } catch (error) {

        res.status(500);
        re.json({error: error.message});

    }
}


exports.getPosts = async(req, res) => {
    try {
        const posts = await Post.findAll({ include: [{ model: db.user , as: 'creator', attributes:{exclude:['password' , 'createdAt' , 'updatedAt']} }]   });

        res.status(200);
        res.json(posts);

    } catch (error) {

        res.status(500);
        res.json({error: 'Something went wrong !'});

    }
}


exports.getPost = async(req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findOne({ where: {id : id} , include: [{ model: db.user , as: 'creator', attributes:{exclude:['password' , 'createdAt' , 'updatedAt']} }] });

        if(post){
            res.status(200);
            res.json(post);
        }
        else{
            res.status(400);
            res.json({message : 'Post not found !'});
        }

    } catch (error) {

        res.status(500);
        res.json({error: 'Something went wrong !'});

    }
}


exports.updatePost = async(req, res) => {
    const id    = req.params.id;
    const {title , content , status} = req.body;
    try {
        const post = await Post.findOne({ where: {id : id} });
        if(post){
            post.title      = title
            post.content    = content
            post.status     = status
            await post.save();

            res.status(201);
            res.json(post);
        }
        else{
            res.status(400);
            res.json({message : 'Post not found !'});
        }
        

    } catch (error) {

        res.status(500);
        res.json({error: 'Something went wrong !'});

    }
}


exports.deletePost = async(req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findOne({ where: {id : id} });
        if(post){   
            await post.destroy();  

            res.status(201);
            res.json({ message: 'Post deleted !' })
        }
        else{
            res.status(400);
            res.json({message : 'Post not found !'});
        }

    } catch (error) {

        res.status(500);
        res.json({error: 'Something went wrong !'});

    }
}