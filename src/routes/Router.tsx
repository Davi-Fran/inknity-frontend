import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RouteProtection } from './RouteProtection'
import Welcome from '../pages/Welcome'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import CreateProfile from '../pages/CreateProfile'
import SelectStyles from '../pages/SelectStyles'
import Feed from '../pages/Feed'
import { Menu } from '../components/Menu'
import Search from '../pages/Search'
import { WritePost } from '../components/WritePost'
import Profile from '../pages/Profile'
import Notifications from '../pages/Notifications'
import Settings from '../pages/Settings'
import ChatMenu from '../pages/ChatMenu'
import Chat from '../pages/Chat'
import Saved from "../pages/Saved";


export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={ <Welcome /> } />
                <Route path='login' element={ <Login /> } />
                <Route path='register' element={ <SignUp /> } />
                <Route path='createProfile' element={ <CreateProfile /> } />
                <Route path='selectStyles' element={ <SelectStyles /> } />

                <Route path='user/:username' element={
                        <RouteProtection>
                            <Menu />
                        </RouteProtection>
                }>
                    <Route path='feed' element={ <Feed /> }>
                        <Route path='foryou' element={ <></> } />

                        <Route path='following' element={ <></> } />
                    </Route>

                    <Route path='search' element={ <Search /> } />

                    <Route path='writePost' element={ <WritePost /> } />

                    <Route path='profile' element={ <Profile /> }>
                        <Route path='posts' element={ <></> } />
                                
                        <Route path='comissions' element={ <></> } />
                    </Route>

                    <Route path='chat' element={<ChatMenu />} />

                    <Route path='chat/:userTarget' element={<Chat />} />

                    <Route path='notifications' element={ <Notifications /> } />
                            
                    <Route path='settings' element={ <Settings /> } />

                    <Route path="/user/:username/saved" element={ <Saved /> } />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}