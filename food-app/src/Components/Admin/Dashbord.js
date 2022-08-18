import Nav from './Nav'
import Footer from './Footer';
import RCT from './RestaurantConfirmT';
import Restaurant from './Restaurant';
import UserDetails from './UserDetails';
const Dashboard = ()=>{
    return(
        <>
        <Nav/>
        <br/><br/>
        <div className='container'>
        <RCT/>
        <br/><br/>
        <Restaurant/>
        <br/> <br/>
        <UserDetails/>
        </div>
        
        <Footer/>
        </>
        
    )
}
export default Dashboard;