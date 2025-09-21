import { BrowserRouter, Routes, Route  } from 'react-router'
import Welcome from '../pages/Welcome'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import CreateProfile from '../pages/CreateProfile'
import SelectStyles from '../pages/SelectStyles'
import Feed from '../pages/Feed'
import { Menu } from '../components/Menu'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={ <Welcome /> } />

                <Route path='login' element={ <Login /> } />

                <Route path='register' element={ <SignUp /> } />

                <Route path='createProfile' element={ <CreateProfile /> } />

                <Route path='selectStyles' element={ <SelectStyles /> } />

                <Route path='user/:username' element={ <Menu /> }>
                    <Route path='feed' element={ <Feed /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}