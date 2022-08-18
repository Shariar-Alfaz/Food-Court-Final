import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from '../axiosConfig';
import Nav from "./Nav";
import './Css/Foods.css';
const RestaurantShow = ()=>{
    const {id} = useParams();
    const [restaurant,setRestaurant] = useState('');
    const [foods, setFoods] = useState([]);
    const [tRating,setTratings] =useState('');
    const [ratings,setRatings] = useState([]);
    useEffect(()=>{
        Axios.get('/customer/restaurantsData/'+id).then((succ)=>{
            setRestaurant(succ.data.restaurant);
            setFoods(succ.data.foods);
            setTratings(succ.data.totalRatings);
            setRatings(succ.data.ratings);
            console.log(succ.data.ratings);
        })
    },[])
    return(
        <>
        <Nav/>
    <header class="header">
    <div class="header-flex container">
        <div>
            <img src={'http://localhost:8000/'+ restaurant.logo} id="image"/>
            
       </div>
       <div class="dev"></div>
        <div id="info">
            <h1 id="name">{restaurant.name}</h1>
            <p><strong>Email:</strong> {restaurant.email}</p>
            <p><strong>Contuct number:</strong> {restaurant.contact_number}</p>
            <p><strong>Address:</strong> {restaurant.address}</p>
            <p><strong>Ratings:</strong> {tRating}</p>
        </div>
    </div>
</header>
        </>
    )
}
export default RestaurantShow;