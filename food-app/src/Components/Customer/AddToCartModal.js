import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const AddToCartModal = ({ data }) => {
    const [food, setFood] = useState('');
    const { id } = useParams();
    useEffect(() => {
        setFood(data);
    })
    return (
        <>
            <div id="modal">
                <div id="modal-content">
                    <p id="modal-close-btn">X</p>
                    <img id="showImg" src={'http://localhost:8000/' + data.picture} style={{
                        width: '100%',
                        height: '400px'
                    }} />
                    <hr />
                    <h1 id="food-name">{data.name}</h1>
                    <p id="description">{data.description}</p>
                    <p id="price">{data.price} <sapn style={{ color: 'rgb(182, 182, 182)' }}>(per.)</sapn></p>
                    <label for="quantity">Add quantity <span style={{ color: 'rgb(182, 182, 182)' }}>(minimum 1.)</span>:</label><br />
                    <input type="number" min="1" step="1" value="1" id="quantity" />
                    <br/><br/>
                    <label for="details">Add your instructions <sapn style={{ color: 'rgb(182, 182, 182)' }}>(optional.)</sapn>:</label><br />
                    <textarea id="details"></textarea><br/><br/>
                    <br/><br/>
                    <button id="add-to-cart">+ Add to cart</button>
                    <button id="modal-close-btn-2">Close</button>
                </div>
            </div>
        </>
    )
}
export default AddToCartModal;