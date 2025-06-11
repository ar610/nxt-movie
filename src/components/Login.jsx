import {  useNavigate } from "react-router-dom";

import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import BackVideo from "../assets/cinema.mp4";
import { initializeUserMovies } from "../utils/firebase-movie";

const Login = () => {
  
  const { googleSignIn } = useUserAuth();
  const navigate = useNavigate();


  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await googleSignIn();
      await initializeUserMovies(result.user.uid);
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="authpage">
        <video autoPlay loop muted playsInline className="background-video">
          <source src={BackVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
        <div className="content">
          <h1 className="heading">NXT MOVIE</h1>
          <br/>
          <br/>
            
          <div className="googlebutton">
            <GoogleButton
              className="g-btn"
              type="dark"
              onClick={handleGoogleSignIn}
            />
          </div>
          <br />
         

           
        </div>
      </div>
    </>
  );
};

export default Login;
