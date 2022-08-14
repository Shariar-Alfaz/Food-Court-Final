import Nav from './Nav'
import Footer from './Footer';
import RCT from './RestaurantConfirmT';
import Restaurant from './Restaurant';
const Dashboard = ()=>{
    return(
        <>
        <Nav/>
        <br/><br/>
        <div className='container'>
        <RCT/>
        <br/><br/>
        <Restaurant/>
        </div>
        
        <Footer/>
        </>
        
    )
}
export default Dashboard;