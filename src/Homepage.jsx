import AddMovie from "./components/AddMovie";
import LoginButton from "../public/LoginButton.svg"
import MovieContainer from "./components/MovieContainer";
function Homepage(){
    return(
        <>
            <div className="profile-icon">
                <img src={LoginButton}alt="Profile" className="loginimage" />
             </div>
            <div>
                <h1 className="heading">
                    NEXT MOVIE
                </h1>
                <h2>Your Movie Bucket List</h2>
                <AddMovie />
                <MovieContainer />
            </div>
        </>
    );
}
export default Homepage;