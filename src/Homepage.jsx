import AddMovie from "./components/AddMovie";
import LoginButton from "./assets/LoginButton.svg";
import MovieContainer from "./components/MovieContainer";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useUserAuth } from "./context/UserAuthContext";
import BackVideo from "./assets/cinema.mp4";
import Lottie from "lottie-web"; // Import Lottie library
function Homepage() {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const [isScrolling, setIsScrolling] = useState(false);
  const [isfog, setfog] = useState(false);
  const [isloading, setloader] = useState(false);
  const [isdisplayselected, setselected] = useState(false);
  const [isselectedscroll, setselectedscroll] = useState(false);

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
    }, 4900);
  };
  return (
    <>
      <div className="homecontainer">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={BackVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="content">
        <div className="profile-icon">
          <img
            onClick={handleLogout}
            src={LoginButton}
            alt="Profile"
            className="loginimage"
          />
        </div>
        <div className="mainpage-container">
          <h1 className="heading">NEXT MOVIE</h1>
          <h2>Your Movie Bucket List</h2>
          <AddMovie />
          <MovieContainer
            scroll={isScrolling}
            fog={isfog}
            loading={isloading}
            selected={isdisplayselected}
            selectedscroll={isselectedscroll}
          />
          <button onClick={toggleScroll} className="scroll-btn">
            Spin
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
export default Homepage;
