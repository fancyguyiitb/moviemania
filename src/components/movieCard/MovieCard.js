import React, { useState } from "react";
import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
// import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.jpg";

import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import SideBarData from "../../components/sideBar/SideBarData";

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-right: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 5;
`;

const SidebarNav = styled.nav`
  background: #04152d;
  /* box-shadow: 10px 10px 50px 7px rgba(0, 0, 0, 0.4); */
  @media only screen and (min-width: 768px) {
    width: 50vw;
  }
  @media only screen and (max-width: 600px) {
    width: 100vw;
  }
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: all 450ms ease-in-out;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  // const navigate = useNavigate();

  const [sidebar, setSidebar] = useState(false);

  const [media, setMedia] = useState(null);
  const [id, setId] = useState(null);

  const showSidebar = () => setSidebar(!sidebar);

  const saveUrl = (media, id) => {
    setMedia(media);
    setId(id);
    // console.log(sideBarData);
  };
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;
  return (
    <div
      className="movieCard"
      //navigate to details page
      // onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      {/* poster */}
      <div
        className="posterBlock"
        onClick={() => {
          saveUrl(`/${data.media_type || "movie"}`, `${data.id}`);
          showSidebar();
        }}
      >
        <Img className="posterImg" src={posterUrl} />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating rating={data.vote_average.toFixed(1)} />
            {/* <Genres data={data.genre_ids.slice(0, 2)} /> */}
          </React.Fragment>
        )}
      </div>
      {/* text area */}
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
      <div className="sideBar">
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose
                onClick={() => {
                  showSidebar();
                  // setSideBarData(item);
                }}
              />
            </NavIcon>
            <SideBarData mediaType={media} id={id} />
          </SidebarWrap>
        </SidebarNav>
      </div>
    </div>
  );
};

export default MovieCard;
