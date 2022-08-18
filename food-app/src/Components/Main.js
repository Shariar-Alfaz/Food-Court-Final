import AdminDashBord from './Admin/Dashbord'
import IndexHome from './Home/Index'
import Login from './LoginAndRegistration/Login';
import AdminCreate from './Admin/AdminCreate';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
const Main = ()=>{
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<IndexHome></IndexHome>} />
                    <Route path="/login" element={<Login></Login>}/>
                    <Route path='/admin/dashbord' element={<AdminDashBord></AdminDashBord>}/>
                    <Route path='/add/admin' element={<AdminCreate></AdminCreate>}/>
                </Routes>
            </BrowserRouter>
            
            
        </div>
    )
}
export default Main;