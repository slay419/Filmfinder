import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import { TextField, Button } from "@material-ui/core";
import "../../styles/updateMovie.scss";
import CastList from "./castList";
import MovieContext from "../../context/movie/movieContext";

import {
  createMuiTheme,
  ThemeProvider,
  styled,
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 12,
  },
  palette: {
    primary: {
      light: "#6ab7ff",
      main: "#1e88e5",
      dark: "#005cb2",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const MovieTextField = styled(TextField)({
  fontFamily: "Poppins",
  //marginTop: 10,
});
var updated = 0;

const UpdateMovie = (props) => {
  const authContext = useContext(AuthContext);
  const { admin, checkIfAdmin } = authContext;
  const movieContext = useContext(MovieContext);
  const {
    actors,
    addActor,
    getMovieById,
    movie,
    addMovie,
    updateMovie,
    resetActors,
  } = movieContext;

  const [title, setTitle] = useState("");
  const [adult, setAdult] = useState(0);
  const [year, setYear] = useState("");
  const [desc, setDesc] = useState("");
  const [poster, setPoster] = useState("");
  const [genre1, setGenre1] = useState("");
  const [genre2, setGenre2] = useState("");
  const [genre3, setGenre3] = useState("");
  const [genre4, setGenre4] = useState("");
  const [cast, setCast] = useState("");
  const [actorList, setActorList] = useState([]);
  const [director, setDirector] = useState("");
  const [tagline, setTagline] = useState("");
  const [keywords, setKeywords] = useState("");
  //const [open, setOpen] = useState(true);
  //setActorList(actors);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const adultHandler = (e) => {
    setAdult(!adult);
  };
  const yearHandler = (e) => {
    setYear(e.target.value);
  };
  const descHandler = (e) => {
    setDesc(e.target.value);
  };
  const posterHandler = (e) => {
    setPoster(e.target.value);
  };
  const genre1Handler = (e) => {
    var temp = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setGenre1(temp);
  };
  const genre2Handler = (e) => {
    var temp = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setGenre2(temp);
  };
  const genre3Handler = (e) => {
    var temp = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setGenre3(temp);
  };
  const genre4Handler = (e) => {
    var temp = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setGenre4(temp);
  };
  const castHandler = (e) => {
    setCast(e.target.value);
  };
  const directorHandler = (e) => {
    setDirector(e.target.value);
  };
  const taglineHandler = (e) => {
    setTagline(e.target.value);
  };
  const keywordHandler = (e) => {
    setKeywords(e.target.value);
  };

  const handleSubmit = () => {
    //alert("Doesn't work yet");

    var genres = [genre1, genre2, genre3, genre4];
    if (updated === 1) {
      updateMovie(
        title,
        adult,
        genres,
        tagline,
        desc,
        year,
        director,
        cast,
        poster,
        keywords
      );
    } else {
      addMovie(
        title,
        adult,
        genres,
        tagline,
        desc,
        year,
        director,
        cast,
        poster,
        keywords
      );
    }
  };

  const handleAddCast = () => {
    addActor(cast);
    setActorList(actors);
  };

  const yearValidator = !(year <= 2099 && year >= 1900);

  if (admin == null) {
    checkIfAdmin();
  }

  useEffect(() => {
    setActorList(actors);
  }, [actors]);

  const id = props.match.params.id;

  useEffect(() => {
    if (id !== undefined && id !== null) {   
      getMovieById(id);
    }
  }, [id]);

  // get all the movie info upon loading & receiving id from the url
  useEffect(() => {
    if (id !== undefined && id !== null) {
      const {
        title,
        genres,
        tagline,
        overview,
        release_date,
        director_name,
        cast,
      } = movie;
      setTitle(title);
      setDesc(overview);
      setTagline(tagline);
      setYear(parseInt(release_date));
      if (genres !== null && genres !== undefined) {
        if (genres.length > 0) {
          setGenre1(genres[1]);
        }
        if (genres.length > 1) {
          setGenre2(genres[2]);
        }
        if (genres.length > 2) {
          setGenre3(genres[3]);
        }
        if (genres.length > 3) {
          setGenre4(genres[4]);
        }
      }
      setActorList(cast);
      setDirector(director_name);
      updated = 1;
    } else {
      setTitle("");
      setDesc("");
      setTagline("");
      setYear(2020);
      setGenre1("");
      setGenre2("");
      setGenre3("");
      setGenre4("");
      setActorList([]);
      setDirector("");
      setKeywords("");
      resetActors();
      updated = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, movie]);

  return (
    <div>
      {admin === 1 ? (
        <div className="update-movie">
          <h1>Movie Editor:</h1>
          <form autoComplete="off">
            <ThemeProvider theme={theme}>
              <MovieTextField
                size="small"
                label="Title"
                variant="outlined"
                onChange={titleHandler}
                value={title}
                required
              />
              <MovieTextField
                size="small"
                label="Is Adult?"
                variant="outlined"
                type="checkbox"
                onChange={adultHandler}
              />
              <MovieTextField
                size="small"
                label="Release Year"
                variant="outlined"
                type="number"
                onChange={yearHandler}
                value={year}
                helperText={yearValidator ? "invalid year" : " "}
                error={yearValidator}
                //error={passwordValidator}
                required
              />
              <MovieTextField
                size="small"
                label="Overview"
                variant="outlined"
                onChange={descHandler}
                helperText=" "
                value={desc}
              />
              <MovieTextField
                size="small"
                label="Tagline"
                variant="outlined"
                onChange={taglineHandler}
                helperText=" "
                value={tagline}
              />
              <MovieTextField
                size="small"
                label="Director"
                variant="outlined"
                onChange={directorHandler}
                helperText=" "
                value={director}
                required
              />
              <MovieTextField
                size="small"
                label="Poster Url"
                variant="outlined"
                type="url"
                onChange={posterHandler}
                helperText=" "
                value={poster}
              />
              <MovieTextField
                size="small"
                label="Keywords: Separate by commas"
                variant="outlined"
                type="text"
                onChange={keywordHandler}
                value={keywords}
                helperText=" "
              />
              <div className="genres">
                <MovieTextField
                  size="small"
                  label="Genre 1"
                  variant="outlined"
                  type="text"
                  onChange={genre1Handler}
                  value={genre1}
                  helperText=" "
                  required
                />
                <MovieTextField
                  size="small"
                  label="Genre 2"
                  variant="outlined"
                  type="text"
                  onChange={genre2Handler}
                  value={genre2}
                  helperText=" "
                />
                <MovieTextField
                  size="small"
                  label="Genre 3"
                  variant="outlined"
                  type="text"
                  onChange={genre3Handler}
                  value={genre3}
                  helperText=" "
                />
                <MovieTextField
                  size="small"
                  label="Genre 4"
                  variant="outlined"
                  type="text"
                  onChange={genre4Handler}
                  value={genre4}
                  helperText=" "
                />
              </div>
              <div className="cast">
                <CastList cast={actorList} />
                <div>
                  <MovieTextField
                    size="small"
                    label="Cast"
                    variant="outlined"
                    type="text"
                    onChange={castHandler}
                    helperText=" "
                  />
                  <span onClick={handleAddCast} variant="text" color="primary">
                    Add Cast
                  </span>
                </div>
              </div>
              <Button
                disabled={yearValidator}
                onClick={handleSubmit}
                variant="text"
                color="primary"
              >
                Preview
              </Button>
            </ThemeProvider>
          </form>
        </div>
      ) : (
        <p>Only an admin can add new movies</p>
      )}
    </div>
  );
};
export default UpdateMovie;
