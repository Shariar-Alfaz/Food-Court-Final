const CartItems = ({ data }) => {
    return (
        <>
            <tr key={data.foodId}>
                <td>
                    <div className='tableFlex'>
                        <div>
                            <img src={'http://localhost:8000/' + data.picture} className='cart-food-image' />
                        </div>
                        <div>
                            <p className='c-food-name'>{data.name}</p>
                            <small>Price: {data.price}</small><br />
                            <a className='c-remove' >Remove</a>
                        </div>
                    </div>
                </td>
                <td>
                    <small>{data.description}</small>
                </td>
                <td>
                    <input type='number' min='1' step='1' value={data.quantity} className='quantity-cart' />
                </td>
                <td id='total'>{data.totalPrice}</td>
            </tr>
        </>
    )
}
export default CartItems;