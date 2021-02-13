import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "./LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "../styles/Login.css";

export default function Login() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    
    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-lg-4"></div>
        <div className="col col-lg-4">
          <div className="row">
                <div className="col"></div>
                <div className="col formLogLabel">
                  <p className="h2">Sign in</p>
                </div>
                <div className="col"></div>
            <div className="container-fluid">
            <Form className="loginForm" onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  value={fields.email}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={fields.password}
                  onChange={handleFieldChange}
                />
              </Form.Group>
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
            <a className="loginTag">Forgot Email?</a>
          </div>
          <div className="row">
            <a className="loginTag">Don't have an account yet?</a>
          </div>

        </div>
        <div className="col col-lg-4"></div>
      </div>
    </div>
  );
}