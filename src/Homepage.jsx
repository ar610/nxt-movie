import AddMovie from "./components/AddMovie";
import LoginButton from "./assets/LoginButton.svg"
import MovieContainer from "./components/MovieContainer";
import React, { useState } from "react";

function Homepage(){
    const [isScrolling,setIsScrolling]=useState(false);
    const [isfog,setfog]=useState(false);
    const toggleScroll = () => {
        setIsScrolling(true); // Start scrolling
        setfog(false);
        setTimeout(() => {
            setfog(true);
        }, 3000);
        // Stop scrolling automatically after 5 seconds
        setTimeout(() => {
            setIsScrolling(false);
        }, 5000);
    };
    return(
        <>
            <div className="profile-icon">
                <img src={LoginButton}alt="Profile" className="loginimage" />
             </div>
            <div className="mainpage-container">
                <h1 className="heading">
                    NEXT MOVIE
                </h1>
                <h2>Your Movie Bucket List</h2>
                <AddMovie />
                <MovieContainer scroll={isScrolling} fog={isfog} />
                <button onClick={toggleScroll} className="scroll-btn">
                    Spin
                </button>

            </div>
        </>
    );
}
export default Homepage;