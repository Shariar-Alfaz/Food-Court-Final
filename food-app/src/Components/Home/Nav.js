
const Nav =()=>{
    return(
        <>
        <br/>
        <div className="under-section">
        <div className="underflex">
            <div className="text">
                <p>Need a business Account?</p>
            </div>
            <div className="button">
                <a href="">Click here</a>
            </div>
        </div>
    </div>
    <br/>
    <div className="full">
        <div className="container">
            <div className="topnav" id="myTopnav">
                <a href="/" className="active"><i className="fas fa-home"></i> Home</a>
                <a href="#contact"><i className="fas fa-address-book"></i> Contact</a>
                <a href="#about"><i className="fas fa-info-circle"></i> About</a>
                <a href="/login"><i className="fas fa-user"></i> Login</a>
            </div>
        </div>
    </div>
        </>
        
    )
}
export default Nav;