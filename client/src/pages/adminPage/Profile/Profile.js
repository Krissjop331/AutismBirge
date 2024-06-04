import React from 'react'
import './Profile.css'
import Profileblock from './Profileblock/Profileblock'
import { Contact } from './Contact'
import { Aboutprofile } from './aboutprofile'

import { NavbarMobile } from '../navbarMobile/NavbarMobile'
import { Navbar } from '../../../components/navbar/Navbar'


export const Profile = () => {
  return (
    <div className='Profile'>
      <Navbar className="navAdmin"/>
      <NavbarMobile className="navAdmin"/>
      <div className='profile_continer'>
        <Aboutprofile />
      <Profileblock />
      <Contact />
      </div>
    </div>
  )
}
