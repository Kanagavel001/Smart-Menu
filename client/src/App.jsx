import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Order from './pages/Order'
import Cart from './pages/Cart'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import Foods from './pages/admin/Foods'
import Cooks from './pages/admin/Cooks'
import Orders from './pages/admin/Orders'
import Servers from './pages/admin/Servers'
import CookPage from './pages/admin/CookPage'
import ServerPage from './pages/admin/ServerPage'
import { SpeedInsights } from '@vercel/speed-insights/react';

const App = () => {
  return (
    <div>
      <SpeedInsights />
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/order' element={<Order />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/cook/:id' element={<CookPage />}/>
        <Route path='/server/:id' element={<ServerPage />}/>
        <Route path='/admin/*' element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path='foods' element={<Foods />}/>
          <Route path='cooks' element={<Cooks />}/>
          <Route path='servers' element={<Servers />}/>
          <Route path='orders' element={<Orders />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App