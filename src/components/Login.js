import React, { useState } from "react";
import { Auth } from "aws-amplify";

import Form from "react-bootstrap/Form";
import LoaderButton from "./LoaderButton";

import { useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";

import "../styles/Login.css";

function SignIn(props) {
  const {authState, onStateChange} = props;
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  function handleInputChange(e) {
    const {value, dataset} = e.target;
    const {prop} = dataset;
    setFormData({
      ...formData,
      [prop]: value
    });
  };

  const signInClick = async () => {
    try{
      await Auth.signIn(formData.username, formData.password);
      onStateChange(authState);
    }
    catch(error){
      console.log(error)
    };
  };


};



function Login() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: ""
  });
  const [firstSignIn, setFirstSignIn] = useState(false);

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    Auth.signIn(fields.username, fields.password)
    .then(user => {
    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setFirstSignIn(true);
        // const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
        // Auth.completeNewPassword(
        //     user,               // the Cognito User Object
        //     newPassword,       // the new password
        //     // OPTIONAL, the required attributes
        //     {
        //       email: 'xxxx@example.com',
        //       phone_number: '1234567890'
        //     }
        // ).then(user => {
        //     // at this time the user is logged in if no MFA required
        //     console.log(user);
        // }).catch(e => {
        //   console.log(e);
        // });
    } else {
        // other situations
    }
}).catch(e => {
    console.log(e);
});

  }

  // async function handleSubmit(event) {
  //   event.preventDefault();

  //   setIsLoading(true);
    
  //   try {
  //     await Auth.signIn(fields.email, fields.password);
  //     userHasAuthenticated(true);
  //     history.push("/");
  //   } catch (e) {
  //     onError(e);
  //     setIsLoading(false);
  //   }
  // }

  return (
    <div className="container-fluid wrapper">
      <div className="container login-card bg-light">
        <div className="row">
          <div className="col text-center">
            <img className="login_logo" src="logo.png" alt=""></img>
          </div>
          <div className="col">
            <br></br>
            <div className="row">
              <div className="container-fluid text-center">
                <p className="h2 form_header">Welcome Back!</p>
              </div>
            </div>
            <div className="row">
              <div className="container">
                <Form className="loginForm" onSubmit={handleSubmit}>
                  <Form.Group size="md" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    autoFocus
                    // type="email"
                    value={fields.email}
                    onChange={handleFieldChange}
                  />
                </Form.Group>
                  <Form.Group size="md" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={fields.password}
                    onChange={handleFieldChange}
                  />
              </Form.Group>

              {firstSignIn == true &&
                <Form.Group size="md" controlId="password">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={fields.password}
                    onChange={handleFieldChange}
                  />
              </Form.Group>
              }

              <LoaderButton
                className="btn btn-md loginBtn"
                type="submit"
                isLoading={isLoading}
              >
                Login
              </LoaderButton>
            </Form>
            </div>
          </div>
          <br></br>
          <div className="row">
            <a className="loginTag" href="/signup">Don't have an account yet?</a>
          </div>
        </div>



      </div>
      </div>
    </div>

  );
}

export default Login;