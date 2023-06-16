import { Outlet } from "react-router-dom"
import Footer from "../Shared/Footer"
import Navbar from "../Shared/Navbar"

const Main = () => {
  return (
    <div className="max-w-screen-xxl mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
     
    </div>
  )
}

export default Main
