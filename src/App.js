import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

// Components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/common/Home";
import ForgottenPass from "./components/auth/ForgottenPass";
import ChangePass from "./components/auth/ChangePass";
import MovieDetails from "./components/movies/MovieDetails";
import Header from "./components/common/Header";
import profile from "./components/profile/profile";
import wishlist from "./components/profile/wishlist";
import bannedlist from "./components/profile/bannedlist";
import Footer from "./components/common/Footer";
import publicProfile from "./components/profile/publicProfile";
import PublicWishlist from "./components/profile/PublicWishlist";
import UpdateMovie from "./components/movies/updateMovie";
import Friends from "./components/Friends/Friends";
import Verify from "./components/auth/Verify";
import Error404 from "./components/auth/Error404";
import ProfileReviews from "./components/profile/profileReviews";

// Context
import MoviesState from "./context/moviesList/MoviesState";
import MovieState from "./context/movie/MovieState";
import AuthState from "./context/Auth/AuthState";
import ProfileState from "./context/Profile/ProfileState";
//import AuthContext from "./context/Auth/AuthContext";

/*
function CheckAuth () {
  const authContext = useContext(AuthContext);
  const { User, setUser } = authContext;
  if (User == null) {
    if (localStorage.getItem("FilmFinderUser") != null) {
      setUser(localStorage.getItem("FilmFinderUser"));
    }
  }
}
*/

function App() {
  return (
    <ProfileState>
      <AuthState>
        <MoviesState>
          <MovieState>
            <div className="container">
              <Router>
                <Header />
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/search" component={Home} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/register" exact component={Register} />
                  <Route path="/movies/:id" component={MovieDetails} />
                  <Route path="/forgot" exact component={ForgottenPass} />
                  <Route path="/myprofile" exact component={profile} />
                  <Route
                    path="/myprofile/wishlist"
                    exact
                    component={wishlist}
                  />
                  <Route
                    path="/myprofile/bannedlist"
                    exact
                    component={bannedlist}
                  />
                  <Route
                    path="/myprofile/reviews"
                    exact
                    component={ProfileReviews}
                  />
                  <Route
                    path="/myprofile/change"
                    exact
                    component={ChangePass}
                  />
                  <Route path="/profile/:uid" exact component={publicProfile} />
                  <Route
                    path="/profile/wishlist/:uid"
                    exact
                    component={PublicWishlist}
                  />
                  <Route path="/new" exact component={UpdateMovie} />
                  <Route path="/update/:id" exact component={UpdateMovie} />
                  <Route path="/friends" exact component={Friends} />
                  <Route path="/verify" exact component={Verify} />
                  <Route component={Error404} />
                </Switch>
              </Router>
            </div>
            <Footer />
          </MovieState>
        </MoviesState>
      </AuthState>
    </ProfileState>
  );
}

export default App;
