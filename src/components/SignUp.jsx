import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import BackVideo from "../assets/cinema.mp4";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
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
          <h2 className="heading">NXT MOVIE</h2>
          <br />
          <br />
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} className="authform">
            <label htmlFor="email">Email address</label>
            <input
              id="sigup-email"
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              id="signup-password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="submitbtncontainer">
              <Button className="submitbtn" type="Submit">
                SignUp
              </Button>
            </div>
            <br />
          </Form>

          <div className="">
            Already have an account? <Link to="/">Log In</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
