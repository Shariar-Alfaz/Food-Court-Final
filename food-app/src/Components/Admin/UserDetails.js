import { useEffect,useState } from "react"
import Axios from "../axiosConfig"
const UserDetails = ()=>{
    var [user,setUser] = useState([]);
    useEffect(()=>{
        Axios.get('/admin/customers').then((rsp)=>{
        setUser(rsp.data.customers);
        },(err)=>{

        })
    },[]);
    const onLoad = ()=>{
        Axios.get('/admin/customers').then((rsp)=>{
            setUser(rsp.data.customers);
        },(err)=>{

        });
    }
    const onClick = (id,status,e)=>{
        Axios.get('/admin/status/change/customer/'+id+'/'+status).then((rsp)=>{
            onLoad();
        },(err)=>{

        });
    }
    return(
        <>
        <h3>User Details</h3>
        <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Total order placed</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    user.map((u)=>(
                    <tr key={u.id}>
                        <td>
                            <div className="d-flex align-items-center">
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">{ u.name }</p>
                                    <p className="text-muted mb-0">{ u.email }</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className="fw-normal mb-1">{ u.address }</p>
                        </td>
                        <td>
                            <p className="fw-normal mb-1">{ u.contact_number }</p>
                        </td>
                        <td>
                                <p className="fw-normal mb-1"><i className={u.gender=="Male"? "fas fa-male":"fas fa-female"}></i> { u.gender }</p>
                        </td>
                        <td>
                            <p className="fw-normal mb-1">{u.orders}</p>
                        </td>
                        <td>
                                <span className={u.status==1?"badge badge-success rounded-pill d-inline":"badge badge-danger rounded-pill d-inline"}>{u.status==1?'Active':'Blocked'}</span>
                        </td>
                        <td>
                           
                                <button type="button" className="btn btn-link btn-rounded btn-sm fw-bold"
                                    data-mdb-ripple-color="dark" onClick={e=>onClick(u.id,u.status,e)}>
                                    Change
                                </button>
                        </td>
                    </tr>
                    ))
                }
            </tbody>
        </table>
        </>
    )
}
export default UserDetails;