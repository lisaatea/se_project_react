import { useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormandValidation";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const { values, handleChange, isValid, resetForm, errors } =
    useFormAndValidation({
      name: "",
      imageUrl: "",
    });

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onAddItem(values);
    }
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
      isButtonDisabled={!isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name* <span className="modal__error">{errors.name}</span>
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          minLength="1"
          maxLength="30"
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image*
        <span className="modal__error">{errors.imageUrl}</span>
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
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
            checked={values.weather === "hot"}
            onChange={handleChange}
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
            checked={values.weather === "warm"}
            onChange={handleChange}
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
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <span className="modal__text-radio">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
