import MovieCard from "../component/movieCard";
// import "../App.css";
import { useState } from "react";
export default function MovieApp() {
  const [searchQ, setSearchQ] = useState("");
  function handleSUbmit(e) {
    e.preventDefault();
    alert(searchQ);
  }
  const data = [
    {
      title: "Michael film",
      url: "example.com",
      realease_date: "20/20/2021",
    },
    {
      title: "Taiwo film",
      url: "example.com",
      realease_date: "20/20/2021",
    },
    {
      title: "raphael film",
      url: "example.com",
      realease_date: "20/20/2021",
    },
  ];

  return (
    <div className="sub-main">
      <div className="search">
        <form
          onSubmit={(e) => {
            handleSUbmit(e);
          }}
          action="test.com"
        >
          <input
            type="text"
            placeholder="example text"
            value={searchQ}
            onChange={(e) => {
              setSearchQ(e.target.value);
            }}
          />
          <button>submit</button>
        </form>
      </div>

      <div className="movie-grid">
        {data.map((movie, id) => {
          return (
            movie.title.toLowerCase().startsWith(searchQ) && (
              <MovieCard key={id} movieData={movie} />
            )
          );
        })}
      </div>
    </div>
  );
}
