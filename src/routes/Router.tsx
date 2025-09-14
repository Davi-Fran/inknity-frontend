import { BrowserRouter, Routes, Route  } from 'react-router'
import Welcome from '../pages/Welcome'
import Form from '../pages/Form'

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={ <Welcome /> } />

                <Route path='form' element={ <Form /> }>
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}