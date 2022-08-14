import Axios from '../axiosConfig'
import {useEffect,useState} from 'react'
const RestaurantConfirmT = ()=>{
    var [restaurants,setRestaurants] = useState([]);
    useEffect(()=>{
        Axios.get('/admin/getRestaurant/approval').then((rsp)=>{
            setRestaurants(rsp.data.approval);
            console.log(rsp.data.approval);
        },(err)=>{

        })
    },[]);
    const LoadData=()=>{
        Axios.get('/admin/getRestaurant/approval').then((rsp)=>{
            setRestaurants(rsp.data.approval);
            console.log(rsp.data.approval);
        },(err)=>{

        });
    }
    const Approve=(id,e)=>{
        Axios.get('/admin/approveRestaurant/'+id).then((rsp)=>{
           if(rsp.data.appr == 'Approved'){
            LoadData();
           }
        },(err)=>{

        })
    }
    return(
        <>
        <h3>Restaurant aproval list</h3>
        <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    restaurants.map((rs)=>(
                        <tr key={rs.id}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <img src={'http://localhost:8000/'+rs.logo.replace('../','')} className="rounded-circle" alt=""
                                        style={{width: '45px', height: '45px'}} />
                                    <div className="ms-3">
                                        <p className="fw-bold mb-1" >{ rs.name }</p>
                                        <p className="text-muted mb-0">{ rs.email }</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className="fw-normal mb-1">{ rs.address }</p>
                            </td>
                            <td>
                                <p className="fw-normal mb-1">{ rs.contact_number }</p>
                            </td>
                            <td>
                                <span className="badge badge-warning rounded-pill d-inline">Awaiting</span>
                            </td>
                            <td>
                                
                                    <button  type="button" className="btn btn-link btn-rounded btn-sm fw-bold"
                                        data-mdb-ripple-color="dark" onClick={e=>Approve(rs.id,e)}>
                                        Accept
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
export default RestaurantConfirmT;