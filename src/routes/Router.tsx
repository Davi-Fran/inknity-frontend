import { BrowserRouter, Routes, Route  } from 'react-router'
import Welcome from '../pages/Welcome'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={ <Welcome /> } />

                <Route path='login' element={ <Login /> } />

                <Route path='register' element={ <SignUp /> } />
            </Routes>
        </BrowserRouter>
    )
}