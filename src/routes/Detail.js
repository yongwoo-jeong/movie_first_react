import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetail(json.data);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      <div>
        <h2>Movie detail for </h2>{" "}
        {detail.movie && <strong>{detail.movie.title}</strong>}
        <hr />
        {detail.movie && (
          <div>
            <div>
              <img src={detail.movie.medium_cover_image} />
              <p>{detail.movie.description_intro}</p>
            </div>
            <div>
              <ul>
                {detail.movie.genres &&
                  detail.movie.genres.map((g, key) => <li key={key}>{g}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
      <hr />
      <Link to="/">
        <button type="button">Get back!</button>
      </Link>
    </div>
  );
}
export default Detail;
