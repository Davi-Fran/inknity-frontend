import { BrowserRouter, Routes, Route  } from 'react-router'
import Welcome from '../pages/Welcome'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import CreateProfile from '../pages/CreateProfile'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={ <Welcome /> } />

                <Route path='login' element={ <Login /> } />

                <Route path='register' element={ <SignUp /> } />

                <Route path='createProfile' element={ <CreateProfile /> } /> 
            </Routes>
        </BrowserRouter>
    )
}