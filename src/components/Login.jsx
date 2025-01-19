import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import BackVideo from "../assets/cinema.mp4";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
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

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} className="authform">
            <div>
              <label htmlFor="email">Email address</label>
              <br />
              <input
                type="email"
                id="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>

            <label htmlFor="password">Password</label>
            
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="submitbtncontainer">
              <Button className="submitbtn" type="Submit">Log In</Button>
            </div>
            <br />
            <hr />
          <div className="googlebutton">
            <GoogleButton
              className="g-btn"
              type="dark"
              onClick={handleGoogleSignIn}
            />
          </div>
          <br />
          </Form>
          

          <div >
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
