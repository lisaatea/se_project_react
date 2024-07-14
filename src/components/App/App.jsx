import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import {
  getItems,
  addItem,
  deleteItem,
  editUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import * as auth from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const [token, setToken] = useState(localStorage.getItem("jwt"));

  const navigate = useNavigate();

  const toggletoRegister = () => {
    setActiveModal("register");
  };

  const toggletoLogin = () => {
    setActiveModal("login");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-garment");
  };

  const handleSignUpClick = () => {
    setActiveModal("register");
  };

  const handleLogInClick = () => {
    setActiveModal("login");
  };

  const handleProfileEditClick = () => {
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () =>
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");

  const handleAddItemSubmit = (newItem) => {
    addItem(newItem, token)
      .then(() => {
        getItems().then((items) => {
          setClothingItems(items);
        });
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteItem = (itemId) => {
    deleteItem(itemId, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEditProfile = ({ name, avatar }) => {
    editUser({ name, avatar }, token)
      .then(() => {
        setUserData({ ...userData, name, avatar });
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    auth
      .signup(name, avatar, email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setUserData({
          _id: data._id,
          name: data.name,
          avatar: data.avatar,
          email: data.email,
        });
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .signin(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setUserData({
          _id: data._id,
          name: data.name,
          avatar: data.avatar,
          email: data.email,
        });
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setIsLoggedIn(false);
    setUserData({
      _id: "",
      name: "",
      avatar: "",
      email: "",
    });
    navigate("/");
  };

  const handleCardLike = ({ _id, likes }) => {
    const isLiked = likes.some((like) => like === userData._id);
    const likeOperation = !isLiked ? addCardLike : removeCardLike;
    likeOperation(_id, token)
      .then((updatedItem) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === _id ? updatedItem : item))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (token) {
      auth
        .checkTokenValidity(token)
        .then((data) => {
          setUserData({
            _id: data._id,
            name: data.name,
            avatar: data.avatar,
            email: data.email,
          });
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
          setToken(null);
          setIsLoggedIn(false);
        });
    }
  }, [token]);

  useEffect(() => {
    Promise.all([getWeather(coordinates, APIkey), getItems()])
      .then(([weatherData, itemsData]) => {
        const filteredWeatherData = filterWeatherData(weatherData);
        setWeatherData(filteredWeatherData);
        setClothingItems(itemsData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={userData}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleSignUpClick={handleSignUpClick}
              handleLogInClick={handleLogInClick}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleLogout={handleLogout}
                      handleProfileEditClick={handleProfileEditClick}
                      handleCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
            onClose={closeActiveModal}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            handleDeleteClick={handleDeleteClick}
          />
          <DeleteConfirmationModal
            activeModal={activeModal}
            onDelete={() => handleDeleteItem(selectedCard._id)}
            onClose={closeActiveModal}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            handleRegistration={handleRegistration}
            onClose={closeActiveModal}
            onToggle={toggletoLogin}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            handleLogin={handleLogin}
            onClose={closeActiveModal}
            onToggle={toggletoRegister}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onEditProfile={handleEditProfile}
            onClose={closeActiveModal}
          />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
