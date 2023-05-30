import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../../components/auth/login';
import {SignUp} from '../../components/auth/signUp';
import Home from '../../components/home';
import Layout from '../layout/user/layout';

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signUp' element={<SignUp/>}/>
            </Route>
        </Routes>
    </Router>
  )
}

export default AppRoutes