import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import { getItems, addItem, deleteItem, editUser } from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import * as auth from "../../utils/auth";

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
    name: "",
    avatar: "",
    email: "",
    password: "",
  });
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const navigate = useNavigate();

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
      .then((res) => {
        setClothingItems((prevItems) => [res.data, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (itemId) => {
    deleteItem(itemId, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleEditProfile = ({ name, avatar }) => {
    editUser({ name, avatar }, token)
      .then(() => {
        setUserData({ ...userData, name, avatar });
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    auth
      .signup(name, avatar, email, password)
      .then(() => {
        closeActiveModal();
        navigate("/profile");
        //remove before submitting:
        alert("registration successful");
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .signin(email, password)
      .then((data) => {
        closeActiveModal();
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setToken(data.token);
          setIsLoggedIn(true);
          setUserData({
            _id: data.id,
            name: data.name,
            avatar: data.avatar,
            email: data.email,
          });
          navigate("/profile");
        }
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setIsLoggedIn(false);
    setUserData({
      name: "",
      avatar: "",
      email: "",
      password: "",
    });
    navigate("/");
  };

  function ProtectedRoute({ isLoggedIn, children }) {
    if (!isLoggedIn) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  useEffect(() => {
    if (token) {
      auth
        .checkTokenValidity(token)
        .then(() => {
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error while checking token validity:", error);
          localStorage.removeItem("jwt");
          setToken(null);
          setIsLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    Promise.all([getWeather(coordinates, APIkey), getItems()])
      .then(([weatherData, itemsData]) => {
        const filteredWeatherData = filterWeatherData(weatherData);
        setWeatherData(filteredWeatherData);
        setClothingItems(itemsData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
                      userData={userData}
                      handleLogout={handleLogout}
                      handleProfileEditClick={handleProfileEditClick}
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
          />
          <LoginModal
            isOpen={activeModal === "login"}
            handleLogin={handleLogin}
            onClose={closeActiveModal}
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
