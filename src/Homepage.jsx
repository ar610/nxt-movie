import AddMovie from "./components/AddMovie";
import LoginButton from "./assets/LoginButton.svg"
import MovieContainer from "./components/MovieContainer";
import React, { useState, useRef } from "react";
import Lottie from "lottie-web"; // Import Lottie library
function Homepage(){


    
    const [isScrolling,setIsScrolling]=useState(false);
    const [isfog,setfog]=useState(false);
    const [isloading,setloader]=useState(false);
    const [isdisplayselected,setselected]=useState(false);
    const [isselectedscroll,setselectedscroll]=useState(false);
    
    const toggleScroll = () => {
        setIsScrolling(true); // Start scrolling
        setfog(false);
        setloader(false);
        setselected(false);
        setselectedscroll(false);
        setTimeout(() => {
            setfog(true);
        }, 3000);
        setTimeout(() => {
            setloader(true);
        }, 3000);
        // Stop scrolling automatically after 5 seconds
        setTimeout(() => {
            setIsScrolling(false);
            setloader(false);
            setselectedscroll(true);
        }, 5000);
        setTimeout(() => {
            setselected(true);
        },4900);
        
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
                <MovieContainer scroll={isScrolling} fog={isfog} loading={isloading} selected={isdisplayselected} selectedscroll={isselectedscroll}/>
                <button onClick={toggleScroll} className="scroll-btn">
                    Spin
                </button>


            </div>
        </>
    );
}
export default Homepage;