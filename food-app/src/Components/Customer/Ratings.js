const Ratings = ({data})=>{
    return(
        <tr >
            <td>
                <strong>{data.customer.name}</strong>
                <sup>{'(Ratings: '+data.ratings+')'}</sup>
                <small style={{fontSize:'10px' , paddingLeft:'10px'}} >{data.datetime}</small>
                <p>{data.comment}</p>
            </td>
        </tr>
    )
}
export default Ratings;