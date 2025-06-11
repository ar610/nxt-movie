import AddMovie from "./components/AddMovie";
import MovieContainer from "./components/MovieContainer";
import React, { useState, useRef } from "react";
import BackVideo from "./assets/cinema.mp4";
function Homepage() {
  
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
      setloader(true);
    }, 3000);
    
    // Stop scrolling automatically after 5 seconds
    setTimeout(() => {
      setIsScrolling(false);
      setloader(false);
      setselectedscroll(true);//WHY THIS
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
        </video>
        <div className="overlay"></div>
        <div className="content">
          <div className="mainpage-container">
            <AddMovie /> 
            <br />
            <MovieContainer
              scroll={isScrolling}
              fog={isfog}
              loading={isloading}
              selected={isdisplayselected}
              selectedscroll={isselectedscroll}
            />
            <br />
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