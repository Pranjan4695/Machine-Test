import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "../../images/Sign-In.webp";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import cogoToast from "cogo-toast";
import * as Yup from "yup";
import google from "../../images/google.png";
import facebook from "../../images/Facebook.svg";
import linkedin from "../../images/linkedin.png";
import twitter from "../../images/twitter.png";
import "./signup.css";
import { userDetails } from "../../Redux/Slices/user.slice";
import { useDispatch } from "react-redux";



const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is Required!")
    .max(34, "Too Long - should be 35 characters maximum!"),
  email: Yup.string().email("Invalid email").required("Email is Required!"),
  password: Yup.string()
    .required("Password is Required! ")
    .min(8, "Password is too short - should be 8 characters minimum!")
    .max(
      19,
      "Password is too long - should be less than 20 characters maximum!"
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
      "Password must include an uppercase letter, lowercase letter, digit, special character, and no spaces."
    ),
  country: Yup.string().required("Country is Required!"),
  checked: Yup.boolean().required("Required!"),
});

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center bg-white">
      <Row className="w-100 align-items-center justify-content-center">
        <Col xs={12} md={6} lg={5} className="p-4">
          <h2 className="mb-2">Sign Up</h2>
          <p>
            Already have an account? <a href="/">Sign In</a>
          </p>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              country: "",
              checked: false,
            }}
            enableReinitialize={true}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={async (values, { resetForm }) => {
              console.log("Values LogIn ", values);
              dispatch(userDetails(values));
              resetForm();
              cogoToast.success("User Sign Up Sucessfully!");
              navigate("/");

              // TODO: Uncomment this when the backend is ready for signup API

              // const resp = await fetch(`${url}/signup`, {
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
                  id="name"
                  type="text"
                  name="name"
                  className="mb-3"
                  placeholder="Name"
                  onChange={(event) => handleChange(event)}
                  value={values.name}
                />
                {errors.name ? (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.name}
                  </div>
                ) : null}

                <input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="mb-3"
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

                <input
                  id="country"
                  type="text"
                  name="country"
                  className="mb-3"
                  placeholder="Country"
                  value={values.country}
                  onChange={(event) => handleChange(event)}
                />
                {errors.country ? (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.country}
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
                  Sign Up
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

export default Signup;
