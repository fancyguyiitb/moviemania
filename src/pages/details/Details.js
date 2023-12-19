import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import useFetch from "../../hooks/useFetch";

import DetailsBanner from "./detailsBanner/DetailsBanner";

import Cast from "./cast/Cast";

const Details = () => {
  //destructuring the url
  const { mediaType, id } = useParams();
  //calling the aPI to fetch movie and show trailers
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  //calling the aPI to fetch movie and show cast details
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  // console.log(credits?.crew);
  console.log(data?.results[0]);
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.crew} loading={credits?.loading}/>
    </div>
  );
};

export default Details;
