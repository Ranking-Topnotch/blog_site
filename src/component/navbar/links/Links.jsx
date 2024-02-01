"use client"
import React, { useState } from 'react'
import styles from './link.module.css'
import NavLinks from './navlink/navLinks'
import Image from 'next/image'
import { handleLogout } from '@/lib/action'

const links = [
  {
      title: "Home",
      path: '/'
  },
  {
      title: "About",
      path: '/about'
  },
  {
      title: "Contact",
      path: '/contact'
  },
  {
      title: "Blog",
      path: '/blog'
  }
]

const Links = ({session}) => {

    const [ open, setOpen ] = useState(false)

    const adminEmail = "emmaranking07@gmail.com"
     
  return (
    <div className={styles.container}>
    <div className={styles.links}>
      {links.map((link) => (
        <NavLinks item={link} key={link.title} />
      ))}
      {session?.user ? (
        <>
          {session.user?.email === adminEmail && <NavLinks item={{ title: "Admin", path: "/admin" }} />}
          <form action={handleLogout}>
            <button className={styles.logout}>Logout</button>
          </form>
        </>
      ) : (
        <NavLinks item={{ title: "Login", path: "/login" }} />
      )}
    </div>
    <Image
      className={styles.menuButton}
      src="/menu.png"
      alt=""
      width={30}
      height={30}
      onClick={() => setOpen((prev) => !prev)}
    />
    {open && (
      <div className={styles.mobileLinks}>
        {links.map((link) => (
          <NavLinks item={link} key={link.title} />
        ))}

        {session?.user ? (
            <>
              {session.user?.email === adminEmail && <NavLinks item={{ title: "Admin", path: "/admin" }} />}
              <form action={handleLogout}>
                <button className={styles.logout}>Logout</button>
              </form>
            </>
          ) : (
            <NavLinks item={{ title: "Login", path: "/login" }} />
          )}
          </div>
        )}
  </div>
  )
}

export default Links