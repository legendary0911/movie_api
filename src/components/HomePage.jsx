import "../App.css";
import React, { useEffect, useState } from 'react';
import MovieResultCard from "./MovieResultCard";
import Header from "./Header";
import Footer1 from "./footer";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';



function HomePage() {

  const initarray = [{ vote_average: 5, title: "cbum cutie", overview: "random random random random ", img: "null", id: 69, release_date: "19/08/2002" }];
  const [filteredData, setFilterData] = useState(initarray);
  const [search, setSearch] = useState();
  const [i, seti] = useState(0);
  const [j, setj] = useState(12);
  const data = useLocation();
  const de = data?.state?.status;




  function handleFilter(event) {
    const searchWord = event.target.value;
    setSearch(searchWord);


  };

  async function fetchMovie(url) {
    console.log("movie fetcher on1 called")

    const res = await fetch(url)

      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then(({ results: films }) => {

        const Data = films;
        Data.map((res) => {
          
          if (res.poster_path === null) {
            res.poster_path = "/vZ9WvnZnhEsyMpxxTyGhZGdoBaS.jpg"
            console.log("null poster value")
          }
          res.poster_path = "https://image.tmdb.org/t/p/w500" + res.poster_path;
          res.vote_average=Math.round(res.vote_average *10)/10;

        })
        setFilterData(Data)
        seti(0);
        setj(12);
        console.log("this is searched data");
        console.log(filteredData);

      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  function Create(movie) {
    return (
      <Link to={{ pathname: `/${movie.id}` }} state={{ movie }} >
        <MovieResultCard
          rating={movie.vote_average}
          title={movie.title ? movie.title : movie.original_name}
          description={movie.overview.substring(0, 150) + "..."}
          img={movie.poster_path}
          id={movie.id}
          year={movie.release_date ? movie.release_date : movie.first_air_date}
          media={movie.media_type}
        ></MovieResultCard>
      </Link>
    )
  };

  function hii(){
    alert("dont click me")
 }




  useEffect(() => {
    if (de === "trending" && search == null) {
      fetchMovie(`https://api.themoviedb.org/3/trending/movie/day?api_key=f4d13e54ee0dd343bf1d107564f37d83`)
    }
    else if (de === "latest" && search == null) {
      fetchMovie(`https://api.themoviedb.org/3/trending/movie/week?api_key=f4d13e54ee0dd343bf1d107564f37d83`)
    }
    else if (de === "popular" && search == null) {
      fetchMovie(`https://api.themoviedb.org/3/movie/top_rated?api_key=f4d13e54ee0dd343bf1d107564f37d83#`)
    }
    else if (search == null) {
      fetchMovie(`https://api.themoviedb.org/3/movie/top_rated?api_key=f4d13e54ee0dd343bf1d107564f37d83#`)
    }
    else {
      fetchMovie(`https://api.themoviedb.org/3/search/movie?api_key=f4d13e54ee0dd343bf1d107564f37d83&query=${search}`)
      
    }
  }, [search]);

  return (
    <div>
      <div className=' bg-[url("https://i.stack.imgur.com/yDr7J.jpg")]'>
        <Header on1={()=> fetchMovie(`https://api.themoviedb.org/3/trending/movie/day?api_key=f4d13e54ee0dd343bf1d107564f37d83`)} on2={() => fetchMovie(`https://api.themoviedb.org/3/trending/movie/week?api_key=f4d13e54ee0dd343bf1d107564f37d83`)} on3={() => fetchMovie(`https://api.themoviedb.org/3/movie/top_rated?api_key=f4d13e54ee0dd343bf1d107564f37d83#`)} className="" />
        <div className="rounded-b-2xl w-[80%] mx-auto pl-10 pt-6 bg-[url('https://img5.goodfon.com/wallpaper/nbig/1/61/fon-netflix-logo-raduga-tsvet-fon-background-skachat-oboi-sk.jpg')]">

          <p className="text-6xl text-white mb-2">Welcome</p>
          <p className="text-5xl text-white tracking-wide brightness-150 ">Million of movies,TV shows and people to discover.Explore now.</p>
          <div className="text-center ">
            <input type="text" placeholder="What are you loooking for..." className=" text-black mt-10 mb-12 w-[60%] h-12 rounded-xl pl-5 ml-10  " onChange={handleFilter} />
            <SearchIcon className=" text-blue-500 font-semibold scale-[1.3] relative right-10 bottom-0.5 " />

          </div>

        </div>

        <div className=" w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 h-fit mt-10 ">
          {filteredData.slice(i, j).map(Create)}
        </div>

        <div className="mt-10 w-[78%] mb-6 rounded-lg border-white border-[1px] bg-[#111827] mx-auto px-10 py-4">
          {i !== 0 ? <button className=" hover:bg-blue-500 hover:text-white ring-2 ring-offset-4 ring-offset-[#111827] h-10 w-20 text-xl bg-white rounded-lg mr-4" onClick={() => {
            seti(i - 12);
            setj(j - 12);

          }}>back</button> : null}
          <button className="hover:bg-blue-500 hover:text-white ring-2 ring-offset-4 ring-offset-[#111827] h-10 w-20 text-xl bg-white rounded-lg " onClick={() => {

            seti(i + 12);
            setj(j + 12);



          }}>next</button>
        </div>



        <Footer1 />
      </div>
    </div>

  );
};

export default HomePage;

