import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import LoginPage from './Pages/LoginPage/LoginPage';
import './index.css';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { HeaderMegaMenu } from './Components/Navbar/HeaderMegaMenu';
import ProfilePage from './Pages/Profile/ProfilePage';
import URLShortner from './Pages/ShortURL/URLShortner';
import {URLHistory} from './Pages/ShortURL/URLHistory';

function App() {
  return (
    <Router>
        <HeaderMegaMenu/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<LoginPage/>} />
            <Route element={<PrivateRoute/>}>
            <Route path='/profile' element={<ProfilePage/>} />
            <Route path='/shorten' element={<URLShortner/>} />
            <Route path='/urlhistory' element={<URLHistory/>} />
            </Route>
        </Routes>
    </Router>
  )
}

export default App
