
import Card from "./Card"
function MovieContainer(props){
    return(
        <>
        <div className="movieframe">
        <div className={`cardcontainer ${props.scroll ? "scrolling" : ""}`}>
            
            <Card image="https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg" name="Joker"/>
            <Card image="https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg" name="Joker"/>
            <Card image="https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg" name="Joker"/>
            <Card image="https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg" name="Joker"/>
            <Card image="https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg" name="Joker"/>
            <Card image="https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg" name="Joker"/>
            <Card image="https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg" name="Joker"/>
            <Card image="https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg" name="Joker"/>
            <Card image="https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg" name="Joker"/>
            <Card image="https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg" name="Joker"/>
            <Card image="https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg" name="Joker"/>
            <Card image="https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg" name="Joker"/>
            <Card image="https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg" name="Joker"/>
            <Card image="https://m.media-amazon.com/images/I/71Jxq2p5YWL._AC_UF1000,1000_QL80_.jpg" name="Joker"/>

        </div>
        </div>
        </>
    );
}
export default MovieContainer;