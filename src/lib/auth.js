//http://localhost:3000/api/auth/callback/github
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "./model"
import { connectToDb } from "./utils"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"


const login = async (credentials) => {
    try{
        await connectToDb()

        const user = await User.findOne({username: credentials.username})
        if(!user){
            throw new Error('Wrong credentials')
        }
        
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

        if(!isPasswordCorrect){
            throw new Error("Password is not correct")
        }

        return user
    }catch(err){
        console.log('An error occurred')
        throw new Error('Failed to login')
    }
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({ 
    ...authConfig,
    providers: [ 
        GitHub({
            clientId: process.env.GITHUB_ID, 
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            async authorize(credentials){
                try{
                   const user = await login(credentials)
                  
                   return user 
                }catch(err){
                    return null
                }
            }
        })  
    ],
    // register with github
    callbacks: {
        async signIn({ user, account, profile }){
            if(account.provider === "github"){
                await connectToDb()
               
                try{
                    const user = await User.findOne({email: profile.email})

                    if(!user){
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            image: profile.avatar_url
                        })

                        await newUser.save()
                    }
                }catch(err){
                    console.log(err)
                    return false
                }
            }
            return true
        },
        ...authConfig.callbacks
    }
})
