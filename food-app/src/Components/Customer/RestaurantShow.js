import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from '../axiosConfig';
import Nav from "./Nav";
import './Css/Foods.css';
import './Css/Restaurant.css'
import FoodCard from "./FoodCard";
import './Css/FoodCard.css'
import Ratings from "./Ratings";
import AddToCartModal from "./AddToCartModal";
import Notify from "./Notify";
const RestaurantShow = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState('');
    const [foods, setFoods] = useState([]);
    const [tRating, setTratings] = useState('');
    const [ratings, setRatings] = useState([]);
    const [category, setCategory] = useState([]);
    const [inRating, setInrating] = useState('');
    const [comment, setComment] = useState('');
    const [rCheck, setRCheck] = useState(false);
    const [modalFood,setModalFood] = useState('');

    useEffect(() => {
        Axios.get('/customer/restaurantsData/' + id).then((succ) => {
            setRestaurant(succ.data.restaurant);
            setFoods(succ.data.foods);
            setTratings(succ.data.totalRatings);
            setRatings(succ.data.ratings);
        });
        Axios.get('/customer/restaurantFoodCategory/' + id).then((succ) => {
            setCategory(succ.data.cat);
        });
        Axios.get('/customer/ratings/check/' + id).then((succ) => {
            if (succ.data.check == 1) {
                setRCheck(true);
            } else {
                setRCheck(false);
            }
        });
    }, [])
    const onClick = (e) => {
        let cat = e.target.text;
        if (cat == 'All') {
            Axios.get('/customer/restaurantsData/' + id).then((succ) => {
                setFoods(succ.data.foods);
            });
        } else {
            Axios.get('/customer/category/' + cat + '/' + id).then((succ) => {
                setFoods(succ.data.foods);
            });
        }
    }
    const handleForm = (e)=>{
        e.preventDefault();
        var data = {ratings:inRating,comment:comment,id:id};
        Axios.post('/customer/restaurant/ratings',data).then((succ)=>{
            if(succ.data.msg){
                window.location.reload(false);
            }
        },(err)=>{
            if(err.response.status == 422){
                alert('Input is not correct.');
            }
        });
    }
    const foodCardClick=(e,f)=>{
        document.getElementById('modal').style.display = 'block';
        setModalFood(f);
        console.log(f);
    }
    return (
        <>
            <Nav />
            <header className="header">
                <div className="header-flex container">
                    <div>
                        <img src={'http://localhost:8000/' + restaurant.logo} id="image" />

                    </div>
                    <div className="dev"></div>
                    <div id="info">
                        <h1 id="name">{restaurant.name}</h1>
                        <p><strong>Email:</strong> {restaurant.email}</p>
                        <p><strong>Contuct number:</strong> {restaurant.contact_number}</p>
                        <p><strong>Address:</strong> {restaurant.address}</p>
                        <p><strong>Ratings:</strong> {tRating}</p>
                    </div>
                </div>
            </header>
            <br /><br />
            <section className='container'>
                <div id='category-list' style={{ textAlign: 'center' }}>
                    <div className="dropdown">
                        <button
                            className="btn btn-danger dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Select category
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ maxHeight: '500px', overflow: 'auto' }}>
                            <li><a className="dropdown-item" onClick={e => onClick(e)} style={{ cursor: 'pointer' }}>All</a></li>
                            {
                                category.map((c) => (
                                    <li><a className="dropdown-item" onClick={e => onClick(e)} style={{ cursor: 'pointer' }} >{c.category}</a></li>
                                ))
                            }

                        </ul>
                    </div>
                </div>
            </section>
            <br /><br />
            <section className="container">
                <h3 id="h3cen">Food items</h3>
                <hr />
                <div className="flex">
                    {
                        foods.map((f) => (
                            <FoodCard data={f} handle={foodCardClick}/>
                        ))
                    }
                </div>
                <hr />
            </section>
            <section className="container">
                <h3>Ratings</h3>
                <table>
                    <tbody>
                        {
                            ratings.map((r) => (
                                <Ratings data={r}/>
                            ))
                        }
                    </tbody>
                </table>
                <hr />
                <div className={rCheck ? 'none' : 'block'}>
                    <h4>Post a review</h4>
                    <form onSubmit={handleForm}>
                    Rating <br />
                    <input type="number" id="quantity" name="quantity" min="1" max="5" onChange={e => setInrating(e.target.value)} required/>
                    <br /><br />
                    <div id="comment" style={{ width: '300px' }}>
                        <div className="form-outline">
                            <textarea className="form-control" id="textAreaExample" rows="4" onChange={e => setComment(e.target.value)}></textarea>
                            <label className="form-label" for="textAreaExample" style={{ backgroundColor: 'white' }}>Comment</label>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-danger">Post</button>
                    </div>
                    </form>
                </div>
            </section>
            <br /><br />
            <AddToCartModal data={modalFood}/>
            <Notify/>
        </>
    )
}
export default RestaurantShow;