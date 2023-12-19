import React, { useState, useEffect } from "react";
//importing CSS
import "./style.scss";
//importing navigate hook to go from one page to other
import { useNavigate } from "react-router-dom";
//importing the custom useFetch hook
import useFetch from "../../../hooks/useFetch";
//importing useSelector hook; allows to extract data or the state from the redux store
//using the selector function
import { useSelector } from "react-redux";
//importing content wrapper
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
//importing Lazy Load Image
import Img from "../../../components/lazyLoadImage/Img";

const HeroBanner = () => {
  //creating a state to store and update hero section BG
  const [background, setBackground] = useState("");
  //state to store and handle the search text
  const [query, setQuery] = useState("");
  //creating navigation instance
  const navigate = useNavigate();

  //getting the remaining URL of the image
  const { url } = useSelector((state) => state.home);

  //destructuring data from API
  const { data, loading } = useFetch("movie/upcoming");

  //creating a useEffect hook to assign the banner image
  useEffect(() => {
    //extracting backdrop from the API data
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  //function to handle search request
  const searchQueryHandler = (event) => {
    //only run search function when Enter key pressed
    //and length of query is NOT 0
    if (event.key === "Enter" && query.length > 0) {
      //pressing enter should reroute us to the searchResults page
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="heroBanner">
      {/* adding bakcground image to the heroBANNER */}
      {/* only show image when NOT loading */}
      {!loading && (
        <div className="backdrop-img">
          {/* this will ad BG image to banner */}
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome!</span>
          <span className="subTitle">
            MovieMania helps you find everything about your favorite movie.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for your favorite Movie/TV Show!"
              onChange={(e) => setQuery(e.target.value)}
              //function fired when user lifts finger from the keyboard
              onKeyUp={searchQueryHandler}
            />
            <button onClick={()=>{navigate(`/search/${query}`)}}>Search</button>{" "}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
