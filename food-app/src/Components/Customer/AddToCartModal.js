import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const AddToCartModal = ({ data }) => {
    const [food, setFood] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams();
    useEffect(() => {
        setFood(data);
    })
    const closeModal = (e) => {
        document.getElementById('modal').style.display = 'none';
    }
    const addToCart = (e) => {
        if (localStorage.getItem('rId') && localStorage.getItem('orderItem')) {
            if (localStorage.getItem('rId') == id) {
                let cart = localStorage.getItem('orderItem');
                cart = JSON.parse(cart);
                var notFound = true;
                for (let i in cart) {
                    if (food.id == cart[i].foodId) {
                        cart[i].quantity = parseInt(cart[i].quantity) + parseInt(document.getElementById('quantity1').value);
                        cart[i].totalPrice = parseFloat(cart[i].price)*parseFloat(cart[i].quantity);
                        notFound = false;
                        break;
                    }
                }
                if (notFound) {
                    let order = {
                        foodId: food.id,
                        picture: food.picture,
                        name: food.name,
                        quantity: document.getElementById('quantity1').value,
                        description: description ?description:'N/A',
                        category: food.category,
                        price: food.price,
                        totalPrice: parseFloat(food.price) * parseFloat(document.getElementById('quantity1').value)
                    }
                    cart.push(order);
                }
                let c  = JSON.stringify(cart)
                localStorage.setItem('orderItem', c);
                document.getElementById('m2message').innerText = "Item added to cart";
                document.getElementById('modal').style.display = 'none';
                document.getElementById('modalnotifi').style.display = 'block';
            } else {
                document.getElementById('m2message').innerText = "You have another restaurent's foods in cart. To add this food you have to clear the previous cart.";
                document.getElementById('modal').style.display = 'none';
                document.getElementById('modalnotifi').style.display = 'block';
                console.log(localStorage.getItem('orderItem'));
            }
        } else {
            localStorage.setItem('rId', id);
            let cart = [];
            let order = {
                foodId: food.id,
                picture: food.picture,
                name: food.name,
                quantity: document.getElementById('quantity1').value,
                description: description? description:'N/A',
                category: food.category,
                price: food.price,
                totalPrice: parseFloat(food.price) * parseFloat(document.getElementById('quantity1').value)
            }
            cart.push(order);
            let t= JSON.stringify(cart)
            localStorage.setItem('orderItem', t);
            document.getElementById('m2message').innerText = "Item added to cart";
            document.getElementById('modal').style.display = 'none';
            document.getElementById('modalnotifi').style.display = 'block';
        }
    }
    return (
        <>
            <div id="modal">
                <div id="modal-content">
                    <p id="modal-close-btn" onClick={e => closeModal(e)}>X</p>
                    <img id="showImg" src={'http://localhost:8000/' + data.picture} style={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'cover'
                    }} />
                    <hr />
                    <h1 id="food-name">{data.name}</h1>
                    <p id="description">{data.description}</p>
                    <p id="price">Price: {data.price} <sapn style={{ color: 'rgb(182, 182, 182)' }}>(per.)</sapn></p>
                    <label for="quantity">Add quantity <span style={{ color: 'rgb(182, 182, 182)' }}>(minimum 1.)</span>:</label><br />
                    <input type="number" min="1"   id="quantity1" />
                    <br /><br />
                    <label for="details">Add your instructions <sapn style={{ color: 'rgb(182, 182, 182)' }}>(optional.)</sapn>:</label><br />
                    <textarea id="details" onChange={e => setDescription(e.target.value)}></textarea><br /><br />
                    <br /><br />
                    <button id="add-to-cart" onClick={e=>addToCart(e)}>+ Add to cart</button>
                    <button id="modal-close-btn-2" onClick={e => closeModal(e)}>Close</button>
                </div>
            </div>
        </>
    )
}
export default AddToCartModal;