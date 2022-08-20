import Logo from '../Image/logo.png'
const BodySection = () =>{
    return(
        <>
         <header style={{backgroundColor:'#FD9899'}}>
        <div className="header-flex-container">
            <div className="left">
                <img src={Logo} height="350" width="350"/>
            </div>
            <div className="right">
                <h1>Food</h1>
                <h1>Court</h1>
            </div>
        </div>
    </header>
            <section className="show-case">
    <div className="image-holder-sec1">
        <div className="slogans">
            <div className="positioning container">
                <h1></h1>
            </div>
        </div>
    </div>
</section>
<br/>
<br/>
<section id="about">
    <div className="container about-us">
        <h1>Grab food from the best restaurants in your neighbourhood with Food Court.</h1>
        <hr className="hr"/>
        <p>Are you famished? Have you had a long and tense day? Do you want a tasty pizza delivered to your workplace? Then Food Court is the perfect place for you! Food Court provides you with a comprehensive directory of the top eateries in your city
            to make your life easier. Whether you're craving a juicy burger from Takeout, fresh sushi from Samdado, or peri chicken from Nando's, Food Court offers several eateries in your city to choose from.</p>
        <div id="more">
            <h1>Why chose Food Court?</h1>
            <hr className="hr"/>
            <ul className="list">
                <li>
                    <p>More options: meal delivery from local eateries. Order from a variety of cuisines, including fast food, sushi, and pastries.</p>
                </li>
                <li>
                    <p>Easy search: Filter by flavor, or just put in the name of the business you're looking for.</p>
                </li>
                <li>
                    <p>Payment alternatives: Cash on delivery and online payment methods make it easy to pay.</p>
                </li>
            </ul>
            <h1>Order online now!</h1>
            <hr className="hr"/>
            <p>More options: meal delivery from local eateries. Order from various cuisines, including from the first step of selecting your meal to receive it via delivery; we've got you covered. Food Court makes it simple to order your favourite foods.
                Do you crave Indian, Mexican, or Middle Eastern cuisine? With the huge array of cuisines accessible at your fingertips, take your palate on a voyage across the world. Order your favourite soup, salad, sandwich, or dessert from one
                of your neighbourhood's finest eateries or a budget-friendly local favourite. 
                Choose home delivery if you want to sit back and relax or Pick-Up if you're on the move. 
                Allow Food Court to handle it.t food, sushi, and pastries. 
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad, praesentium harum facilis 
                tempora incidunt ipsa nobis amet blanditiis minus quaerat eos sunt sint quam temporibus 
                molestias ea ullam non. Similique!</p>
        </div>
    </div>
</section>
<br/>
<br/><br/>
        </>
    )
}
export default BodySection;