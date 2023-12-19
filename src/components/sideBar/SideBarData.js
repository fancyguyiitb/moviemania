import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.scss";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.jpg";
import avatar from "../../assets/avatar.jpg";

const SideBarData = (props) => {
  const { mediaType, id } = props;

  //calling the aPI to fetch movie details
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  //calling the aPI to fetch movie and show cast details
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  console.log(credits?.cast);

  //getting base url for image from redux store
  const { url } = useSelector((state) => state.home);

  //function to show total runtime in hours and minutes
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="sideBarContent">
      {/* we proceed further only if data is not null */}
      {!!data && (
        <>
          <React.Fragment>
            <div className="backdrop-img">
              {/* Showing poster image */}
              <Img src={url.poster + data?.poster_path} />
            </div>
            <div className="opacity-layer"></div>
            <div className="content">
              <div className="left">
                {/* <div className="posterImg">
                  <Img
                    className="posterImg"
                    src={
                      data.poster_path
                        ? url.poster + data?.poster_path
                        : PosterFallback
                    }
                  />
                </div> */}
              </div>
              {/* showing movie details */}
              <div className="right">
                <div className="title">
                  {/* name + release year */}
                  {`${data.name || data.title || data.original_title} (${dayjs(
                    data.release_date
                  ).format("YYYY")})`}
                </div>
                <div className="subtitle">
                  "
                  {data.tagline
                    ? data.tagline
                    : "Sorry, tagline not available!"}
                  "
                </div>
                <div className="row">
                  {/* movie rating */}
                  {/* <CircleRating rating={data.vote_average.toFixed(1)}/> */}

                  {/* Overview */}
                  <div className="overview">
                    {/* <div className="heading">Overview</div> */}
                    <div className="description">
                      {data?.overview}
                    </div>
                  </div>

                  {/* Info and release */}
                  <div className="info">
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
                    {data.runtime && (
                      <div className="infoItem">
                        <span className="text bold">Rating: </span>
                        <div className="text">{data.vote_average}/10</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="castSection">
              <div className="sectionHeading">Top Cast</div>
              <div className="listItems">
                {credits?.cast?.map((item) => {
                  if (item.known_for_department === "Acting")
                    return (
                      <div className="listItem">
                        <div className="profileImg">
                      <Img src={item.profile_path
                  ? url.profile + item.profile_path
                  : avatar} />
                    </div>
                        <div className="name">{item.name}</div>
                        <div className="character">{item.character}</div>
                      </div>
                    );
                })}
              </div>
            </div>
          </React.Fragment>
        </>
      )}
    </div>
  );
};

export default SideBarData;
