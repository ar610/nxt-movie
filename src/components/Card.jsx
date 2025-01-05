function Card(props){
    return(
        <>
            <div className="cardproperty">
                <div>
                    <img src={props.image} alt={props.name} className="card-image" />
                </div>
                <div>{props.name}</div>
            </div>
            
        </>
    );
}
export default Card;