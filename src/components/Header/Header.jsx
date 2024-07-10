import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleSignUpClick,
  handleLogInClick,
  handleAddClick,
  weatherData,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <ToggleSwitch />

      {currentUser.name ? (
        <>
          <div>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__btn header__btn-add"
            >
              + Add clothes
            </button>
          </div>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              <img
                src={currentUser.avatar}
                alt="avatar"
                className="header__avatar"
              />
            </div>
          </Link>
        </>
      ) : (
        <div className="header__button-container">
          <button
            onClick={handleSignUpClick}
            type="button"
            className="header__btn"
          >
            Sign Up
          </button>
          <button
            onClick={handleLogInClick}
            type="button"
            className="header__btn"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
