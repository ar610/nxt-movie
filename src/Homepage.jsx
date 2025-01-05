import AddMovie from "./components/AddMovie";
import LoginButton from "./assets/LoginButton.svg"
import MovieContainer from "./components/MovieContainer";
import React, { useState } from "react";

function Homepage(){
    const [isScrolling,setIsScrolling]=useState(false);
    const toggleScroll=()=>{
        setIsScrolling(!isScrolling);
    }
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
                <MovieContainer scroll={isScrolling} />
                <button onClick={toggleScroll} className="scroll-btn">
        {isScrolling ? "Stop Scrolling" : "Start Scrolling"}
      </button>

            </div>
        </>
    );
}
export default Homepage;