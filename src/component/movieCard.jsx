function MovieCard({ movieData }) {
  function Dummy() {
    console.log("hello world");
  }
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movieData.url} alt={movieData.title} />
        <div className="overlay">
          <button onClick={Dummy}> like</button>
        </div>
      </div>
      <div className="movie-info">
        <div className="movie-title">{movieData.title}</div>
        <div className="realease_date">{movieData.release_date}</div>
      </div>
    </div>
  );
}
export default MovieCard;
