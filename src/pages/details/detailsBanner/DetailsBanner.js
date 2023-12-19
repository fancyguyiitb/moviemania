import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";

import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.jpg";
import { PlayIcon } from "./PlayIcon";
// import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  //creating state for video PopUp
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  //destructuring the url
  const { mediaType, id } = useParams();
  //calling the aPI to fetch movie details
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  //getting base url for image from redux store
  const { url } = useSelector((state) => state.home);

  //to show genres
  //const _genres = data?.genres?.map((g)=> {return g.id});

  //function to show total runtime in hours and minutes
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {/* we proceed further only if data is not null */}
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                {/* Showing poster image */}
                <Img src={url.poster + data?.poster_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  {/* to show poster image */}
                  <div className="left">
                    {/* if no image returned, use fallback image */}
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.poster + data?.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  {/* showing movie details */}
                  <div className="right">
                    <div className="title">
                      {/* name + release year */}
                      {`${
                        data.name || data.title || data.original_title
                      } (${dayjs(data.release_date).format("YYYY")})`}
                    </div>
                    <div className="subtitle">"{data.tagline}"</div>

                    <div className="row">
                      {/* movie rating */}
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      {/* Watch Trailer Button */}
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video?.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    {/* Overview */}
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data?.overview}</div>
                    </div>
                    {/* Info and release */}
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <div className="text">{data.status}</div>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <div className="text">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </div>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <div className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        // loading skeleton
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
