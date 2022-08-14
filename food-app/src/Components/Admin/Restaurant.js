import Axios from '../axiosConfig'
import { useState,useEffect } from 'react';
const Restaurant = ()=>{
    var [restaurants,setRestaurants] = useState([]);
    useEffect(()=>{
        Axios.get('/admin/getRestaurants').then((rsp)=>{
            setRestaurants(rsp.data.res);
        },(err)=>{

        })
    },[]);
    const onLoad = ()=>{
        Axios.get('/admin/getRestaurants').then((rsp)=>{
            setRestaurants(rsp.data.res);
        },(err)=>{

        });
    }
    const changeClick=(id,status,e)=>{
        Axios.get('/admin/status/change/'+id+'/'+status).then((rsp)=>{
            onLoad();
        },(err)=>{

        });
    }
    return(
        <>
        <h3>Restaurants</h3>
        <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Total foods</th>
                    <th>Total orders</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    restaurants.map((r)=>(
                        <tr key={r.id}>
                        <td>
                            <div className="d-flex align-items-center">
                                <img src= {'http://localhost:8000/'+r.logo.replace('../','')} className="rounded-circle" alt=""
                                    style={{width: "45px", height: "45px"}} />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">{ r.name }</p>
                                    <p className="text-muted mb-0">{ r.email }</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className="fw-normal mb-1">{ r.address }</p>
                        </td>
                        <td>
                            <p className="fw-normal mb-1">{ r.contact_number }</p>
                        </td>
                        <td>
                            <p className="fw-normal mb-1">{ r.food }</p>
                        </td>
                        <td>
                            <p className="fw-normal mb-1">{r.order }</p>
                        </td>
                        <td>
                            <p className="fw-normal mb-1"><i class="fas fa-star" style={{color:'orange'}}></i> {r.ratings }</p>
                        </td>
                        <td>
                                <span className={r.status==1?"badge badge-success rounded-pill d-inline":"badge badge-danger rounded-pill d-inline"}>
                                    {r.status==1?'Active':'Blocked'}</span>
                        </td>
                        <td>
                           
                                <button type="button" className="btn btn-link btn-rounded btn-sm fw-bold"
                                    data-mdb-ripple-color="dark" onClick={e=>changeClick(r.id,r.status,e)}>
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
export default Restaurant;