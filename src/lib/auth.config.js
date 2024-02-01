//this is a middleware . 
//the pages signIn is login. if the authorized return 
//false it will still remain in the login
// 

export const authConfig = {
    pages: {
        signIn: "/login"
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }){
            if(user){
               token.id = user.id;
               token.isAdmin = user.isAdmin; 
            }
            return token
        },
        async session({ session, token }){
            if(token){
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
            }
            return session
        },
        authorized({ auth, request }) {
           const user = auth?.user
           const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin")
           const isOnBlogPanel = request.nextUrl?.pathname.startsWith("/blog")
           const isOnLoginPanel = request.nextUrl?.pathname.startsWith("/login")

           //ONLY ADMIN CAN REACH THE ADMIN DASHBOOARD
            if(isOnAdminPanel && !user?.id){
                return false
            }


           //ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE
            if(isOnBlogPanel && !user){
                return false
            }


           //ONLY AUTHENTICATED USERS CAN REACH THE LOGIN PAGE
           if(isOnLoginPanel && user){
            return Response.redirect(new URL("/", request.nextUrl))
           }

           return true 
        }
    }
}