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
import Profile from '../pages/Profile'
import Notifications from '../pages/Notifications'
import Settings from '../pages/Settings'
import ChatMenu from '../pages/ChatMenu'
import Chat from '../pages/Chat'
import Saved from '../pages/Saved'
import Content from '../pages/Content'
import PasswordSetting from '../pages/PasswordSettings'
import OrderSettings from '../pages/OrderSettings'
import { RequireStep } from '../contexts/SignUpContext'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={ <Welcome /> } />
                <Route path='login' element={ <Login /> } />
                <Route path='register' element={ <SignUp /> } />

                <Route element={ <RequireStep step='profile' /> }>
                    <Route path='createProfile' element={ <CreateProfile /> } />
                </Route>

                <Route element={ <RequireStep step='styles' /> }>
                    <Route path='selectStyles' element={ <SelectStyles /> } />
                </Route>

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

                    <Route path='profile' element={ <Profile /> } />
                    
                    <Route path='profile/:targetUsername' element={ <Profile /> } />

                    <Route path='chat' element={<ChatMenu />} />

                    <Route path='chat/:chatId' element={<Chat />} />

                    <Route path='notifications' element={ <Notifications /> } />
                            
                    
                    <Route path='settings' element={<Settings />}>
                        <Route index element={<Saved />} />
                        <Route path="saved" element={<Saved />} />
                        <Route path="content" element={<Content />} />
                        <Route path="password" element={<PasswordSetting />} />
                        <Route path="orders" element={<OrderSettings />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}