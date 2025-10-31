import { ChefHat, ConciergeBell, Hamburger, HandPlatter, LayoutDashboard } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {

  const navLinks = [
    {title: "Dashboard", path: '/admin', icon: LayoutDashboard },
    {title: "Foods", path: '/admin/foods', icon: Hamburger },
    {title: "Orders", path: '/admin/orders', icon: ConciergeBell },
    {title: "Cooks", path: '/admin/cooks', icon: ChefHat },
    {title: "Servers", path: '/admin/servers', icon: HandPlatter },
  ]

  return (
    <div className='bg-secondary/30 min-md:w-60 h-screen border-r border-primary/30'>
      <div className='flex items-center justify-center gap-2 pt-4'>
          <img className='w-8' src='/smart_menu.png' alt="" />
          <h1 className='sm:text-2xl max-md:hidden font-bold'>SMART MENU</h1>
      </div>
      <div className='mt-4 space-y-1'>
          {
            navLinks.map((link, i) => (
              <NavLink key={i} to={link.path} end className={({isActive}) => `flex items-center gap-4 relative h-10 transition-all duration-300 md:pl-6 p-4 py-6 ${isActive ? "bg-primary/20" : "hover:bg-primary/20"}`}>
                {({isActive}) => (
                    <>
                      <link.icon className={`${isActive && "text-primary"}`}/>
                      <h1 className={`max-md:hidden ${isActive ? "text-primary font-bold" : "font-semibold"}`}>{link.title}</h1>
                      <span className={`w-2 absolute right-0 h-full ${isActive && "bg-primary"}`}></span>
                    </>
                )}
              </NavLink>
            ))
          }
      </div>
    </div>
  )
}

export default AdminSidebar