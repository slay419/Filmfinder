import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import { TextField, Button, Collapse } from "@material-ui/core";
import "../../styles/updateMovie.scss"

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

const UpdateMovie = ({ movie_id }) => {
    const authContext = useContext(AuthContext);
    const { User, admin, checkIfAdmin } = authContext;

    const [title, setTitle] = useState("");
    const [adult, setAdult] = useState(0);
    const [year, setYear] = useState("");
    const [desc, setDesc] = useState("");
    const [poster, setPoster] = useState("");
    const [secretA, setSecretA] = useState("");
    const [open, setOpen] = useState(true);
  
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

    const handleSubmit = () => {
        alert("lol maybe")
    }

    const yearValidator = !(year <= 2099 && year >= 1900);
  
    if (admin == null) {
        checkIfAdmin();
    }

    return (
        <div>
            {admin === 1 ? (
                <div className="update-movie">
                    <h1>Add new Film to database</h1>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <ThemeProvider theme={theme}>
                        <MovieTextField
                            size="small"
                            label="Title"
                            variant="outlined"
                            onChange={titleHandler}
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
                            required
                        />
                        <MovieTextField
                            size="small"
                            label="Poster Url"
                            variant="outlined"
                            type="url"
                            onChange={posterHandler}
                            helperText=" "
                            required
                        />
                        <Button
                            disabled={yearValidator}
                            type="submit"
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
}
export default UpdateMovie;