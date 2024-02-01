import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import React from 'react'

const Navigation = () => {
    const router = useRouter() //use to redirect the user
    const pathName = usePathname()

    const handleSubmit = () => {
        let a = true
        if(a){
            router.push('/') //redirect to the home page '/'
            //router.replace('/')
            //router.refresh() //refreshing the page i.e rendering
            // router.back() // use in moving path
            // router.forward() // use in going forward
        }
    }
  return (
    <div>N
        <button onClick={handleSubmit}>Redirect</button>
    </div>
  )
}

export default Navigation