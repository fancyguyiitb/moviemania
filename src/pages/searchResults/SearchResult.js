//axios for network calld
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
//CSS
import "./style.scss";

// import { fetchApiData } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";


const SearchResult = () => {
  //  CREATING STATES
  //--data state to store API data
  const [data, setData] = useState(null);
  //page number state; default is page 1; to get >20 results we use other pages
  const [pageNum, setPageNum] = useState(1);
  //--loading state while data being fetched
  const [loading, setLoading] = useState(false);
  //destructuring query from te URL
  const { query } = useParams();

  //function for custom API call
  const fetchSearchData = async (url) => {
    try {
      const response = await axios.get(url);
      //using axios, te data is already converted to json, we only need to
      //extract data out of it
      return response.data;
    } catch (error) {
      console.log("Error contacting the API, the server says: " + error);
      return error;
    }
  };

  //function to initially fetch data in search page
  const fetchInitialData = () => {
    setLoading(true);
    fetchSearchData(
      `https://api.themoviedb.org/3/search/multi?query=${query}&page=${pageNum}&api_key=d201050bd524332ba636f32aaa78750e`
    ).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  //function to fetch data from second page onwards
  const fetchNextPageData = () => {
    //set loading true
    setLoading(true);
    //calling API
    fetchSearchData(
      `https://api.themoviedb.org/3/search/multi?query=${query}&page=${pageNum}&api_key=d201050bd524332ba636f32aaa78750e`
    ).then((res) => {
      //if some data already exits, append the response data to that data
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } //else, copy everything to data
      else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
    //set loading false
    setLoading(false);
  };

  //whenever query is modified, we fire the fetch-data API
  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
    // eslint-disable-next-line
  }, [query]);

  console.log(data?.results);

  return (
    <div className="searchResultsPage">
      {/* if loading true, show spinner */}
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {/* if results array non-empty, then show results */}
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              {/* infinite scroll component */}
              <InfiniteScroll
                className="content"
                //length of data array, initially empty
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                //infinite scroll will work only until pages are left
                hasMore={pageNum <= data?.total_pages}
                //loading function
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
              
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
