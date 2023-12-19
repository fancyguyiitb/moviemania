import React, { useRef, useState } from "react";
//for circle rating meter
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
//for changing the date format of the response from server
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
//for lazy loading image
import Img from "../lazyLoadImage/Img";
//if no poster available, use fallback
import PosterFallback from "../../assets/no-poster.jpg";
//importing the rating component
import CircleRating from "../circleRating/CircleRating";

import "./style.scss";

import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import SideBarData from "../sideBar/SideBarData";

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

//destructuring data from thr props
const Carousel = ({ data, loading, endpoint, title }) => {
  //we use this to catch any element such as a div
  const carouselContainer = useRef();
  //getting url from store
  const { url } = useSelector((state) => state.home);
  //creating instance of useNavigate
  const navigate = useNavigate();

  //creating a navigation function to scroll left and right
  const navigation = (direction) => {
    const container = carouselContainer.current;
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // console.log(data);

  //loading skeleton
  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  const [sidebar, setSidebar] = useState(false);

  const [mediaType, setMediaType] = useState(null);
  const [id, setId] = useState(null);

  const showSidebar = () => setSidebar(!sidebar);

  const saveUrl = (mediaType, id)=>{
    setMediaType(mediaType);
    setId(id);
    // console.log(sideBarData);
  }

  return (
    <div className="carousel">
      <ContentWrapper>
        {/* if title passed, add it */}
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />

        {!loading ? (
          //passing the carouselItems as ref
          <>
            <div className="carouselItems" ref={carouselContainer}>
              {/* looping through data to populate carousel */}
              {data?.map((item) => {
                //if poster exits, show it, else use fallback image
                const posterUrl = item.poster_path
                  ? url.poster + item.poster_path
                  : PosterFallback;
                return (
                  //adding navigate function to every movie block

                  <div
                    key={item.id}
                    className="carouselItem"
                    //if media type not available, use the endpoint we provided
                    onClick={() => {
                      saveUrl(`/${item.media_type || endpoint}`,`${item.id}`)
                      showSidebar();
                    }}
                  >
                    <div className="posterBlock">
                      <Img src={posterUrl} />
                      {/* adding rating component; Showing only 1 decimal point */}
                      <CircleRating rating={item.vote_average.toFixed(1)} />
                    </div>
                    <div className="textBlock">
                      <span className="title">{item.title || item.name}</span>
                      <span className="date">
                        {dayjs(item.release_date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
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
                <SideBarData mediaType={mediaType} id={id} />
              </SidebarWrap>
            </SidebarNav>
          </>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
