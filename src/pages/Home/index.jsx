import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import CountriesHeader from "../CountriesHeader/CountriesHeader";
import google from "../../images/google.png";
import facebook from "../../images/Facebook.svg";
import linkedin from "../../images/linkedin.png";
import twitter from "../../images/twitter.png";
import "./home.css";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get(
        "https://restcountries.com/v2/all?fields=name,region,flag"
      );
      setCountries(response?.data);
    };

    fetchCountries();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const handlePrevious = () => {
    setCurrentSlideIndex((prev) =>
      prev === 0 ? countries.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) =>
      prev === countries.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      {/* Header */}
      <CountriesHeader />

      {/* Welcome Section */}
      <Container className="my-4">
        <div className="welcome-header text-center mb-4">
          <hr className="line" />
          <h1 className="mx-3 fw-bold">WELCOME</h1>
          <hr className="line" />
        </div>

        <Row className="mb-4">
          <Col md={8}>
            <div className="carousel-placeholder position-relative">
              <div className="carousel-container">
                {countries.length > 0 && (
                  <div className="d-flex">
                    <img
                      src={countries[currentSlideIndex]?.flag}
                      alt={countries[currentSlideIndex]?.name}
                      className="country-flag-slider"
                    />
                    <div className="">
                      <h5>{countries[currentSlideIndex]?.name}</h5>
                      <p>{countries[currentSlideIndex]?.region}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="d-inline-flex justify-content-between">
              <Button
                variant="dark"
                className="carousel-btn carousel-btn-prev position-absolute top-90 start-0 translate-middle-y"
                onClick={handlePrevious}
                style={{ zIndex: 10 }}>
                Previous
              </Button>
              <Button
                variant="dark"
                className="carousel-btn carousel-btn-next position-absolute top-90 end-0 translate-middle-y"
                onClick={handleNext}
                style={{ zIndex: 10 }}>
                Next
              </Button>
              </div>

              {/* Pagination Dots */}
              <div className="pagination-dots text-center mt-3">
                {countries.slice(0, 4).map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${
                      currentSlideIndex === index ? "active" : ""
                    }`}
                    onClick={() => setCurrentSlideIndex(index)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="featured-box">Featured</div>
          </Col>
        </Row>

        {/* Country Cards */}
        <Row>
          {countries.slice(0, visibleCount).map((country, index) => (
            <Col key={index} sm={12} md={6} lg={6} className="mb-4">
              <Card className="country-card flex-row align-items-center h-100 p-2">
                <Card.Img
                  variant="left"
                  src={country?.flag}
                  alt={country?.name}
                  className="country-flag"
                />
                <Card.Body className="p-2">
                  <Card.Title className="mb-1">{country?.name}</Card.Title>
                  <Card.Text className="text-muted">
                    {country?.region}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Load More Button */}
        {visibleCount < countries.length && (
          <div className="text-center mt-3">
            <Button variant="dark" onClick={handleLoadMore}>
              Load more
            </Button>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-5">
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
          <p>Example@gmail.com</p>
          <small>Copyright © 2020 All rights reserved.</small>
        </footer>
      </Container>
    </>
  );
};

export default Home;
