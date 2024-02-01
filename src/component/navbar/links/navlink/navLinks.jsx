"use client"
import React from 'react'
import styles from './navlink.module.css'
import { usePathname } from 'next/navigation'
import Link from 'next/link'


const NavLinks = ({item}) => {
    const pathName = usePathname()
  return (
    <Link href={item.path} className={`${styles.container}  ${pathName === item.path && styles.active}`}>
        {item.title}
    </Link>
  )
}

export default NavLinks  