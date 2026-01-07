import React from 'react'
import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

export default function DashboardLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input className="drawer-toggle" type="checkbox" id="my-drawer" defaultChecked />
      <div className="drawer-content">
        <Navbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
      <Sidebar />
    </div>
  )
}
