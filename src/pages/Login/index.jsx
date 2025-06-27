import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "../../images/Sign-In.webp";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import cogoToast from "cogo-toast";
import * as Yup from "yup";
import {  useSelector } from "react-redux";
import google from "../../images/google.png";
import facebook from "../../images/Facebook.svg";
import linkedin from "../../images/linkedin.png";
import twitter from "../../images/twitter.png";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required!"),
  password: Yup.string().required("Password is Required!"),
});

const SignIn = () => {
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.userDetails);
  console.log("userData", userData);

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center bg-white">
      <Row className="w-100 align-items-center justify-content-center">
        <Col xs={12} md={6} lg={5} className="p-4">
          <h2 className="mb-2">Sign In</h2>
          <p>
            New user? <a href="/signup">Create an account</a>
          </p>
          <Formik
            initialValues={{
              email: "",
              password: "",
              keepSignedIn: false,
            }}
            enableReinitialize={true}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={async (values, { resetForm }) => {
              console.log("Values LogIn ", values);

              if (values.email === userData.email && values.password === userData.password) {
                navigate("/home");
                resetForm();
                cogoToast.success("User Log In Sucessfully!");
              } else {
                cogoToast.error("Invalid email or password");
              }

              // TODO: Uncomment this when the backend is ready for signin API

              // const resp = await fetch(`${url}/signin`, {
              //   method: "POST",
              //   mode: "cors",
              //   headers: { "Content-Type": "application/json" },
              //   body: JSON.stringify(values),
              // })
              //   .then((resp) => resp.json())
              //   .then((data) => data?.data);
              // // console.log("resp", resp);
              // if (resp?.error == false) {
              //   cogoToast.success("User Log In Sucessfully!");
              //   navigate("/home");
              // } else cogoToast.error(resp?.massage);
            }}>
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form onSubmit={handleSubmit}>
                <input
                  id="email"
                  type="text"
                  name="email"
                  className="mb-3"
                  placeholder="Email"
                  onChange={(event) => handleChange(event)}
                  value={values.email}
                />
                {errors.email ? (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.email}
                  </div>
                ) : null}
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="mb-3"
                  placeholder="Password"
                  value={values.password}
                  onChange={(event) => handleChange(event)}
                />
                {errors.password ? (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.password}
                  </div>
                ) : null}
                <div className="d-flex align-items-center mb-3">
                  <input
                    id="keepSignedIn"
                    name="keepSignedIn"
                    type="checkbox"
                    className="mb-3"
                    checked={values.keepSignedIn}
                    onChange={(event) => handleChange(event)}
                  />
                  <label htmlFor="keepSignedIn" className="ms-2">
                    Keep me signed in
                  </label>
                </div>
                <Button variant="dark" type="submit" className="w-50">
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
          <hr />
          <p className="text-center">Or Sign In With</p>
          <div className="d-flex justify-content-center gap-3 social-icons">
            <div className="icon-wrapper">
              <img src={google} alt="google" />
            </div>
            <div className="icon-wrapper">
              <img src={facebook} alt="facebook" />
            </div>
            <div className="icon-wrapper">
              <img src={linkedin} alt="linkedin" />
            </div>
            <div className="icon-wrapper">
              <img src={twitter} alt="twitter" />
            </div>
          </div>
        </Col>
        <Col md={6} className="d-none d-md-block text-center">
          <img
            src={img}
            alt="illustration"
            className="img-fluid"
            style={{ maxHeight: "400px" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
