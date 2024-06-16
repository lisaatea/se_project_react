import { useState, useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [nameError, setNameError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [imageUrlIsValid, setImageUrlIsValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
      setNameError("");
      setImageUrlError("");
      setNameIsValid(false);
      setImageUrlIsValid(false);
    }
  }, [isOpen]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.trim() === "") {
      setNameError(" (name is required)");
      setNameIsValid(false);
    } else {
      setNameError("");
      setNameIsValid(true);
    }
  };

  const handleImageUrlChange = (e) => {
    const value = e.target.value;
    setImageUrl(value);
    const urlVerify = /^[^ "]+\.[^ "]+$/;
    if (!urlVerify.test(value)) {
      setImageUrlError(" (this is not a valid link)");
      setImageUrlIsValid(false);
    } else {
      setImageUrlError("");
      setImageUrlIsValid(true);
    }
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  useEffect(() => {
    setIsFormValid(nameIsValid && imageUrlIsValid);
    setIsButtonDisabled(!(nameIsValid && imageUrlIsValid));
  }, [nameIsValid, imageUrlIsValid]);

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { name, imageUrl, weather };
    onAddItem(newItem);
    onClose();
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      isButtonDisabled={isButtonDisabled}
    >
      <label htmlFor="name" className="modal__label">
        Name* {""} <span className="modal__error-name">{nameError}</span>
        <input
          type="text"
          className="modal__input"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          minLength="1"
          maxLength="30"
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image* {""}
        <span className="modal__error-url">{imageUrlError}</span>
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          value={imageUrl}
          onChange={handleImageUrlChange}
          placeholder="Image URL"
          required
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="hot"
            value="hot"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
          />
          <span className="modal__text-radio">Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="warm"
            value="warm"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
          />
          <span className="modal__text-radio">Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="cold"
            value="cold"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
          />
          <span className="modal__text-radio">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
