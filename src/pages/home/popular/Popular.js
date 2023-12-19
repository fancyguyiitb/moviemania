import React from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
//importing the carousel
import Carousel from "../../../components/carousel/Carousel";


const Popular = () => {
  //useState hook to call API based on selected tab
  const [endpoint, setEndpoint] = useState("movie");

  //making API call using useFetch
  const {data, loading} = useFetch(`/${endpoint}/popular`)

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What's Popular?</span>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  );
};

export default Popular;
