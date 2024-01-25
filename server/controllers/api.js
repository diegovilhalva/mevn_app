const Post = require("../models/posts")
const fs = require("fs")
module.exports = class API {
    static async fetchAllPOst(req,res){
      try {
        const posts = await Post.find()
        res.status(200).json(posts)
      } catch (error) {
        res.status(404).json({message:error.message})
      }
    }
    static async fetchPostById(req,res){
        let id = req.params.id
       try {
        const post = await Post.findById(id)
        res.status(200).json(post)
       } catch (error) {
        res.status(404).json({message:error.message})
       }
    }
    static async createPost(req,res){
        const post  = req.body
        const imagename = req.file.filename
        post.image = imagename;
        try {
            await Post.create(post)
            res.status(201).json({message:"Post criado com sucesso!"})
        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }
    static async updatePost(req,res){
        const id = req.params.id
        let new_image =''
        if (req.file) {
            new_image = req.file.filename
            try {
                fs.unlinkSync(`./uploads/${req.body.old_image}`)
            } catch (error) {
                console.log(error)
            }
        }else{
            new_image = req.body.old_image
        }
        const newPost = req.body
        newPost.image = new_image

        try {
            await Post.findByIdAndUpdate(id,newPost)
            res.status(200).json({message:"Post atualizado com sucesso!"})
        } catch (error) {
            res.status(404).json({message:error.message})
        }
    }
    static async deletPost(req,res){
        const id = req.params.id
        try {
           const result = await Post.findByIdAndDelete(id)
           if (result.image != '') {
            try {
                fs.unlinkSync(`./uploads/${res.image}`)
            } catch (error) {
                console.log(error)
            }
           }
           res.status(200).json({message:"Post deletado com sucesso!"})
        } catch (error) {
            res.status(404).json({message:error.message})
        }
    }
}