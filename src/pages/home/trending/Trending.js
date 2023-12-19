import React from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
//importing the carousel
import Carousel from "../../../components/carousel/Carousel";


const Trending = () => {
  //useState hook to call API based on selected tab
  const [endpoint, setEndpoint] = useState("day");

  //making API call using useFetch
  const {data, loading} = useFetch(`/trending/all/${endpoint}`)
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
  );
};

export default Trending;
