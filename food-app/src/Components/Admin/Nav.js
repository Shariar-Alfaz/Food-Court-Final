import pic from '../Image/logo.png'
import  Axios  from '../axiosConfig'
const Nav = ()=>{
    const logout = (e)=>{
        Axios.get('/admin/logout').then((rsp)=>{
            localStorage.clear();
            window.location.href('/');
        },(err)=>{

        });
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
                data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <a className="navbar-brand mt-2 mt-lg-0" href="#">
                    <img src={pic} height="30"
                        alt="MDB Logo" loading="lazy" />
                </a>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" href="/admin/dashbord">Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/add/admin">Add admin</a>
                    </li>
                   
                </ul>
            </div>
            <div className="d-flex align-items-center">
                <div className="dropdown">
                    <a className="dropdown-toggle d-flex align-items-center hidden-arrow" href="#"
                        id="navbarDropdownMenuAvatar" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                    <img src={pic} className="rounded-circle" height="25"
                            alt="Black and White Portrait of a Man" loading="lazy" />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                       
                        <li>
                            <button className="dropdown-item" onClick={e=>logout(e)}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    )
}
export default Nav;