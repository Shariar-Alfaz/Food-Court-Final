import Axios from "../axiosConfig";
import { useEffect,useState } from "react";
import './Css/Restaurant.css';

const SearchRestaurants = ()=>{
    var [searchRestaurant,setSearchRestaurant]=useState([]);
    var [content,setContent] = useState('');
    const [restaurant,setRestaurants] = useState([]);
    useEffect(()=>{
        Axios.get('/customer/restaurantsData').then((succ)=>{
            setRestaurants(succ.data.restaurants);
        })
    },[])
    const textChange = (e)=>{
        let dis = document.getElementById('restaurent-search');
        if(e.target.value){
            dis.style.display = 'block';
            setContent(e.target.value);
            Axios.get('/customer/resturantSearch/'+content).then((succ)=>{
                setSearchRestaurant(succ.data.res);
            })
        }else{
            dis.style.display = 'none';
            setContent(e.target.value);
            setSearchRestaurant([]);
        }
        
    }
    return(
        <>
        <br/><br/>
        <div style={{textAlign:'center'}}><h4>Search</h4></div>
        <div className="d-flex justify-content-center">
            <div className="form-outline" style={{width:'500px', borderColor:'#FD9899'}}>
                <input type="search "  id="form1" className="form-control" placeholder="Type Restaurant name" aria-label="Search"  onChange={e=>textChange(e)}/>
            </div>
        </div>
        <div style={{textAlign:'center'}} className='container'>
        <div id="restaurent-search">
            <table>
                <tbody>
                {
                    searchRestaurant.map((r)=>(
                        <tr key={r.id}>
                            <td>
                        <div>
                            <a href={"/customer/restaurant/"+r.id}  className="card">
                                <img src={'http://localhost:8000/'+r.logo.replace('../','')} style={{height:'200px'}}/>
                                <div className="border">
                                    <h2 className="border-text">{r.name}</h2>
                                </div>
                            </a>
                        </div>
                        </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
        <br/><br/>
        <h1>Resturants</h1>
        <hr/>
        <div id="restaurant-container">
            {
                restaurant.map((r)=>(
                    <div>
                            <a href={"/customer/restaurant/"+r.id}  className="card">
                                <img src={'http://localhost:8000/'+r.logo.replace('../','')} style={{height:'200px'}}/>
                                <div className="border">
                                    <h2 className="border-text">{r.name}<br/>Ratings: {r.ratings}</h2>
                                </div>
                            </a>
                        </div>
                ))
            }
        </div>

        </div>
        </>
    )
}
export default SearchRestaurants;