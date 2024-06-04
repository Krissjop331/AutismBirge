import React from 'react'
import './AdminPage.css'
import { AdminSideBar } from './adminSideBar/AdminSideBar'
import { useSelector } from 'react-redux'
import { AdminNavbar } from './adminNavbar/Navbar'
import { AdminRoutes } from './AdminRouter'
import { Navbar } from './navbar/Navbar'
import { NavbarMobile } from './navbarMobile/NavbarMobile'
export const AdminPage = () => {

    const {isAdmin} = useSelector(state => state.main)
    
    return (
        <div className='adminPage'>

                <AdminSideBar />
                <div className="wrapper">
                    <div className="adminContent" id="modal-root">
                        {/* <AdminNavbar /> */}
                        <Navbar className="navAdmin"/>
                        <NavbarMobile className="navAdmin"/>
                        
                        <div className="wrapper">
                            <AdminRoutes />
                        </div>
                    </div>
                </div>

        </div>
    )
}
