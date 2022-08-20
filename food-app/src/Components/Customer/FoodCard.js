const FoodCard = ({data})=>{
    return(
        <div className='foodcard' style={{width:'550px'}}>
                <div>
                    <h4 className='item-name'>{data.name}</h4>
                    <p className='item-description'>{data.description}</p>
                    <p className='item-price'>Tk {data.price}</p>
                </div>
                <div>
                    <img src={'http://localhost:8000/'+data.picture} className='foodcard-img'/>
                </div>
         </div>
    )
}
export default FoodCard;