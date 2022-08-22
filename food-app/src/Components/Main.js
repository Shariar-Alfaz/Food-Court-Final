import AdminDashBord from './Admin/Dashbord'
import IndexHome from './Home/Index'
import Login from './LoginAndRegistration/Login';
import AdminCreate from './Admin/AdminCreate';
import CustomerDashbord from './Customer/DashBord';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import CusRes from './Customer/RestaurantShow';
import Cart from './Customer/Cart';
const Main = ()=>{
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<IndexHome></IndexHome>} />
                    <Route path="/login" element={<Login></Login>}/>
                    <Route path='/admin/dashbord' element={<AdminDashBord></AdminDashBord>}/>
                    <Route path='/add/admin' element={<AdminCreate></AdminCreate>}/>
                    <Route path='/customer/dashbord' element={<CustomerDashbord></CustomerDashbord>}/>
                    <Route path='/customer/restaurant/:id' element={<CusRes></CusRes>}/>
                    <Route path='/customer/cart' element={<Cart></Cart>}/>
                </Routes>
            </BrowserRouter>
            
            
        </div>
    )
}
export default Main;