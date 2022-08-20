import Logo from '../Image/logo.png'
const Nav = ()=>{
    return(
        <nav className="navbar">
            <div className="navflex container">
                <div>
                    <img src={Logo} height="40" width="40"/>
                </div>
                <div>
                    <h3 style={{color:'white'}}>Food Court</h3>
                </div>
                <div>
                    <div className="topnav" id="myTopnav">
                        <a href="/customer/dashbord"><i className="fas fa-house-user"></i> Home</a>
                        <a href="" className="show-cart"><i className="fas fa-cart-arrow-down"></i> Cart </a>
                        <a href=""><i className="fas fa-list"></i> My orders</a>
                        <a href=""><i className="fas fa-user-alt-slash"></i> Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Nav;