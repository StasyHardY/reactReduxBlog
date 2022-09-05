import e from 'express'
import Post from '../models/Post.js'
import User from '../models/User.js'




// Create Post
export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body
        const user = await User.findById(req.userId)

       

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId,
        })
        await newPostWithoutImage.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImage },
        })
        res.json(newPostWithoutImage)
    } catch (error) {
        res.json(error)
    }
}

// getAllPosts 
export const getAllPosts =  async (req,res) => {
    try {
        const posts = await Post.find().sort('-createdAt')
        if(!posts) {
            return res.json({message: 'Постов нет' })
        }
        res.json({posts})
    } catch (error) {
        res.json({message:'Что то пошло не так'})
    }
}

// getAllPosts 
export const getPostById =  async (req,res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }, 
        })
        return res.json(post)
    } catch (error) {
        res.json({message:'Что то пошло не так'})
    }
}

// Delete post 
export const removePost =  async (req,res) => {
    try {
       const post = await Post.findByIdAndDelete(req.params.id)
        if(!post) return res.json({message:'Такого поста не существует'})
        await User.findByIdAndUpdate(req.userId, {
            $pull: { posts:req.params.id}
        })
        res.json({message:'Пост был удален'})
    } catch (error) {
        res.json({message:'Что то пошло не так'})
    }
}

// Update post 
export const updatePost =  async (req,res) => {
    try {
       const {title,text,id } = req.body
       const post = await Post.findById(id)

       post.title = title
       post.text = text

       await post.save()
        res.json(post)
    } catch (error) {
        res.json({message:'Что то пошло не так'})
    }
}


