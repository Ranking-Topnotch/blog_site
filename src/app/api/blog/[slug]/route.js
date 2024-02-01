import { Post } from "@/lib/model"
import { connectToDb } from "@/lib/utils"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
    try{
        connectToDb()

        const { slug } = params
        const post = await Post.findOne({ slug })
        return NextResponse.json(post)
    }catch(err){
        console.log(err)
        throw new Error("Failed to fetch post")
    }
}

export const DELETE = async (request, { params }) => {
    try{
        connectToDb()

        const { slug } = params
        const post = await Post.deleteOne({ slug })
        return NextResponse.json(post)
    }catch(err){
        console.log(err)
        throw new Error("Failed to fetch post")
    }
}