import { Router } from "express";
import { checkAuth } from '../middleware/checkAuth.js';
import  {createPost} from '../controllers/posts.js'
import { getAllPosts } from "../controllers/posts.js";
import {getPostById} from "../controllers/posts.js";
import {removePost}from "../controllers/posts.js";
import {updatePost}from "../controllers/posts.js";


const router = new Router()

// Create Post
// http://localhost:3002/api/posts
router.post('/', checkAuth, createPost)

// Get all Posts
// http://localhost:3002/api/posts
router.get('/', getAllPosts)

// Get post by id 
// http://localhost:3002/api/post/:id
router.get('/:id', getPostById)     

// Delete post by id
// http://localhost:3002/api/post/:id
router.delete('/:id', checkAuth, removePost)    

// Edit Post
// http://localhost:3002/api/post/:id
router.put('/:id', checkAuth, updatePost)     







export default router    