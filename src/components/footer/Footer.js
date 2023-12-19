import React from "react";
//im prting icons from react
import { FaInstagram, FaLinkedin } from "react-icons/fa";
//enclosing everything in a content wrapper
import ContentWrapper from "../contentWrapper/ContentWrapper";
//CSS
import "./style.scss";

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <footer className="footer">
      <ContentWrapper>
        <h4 className="footer-title">Copyright {year}: Sarthak Niranjan</h4>
        <a
          href="https://github.com/fancyguyiitb/"
          target="_blank"
          rel="noreferrer"
        >
          <h6>View GitHub Repository</h6>
        </a>
        <div className="infoText">
          Welcome to MovieMania – your one-stop hub for movie details! Discover
          comprehensive information on any movie you're interested in. From
          classic favorites to the latest releases, find cast details, plot
          summaries, ratings, reviews, and trailers with ease. MovieMania offers
          a user-friendly interface for both cinephiles and casual enthusiasts.
          Explore the world of movies effortlessly with us!
        </div>
        <div className="socialIcons">
          <span className="icon">
            <a
              href="https://www.instagram.com/fancy.guy_iitb/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
          </span>
          <span className="icon">
            <a
              href="https://www.linkedin.com/in/sarthak-niranjan-abba821a9/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
