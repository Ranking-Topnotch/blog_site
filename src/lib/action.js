// when using "use server" all function should be async, wether you are using await or not
"use server"

import { revalidatePath } from "next/cache";
import { connectToDb } from "./utils"
import { Post, User } from "./model"
import { signIn, signOut } from "./auth"
import bcrypt from "bcryptjs"

export const addPost = async (previousState, formData) => {
    
    const {title, desc, slug, userId} = Object.fromEntries(formData)
    
    try{
        connectToDb()

        const newPost = new Post({
            title,
            desc,
            slug,
            userId
        })

        await newPost.save()
        
        revalidatePath("/blog") // refershing the /blog post  
        revalidatePath("/admin") // refershing the /admin page  
        
    }catch(err){
        console.log('an Errror occured')
        throw new Error('An error occur')
    }
    
}

export const deletePost =  async (formData) => {
    const { id } = Object.fromEntries(formData)
    
    try{
        await connectToDb()

        await Post.findByIdAndDelete(id)

        revalidatePath("/blog") // refershing the /blog post   
        revalidatePath("/admin")

    }catch(err){
        console.log('an Errror occured')
        throw new Error('An error occur')
    }
}

export const addUser = async (prevState, formData) => {
    
    const {username, email, password, img  } = Object.fromEntries(formData)
    
    try{
        await connectToDb()

        const newUser = new User({
            username,
            email,
            password,
            img
        })

        await newUser.save()
        
        revalidatePath("/admin") // refershing the /blog post  
        
    }catch(err){
        console.log('an Errror occured')
        throw new Error('An error occur')
    }
    
}

export const deleteUser =  async (formData) => {
    const { id } = Object.fromEntries(formData)
    
    try{
        await connectToDb()

        await Post.deleteMany({userId: id})

        await User.findByIdAndDelete(id)

        revalidatePath("/admin") // refershing the /blog post   
    }catch(err){
        console.log('an Errror occured')
        return {message : "something went wrong"}
    }
}

export const handleGitHubLogin = async () => {
    "use server"
    await signIn("github")
}

export const handleLogout = async() => {
    "use server"
    await signOut()
}

export const register =  async (previousState, formData) => {
    const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData)

    
    if(password !== passwordRepeat){
        return {message: "Password doesn't match"}
    }
    try{
        await connectToDb()

        const user = await User.findOne({username})

        if(user){
            return {message: "User already exist"}
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hashPassword,
            img,
            
        })

        await newUser.save()
        return { success: true }
        
    }catch(err){
        console.log('an Errror occured')
        return {message: "Something went wrong"}
    }
}

export const login =  async (prevState, formData) => {
    const { username, password} = Object.fromEntries(formData)
    
    try{
        await signIn("credentials", { username, password });
    }catch(err){
        console.log(err);

        if (err.type === 'CredentialsSignin') {
            console.error('CredentialsSignin error details:', err);
            return { message: "Invalid username or password" };
        }
        
        throw err;
    }
}