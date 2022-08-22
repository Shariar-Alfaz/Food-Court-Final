import { useState, useEffect } from "react"
import Axios from '../axiosConfig';
import './Css/Cart.css';
import Nav from "./Nav";
import CartItems from './CartItems';
const Cart = () => {
    const [customer, setCustomer] = useState('');
    const [orders , setOrders] = useState([]);
    useEffect(() => {
        Axios.get('/customer/info').then((succ) => {
            setCustomer(succ.data.customer);
        })
        let t = JSON.parse(localStorage.getItem('orderItem'))
        setOrders(t);
    },[])
    return (
        <>
            <Nav />
            <div class="container">
                <div id="add">
                    <table id='cart-table'>
                        <tr>
                            <th>Item</th>
                            <th>Description</th> 
                            <th>Quantity</th>
                            <th>Total (Tk)</th>
                        </tr>
                        <tbody>
                            {
                                orders.map((o)=>(
                                    <CartItems data={o}/>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div class="calculation">
                    <table>
                        <tr>
                            <td> Subtotal</td>
                            <td id="subtotal"></td>
                        </tr>
                        <tr>
                            <td>Grand total</td>
                            <td id="grand-total"></td>
                        </tr>
                    </table>
                </div>
                <br /><br />
                <aside class="corner">
                    <label for="contuct-number">Phone:</label><br />
                    <input type="tel" id="contuct-number" value="{{$customer->contact_number}}" /><br /><br />
                    <label for="address">Address: </label><br />
                    <input type="address" id="address" value="{{$customer->address}}" /><br /><br />
                    <button id="Clear"><i class="fas fa-trash-alt"></i> Clear cart</button>
                    <button id="confirm">Confirm</button>
                </aside>
                <div id="modalnotifi">
                    <div id="m2content">
                        <p id="m2close">X</p>
                        <h2 id="m2message"></h2>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Cart;