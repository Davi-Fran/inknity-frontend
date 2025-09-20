import { BrowserRouter, Routes, Route  } from 'react-router'
import Welcome from '../pages/Welcome'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import CreateProfile from '../pages/CreateProfile'
import SelectStyles from '../pages/SelectStyles'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={ <Welcome /> } />

                <Route path='login' element={ <Login /> } />

                <Route path='register' element={ <SignUp /> } />

                <Route path='createProfile' element={ <CreateProfile /> } />

                <Route path='selectStyles' element={ <SelectStyles /> } />
            </Routes>
        </BrowserRouter>
    )
}