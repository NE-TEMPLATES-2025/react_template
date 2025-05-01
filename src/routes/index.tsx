import NotFound from "@/pages/commons/404"

import ForgotPassword from "@/pages/auth/forgot-password"
import Register from "@/pages/auth/register"
import Login from "@/pages/auth/login"
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import Verify from "@/pages/auth/verify"
import ResetPassword from "@/pages/auth/reset"

const PagesRoutes = () =>{
    return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth/register" element={<Register/>} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/verify" element={<Verify />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    )
}

export default PagesRoutes