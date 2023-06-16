import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../Pages/Home/Home'
import Instructors from '../Pages/Instructors/Instructors'
import Classes from '../Pages/Classes/Classes'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import DashboardLayout from '../layouts/Dashboard'
import MyCart from '../Pages/Mycart/MyCart'
import PrivateRoute from './PrivateRoute'
import AllUsers from '../DashBoard/AllUsers'
import AdminRoute from './AdminRoute'
// import CheckoutForm from '../Pages/Payment/CheckOutForm'
import Payment from '../Pages/Payment/Payment'
import PaymentHistory from '../Pages/Payment/PaymentHistory'
import EnrolledClass from '../Pages/EnrolledClass/EnrolledClass'
import AddClass from '../Pages/isInstructor/AddClass'
import MyClass from '../Pages/isInstructor/MyClass'
import EnrolledStudents from '../Pages/isInstructor/EnrolledStudents'
import ManageClasses from '../Pages/Dashboard/ManageClasses'
import Error from '../Pages/Home/Error'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/instructors',
        element:<Instructors />
      },
      {
        path: '/classes',
        element: <Classes />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
    ]
  },
  {
    path:'dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children:[
      {
      path: 'mycart',
      element: <MyCart />
    },
    {
      path: 'allusers',
      element: <AdminRoute><AllUsers /></AdminRoute>
    },
    {
      path:'payment',
      element:<Payment />
    },
    {
      path:'paymenthistory',
      element:<PaymentHistory/>
    },
    {
      path:'enrolledclass',
      element: <EnrolledClass />
    },
    {
      path: 'addclass',
      element: <AddClass />
    },
    {
      path:'myclass',
      element: <MyClass />
    },
    {
      path:'enrolledstudents',
      element: <EnrolledStudents />
    },
   {
    path:'manageclass',
    element: <ManageClasses />
   }
  ]
  }
])
