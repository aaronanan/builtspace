import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

import Form from "react-bootstrap/Form";
import LoaderButton from "./LoaderButton";

import { useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";

import "../styles/Login.css";

function Login(props) {
  // const history = useHistory();
  // const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  // const [formState, updateFormState] = useState(props.formState)
  // const { formType, error } = formState
  const [user, updateUser] = useState(null)

  function handleChange(event) {
    props.onChange(event)
  }

  function signIn(event) {
    event.preventDefault()
    setIsLoading(true);
    const { username, password } = props.formState
    Auth.signIn(username, password)
    .then(user => {
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        props.updateFormState(() => ({ ...props.formState, formType: 'changePassword' }))
        updateUser(user)
      } else {
        props.updateFormState(() => ({ ...props.formState, formType: 'signedIn' }))
      }
    }).then(() => {
      setIsLoading(false);
    }).catch(e => {
      console.log(e)
      setIsLoading(false)
      props.updateFormState(() => ({ ...props.formState, error: e.message }))
    });
  }

  async function changePassword(event) {
    event.preventDefault()
    setIsLoading(true);

    const { newPassword, confirmNewPassword } = props.formState
    if (newPassword === confirmNewPassword) {
      Auth.completeNewPassword(user, newPassword)
      .then(() => {
        props.updateFormState(() => ({ ...props.formState, formType: 'signedIn' }))
      }).catch(e => {
        console.log(e);
        setIsLoading(false)
        props.updateFormState(() => ({ ...props.formState, error: e.message }))
      });
    } else {
      setIsLoading(false)
      props.updateFormState(() => ({ ...props.formState, error: 'Password does not match'}))
    }
  }

  // function validateForm() {
  //   return fields.email.length > 0 && fields.password.length > 0;
  // }

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
                {props.formState.formType === 'signIn' && (
                <p className="h2 form_header">Sign In</p>
                )}
                {props.formState.formType === 'changePassword' && (
                  <div>
                    <p className="h2 form_header">Welcome!</p>
                    <p className="h4 form_header">Please choose a new password</p>
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="container">
              {props.formState.formType === 'signIn' && (
                <Form className="loginForm" onSubmit={signIn}>
                  <Form.Group size="md" controlId="email">
                  <Form.Label>Username/Email</Form.Label>
                  <Form.Control
                    autoFocus
                    name="username"
                    onChange={handleChange}
                  />
                  </Form.Group>

                  <Form.Group size="md" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    onChange={handleChange}
                  />
                  </Form.Group>

                  <LoaderButton
                    className="btn btn-md loginBtn"
                    type="submit"
                    isLoading={isLoading}
                  >
                  Sign In
                  </LoaderButton>
                </Form>
                )}

                {props.formState.formType === 'changePassword' && (
                <Form className="loginForm" onSubmit={changePassword}>
                  <Form.Group size="md" controlId="email">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    autoFocus
                    name="newPassword"
                    type="password"
                    onChange={handleChange}
                  />
                  </Form.Group>

                  <Form.Group size="md" controlId="password">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    name="confirmNewPassword"
                    type="password"
                    onChange={handleChange}
                  />
                  </Form.Group>

                  <LoaderButton
                    className="btn btn-md loginBtn"
                    type="submit"
                    isLoading={isLoading}
                  >
                  Continue
                  </LoaderButton>
                </Form>
                )}

              </div>
            </div>

            <div className="row">
              <div className="container-fluid text-center mt-5">
                { props.formState.error != '' && (
                  <p className="text-danger">{ props.formState.error }</p>
                )}
              </div>
            </div>

            <br></br>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;